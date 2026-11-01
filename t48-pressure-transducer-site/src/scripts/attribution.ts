// ============================================================
// attribution.ts — 询盘来源采集（K-129 三件套 S1 面 / 卡 t_2c933fb6）
// 只采「路径 + 渠道 + 位点」，不采用户填的任何内容（姓名/邮箱/留言一律不进本模块）。
// 口径（与 istamping 首例 commit 1900b2b 同制式）：
//   · page_path = location.pathname
//   · page_url  = origin + pathname（刻意剥离 query/hash：query 里可能有搜索词）
//   · referrer  = 外站首次来源（站内跳转不算来源；外站 referrer 剥 query 后存 origin+path）
//   · utm_* / gclid / landing_page / first_seen = 首触值 localStorage 锁定，跨会话不丢
//   · landing_page = 首次着陆完整 URL（origin+pathname+白名单 utm/gclid query，≤512 截断）
//   · cta_slot = 最近一次点击的询盘 CTA 位点（组件挂 data-cta-slot，事件委托 capture 采集）
//   · 无值一律写 direct（禁留空，空值会让周报统计失真）
// 存储纪律：每键 ≤512 字符、总占用 <4KB。隐私模式存储被禁时降级为「本次提交用当前值」不抛错。
// 事件面：emitFormSubmit() 统一出口——「先存后发」：提交页把事件参数存 sessionStorage，
//         落地页（/thank-you/）加载时 flushPendingFormSubmit() 补发；
//         GA4 在则 gtag('event','form_submit',…) 真上报，GA4 未装则入 dataLayer 队列留痕，不伪造上报。
//         （为什么不能提交页直接发完再跳：gtag.js 事件是异步批量发送，跳页会吞掉，卡 t_303da4ba 实锤）
// ============================================================

export const ATTR_FIELDS = [
  'page_path',
  'page_url',
  'referrer',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'gclid',
  'landing_page',
  'first_seen',
  'cta_slot',
] as const;

const LS_PREFIX = 'pressurepoint_attr_v1_';
const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'gclid'] as const;
const V = (k: string) => LS_PREFIX + k;

function lsGet(key: string): string {
  try {
    return localStorage.getItem(V(key)) || '';
  } catch {
    return '';
  }
}

function lsSet(key: string, value: string): void {
  try {
    localStorage.setItem(V(key), value);
  } catch {
    /* 隐私模式/存储被禁：降级为本次提交直接用当前值 */
  }
}

// —— 待发事件缓存（卡 t_303da4ba：「先存后发」机制的存储层）——
// 键 = t48_pressurepoint_pending_form_submit_v1（个人线前缀，禁与公司线件混）
const PENDING_KEY = 't48_pressurepoint_pending_form_submit_v1';

function stashPending(payload: Record<string, string>): boolean {
  try {
    sessionStorage.setItem(PENDING_KEY, JSON.stringify(payload));
    return true;
  } catch {
    return false; // 隐私模式/存储被禁 → 调用方退回直发
  }
}

function takePending(): Record<string, string> | null {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(PENDING_KEY); // 取出即删 = 恰好一次，不重复计数
    const parsed = JSON.parse(raw) as Record<string, string>;
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

/** 首次取值即锁定；已锁定的值（含 direct）不被后续覆盖 */
function firstTouch(key: string, current: string): string {
  const prev = lsGet(key);
  if (prev) return prev;
  const value = (current || 'direct').slice(0, 512);
  lsSet(key, value);
  return value;
}

/** 外站来源：站内跳转的 document.referrer 不是「来源」，返回空 */
function externalReferrer(): string {
  const raw = document.referrer || '';
  if (!raw) return '';
  try {
    const u = new URL(raw);
    if (u.origin === location.origin) return '';
    return u.origin + u.pathname;
  } catch {
    return '';
  }
}

function currentUtm(): Record<string, string> {
  const out: Record<string, string> = {};
  let params: URLSearchParams | null = null;
  try {
    params = new URLSearchParams(location.search);
  } catch {
    params = null;
  }
  for (const key of UTM_PARAMS) {
    out[key] = (params && params.get(key)) || '';
  }
  return out;
}

/** 首次着陆完整 URL：origin+pathname+utm/gclid query（白名单参数，剥其余 query 防搜索词泄漏） */
function landingUrl(): string {
  try {
    const u = new URL(location.href);
    const q = new URLSearchParams();
    for (const key of UTM_PARAMS) {
      const v = u.searchParams.get(key);
      if (v) q.set(key, v.slice(0, 120));
    }
    const qs = q.toString();
    const out = u.origin + u.pathname + (qs ? '?' + qs : '');
    return out.slice(0, 512);
  } catch {
    return '';
  }
}

/** 首见日期（YYYY-MM-DD，取访客本地时区日期——禁直接用 toISOString 的 UTC 日期：
 *  UTC+8 凌晨 00:00-08:00 期间 toISOString 会退到前一天，报表分桶会错一天） */
function firstSeen(): string {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

/** CTA 位点：读取并持久化最近一次点击的 data-cta-slot */
export function recordCtaSlot(slot: string): void {
  if (!slot) return;
  lsSet('cta_slot', slot.slice(0, 64));
}

/** 事件委托：全站任何带 data-cta-slot 的 CTA 被点 → 记位点（capture，弹窗关闭不吞） */
export function initCtaTracker(): void {
  document.addEventListener(
    'click',
    (e) => {
      const target = e.target as Element | null;
      const el = target?.closest?.('[data-cta-slot]') as HTMLElement | null;
      if (el) {
        const slot = el.getAttribute('data-cta-slot') || '';
        if (slot) recordCtaSlot(slot);
      }
    },
    { capture: true, passive: true },
  );
}

/** 采集当前页的来源值（首触规则在内） */
export function collectAttribution(): Record<string, string> {
  const utm = currentUtm();
  return {
    page_path: location.pathname || 'direct',
    page_url: (location.origin || '') + (location.pathname || ''),
    referrer: firstTouch('referrer', externalReferrer()),
    utm_source: firstTouch('utm_source', utm.utm_source),
    utm_medium: firstTouch('utm_medium', utm.utm_medium),
    utm_campaign: firstTouch('utm_campaign', utm.utm_campaign),
    gclid: firstTouch('gclid', utm.gclid),
    landing_page: firstTouch('landing_page', landingUrl()),
    first_seen: firstTouch('first_seen', firstSeen()),
    cta_slot: lsGet('cta_slot') || 'direct',
  };
}

/** 把来源值写进表单 hidden 字段（提交前调用，也支持页面加载时预填） */
export function fillAttribution(form: HTMLFormElement): void {
  if (!form) return;
  const values = collectAttribution();
  for (const name of ATTR_FIELDS) {
    const el = form.elements.namedItem(name);
    if (el && 'value' in el) (el as HTMLInputElement).value = values[name];
  }
}

/** 询盘提交成功的统一事件出口（禁改事件名、禁另开一套：仍 form_submit）
 *
 * 为什么不是「提交页直接 gtag 发完再跳」（卡 t_303da4ba 实测两次否决）：
 *   gtag.js 处理 dataLayer 里的事件是**异步批量**的，本机实测同一页面上手动发事件要 4~8s 才落地
 *   （对照实验：极简官方片段页同样如此），而本站提交成功即跳 /thank-you/，跳页会把队列里的事件吞掉，
 *   结果 = dataLayer 里有、谷歌侧 0 命中（前两轮探针 FAIL 的真因）。
 * 现在的姿势 = 「先存后发」：提交页把事件参数同步写进 sessionStorage（跨页保留、同步、不会丢），
 *   由落地页（/thank-you/）加载时 flushPendingFormSubmit() 取出补发；取出即删 = 恰好一次，不重复计数，
 *   也不拖慢跳转。存储不可用（隐私模式）时退回直发：可能丢，但绝不假报。
 */
export function emitFormSubmit(form: HTMLFormElement, done?: () => void): void {
  if (!form) {
    done?.();
    return;
  }
  const a = collectAttribution();
  const srcEl = form.elements.namedItem('form_source') as HTMLInputElement | null;
  const payload = {
    form_source: (srcEl && srcEl.value) || 'unknown',
    page_path: location.pathname,
    landing_page: a.landing_page,
    referrer: a.referrer,
    first_seen: a.first_seen,
    cta_slot: a.cta_slot,
    utm_source: a.utm_source,
    utm_medium: a.utm_medium,
    utm_campaign: a.utm_campaign,
  };
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };
  if (stashPending(payload)) {
    done?.(); // 存住即可跳，事件由目标页补发
    return;
  }
  if (typeof w.gtag === 'function') {
    w.gtag('event', 'form_submit', payload);
  } else {
    // GA4 标签尚未安装（本站无 measurement ID）：事件只入 dataLayer 留痕，禁伪造上报
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: 'form_submit', ...payload });
  }
  done?.();
}

/** 落地页补发：取出即删（恰好一次）。ga4 未装时同样入 dataLayer 留痕 */
export function flushPendingFormSubmit(): void {
  const payload = takePending();
  if (!payload) return;
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };
  if (typeof w.gtag === 'function') {
    w.gtag('event', 'form_submit', payload);
    return;
  }
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: 'form_submit', ...payload });
}

/** 页面加载即初始化：锁首触 + 补发上一页待发事件 + 预填所有表单 + 全站委托（无表单页也必须调用一次落锁） */
export function initAttribution(): void {
  initCtaTracker();
  flushPendingFormSubmit(); // 上一页（提交页）存下的 form_submit：落地页第一时间补发，跳页不吞事件
  collectAttribution(); // 首触锁定（landing_page / first_seen 在落地页首次就写死）
  const run = () => {
    document.querySelectorAll<HTMLFormElement>('form[data-attribution]').forEach(fillAttribution);
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
  // 提交瞬间再补一次（用户可能在表单页停留很久、跨会话回来提交）
  document.addEventListener(
    'submit',
    (e) => {
      const form = e.target as HTMLFormElement | null;
      if (form && form.matches && form.matches('form[data-attribution]')) fillAttribution(form);
    },
    true,
  );
}

// 全站壳（Layout.astro）导入即自启动：任何页面首访都会落首触锁
initAttribution();
