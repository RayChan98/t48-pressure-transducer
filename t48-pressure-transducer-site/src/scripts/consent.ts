// ============================================================
// consent.ts — Cookie 同意机制 + Clarity 开关（卡 t_303da4ba，照 insertcore-site t_33bd86bb 样板移植）
// 规范真源=E:\HermesData\assets\建站标准流程-SOP分环节\04-建站设计SOP族\通用壳件-Cookie同意弹窗规范-v0.1草案-20261016.txt
//   红线=C1 全区域统一出条／C2 底部横条／C3 两键同层同尺寸无主次诱导／C4 同意前第三方行为脚本不加载
//        （GA4 走 consent denied 初始化，Clarity 一律同意后才注入）／C5 反悔通道／C6 大白话+链接
// 分工：Layout.astro head 内联段按已存偏好做 gtag('consent','default')（denied 为默认）；
//       本模块负责横幅显隐、两键决策、gtag('consent','update') 升级、Clarity 同意后注入、页脚重开设置。
// 个人线资产：本站 = t48-pressure-transducer（兼职线），存储键一律 t48_pressurepoint_ 前缀，禁与公司线件混。
// ============================================================
import { site } from '../data/site.ts';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// 与 Layout.astro head 内联段读取值必须一致，禁单边改名
const KEY = 't48_pressurepoint_cookie_consent';

const stored = (): string | null => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

const banner = document.getElementById('cookie-banner');

function showBanner() {
  banner?.classList.remove('hidden');
}
function hideBanner() {
  banner?.classList.add('hidden');
}

// Clarity（微软免费行为监测）——仅同意且项目 ID 已填时加载；ID 留空 = 开关关
function loadClarity() {
  const id = (site as { clarityId?: string }).clarityId;
  if (!id || typeof (window as unknown as { clarity?: unknown }).clarity !== 'undefined') return;
  (function (c: Window & { clarity?: (...a: unknown[]) => void }, l: Document, a: string, r: string, i: string) {
    (c as unknown as Record<string, unknown>)[a] =
      (c as unknown as Record<string, (...q: unknown[]) => void>)[a] ||
      function () {
        ((c as unknown as Record<string, (...q: unknown[]) => void>)[a] as unknown as { q: unknown[] }).q = (
          (c as unknown as Record<string, (...q: unknown[]) => void>)[a] as unknown as { q: unknown[] }
        ).q || [];
        ((c as unknown as Record<string, (...q: unknown[]) => void>)[a] as unknown as { q: unknown[] }).q.push(arguments);
      };
    const t = l.createElement(r) as HTMLScriptElement;
    t.async = true;
    t.src = 'https://www.clarity.ms/tag/' + i;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode?.insertBefore(t, y);
  })(window, document, 'clarity', 'script', id);
}

function gtagConsentUpdate(state: 'granted' | 'denied') {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', { analytics_storage: state });
  }
}

if (!banner) {
  // 无横幅的页（理论上 Layout 全量挂载）：偏好已存则维持，不做任何加载动作
} else if (stored() === 'granted') {
  // head 已按 granted 初始化，这里只补 Clarity（新装 Clarity 时老访客刷新即挂上）
  loadClarity();
} else if (!stored()) {
  showBanner(); // C1：未决访客全区域统一出条
}

banner?.addEventListener('click', (e) => {
  const btn = (e.target as Element)?.closest?.('button');
  const choice = btn?.hasAttribute('data-cookie-accept')
    ? 'granted'
    : btn?.hasAttribute('data-cookie-necessary')
      ? 'declined'
      : null;
  if (!choice) return;
  try {
    localStorage.setItem(KEY, choice);
  } catch {
    /* 隐私模式写不进：本次会话内仍生效 */
  }
  if (choice === 'granted') {
    gtagConsentUpdate('granted'); // C4：同意后升级授予，GA4 数据合法连续
    loadClarity();
  } else {
    gtagConsentUpdate('denied'); // 拒绝=显式重申 denied（默认已 denied，双保险）→ 不加载 Clarity
  }
  hideBanner();
});

// C5 反悔通道：页脚带 data-cookie-reopen / data-cookie-settings 的点击 → 重开设置条
document.addEventListener('click', (e) => {
  const trigger = (e.target as Element)?.closest?.('[data-cookie-reopen],[data-cookie-settings]');
  if (!trigger) return;
  e.preventDefault();
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  showBanner();
  banner?.scrollIntoView?.({ block: 'nearest' });
});

export {};
