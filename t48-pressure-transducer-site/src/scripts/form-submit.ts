// ============================================================
// form-submit.ts — contact 页询盘表单 AJAX 提交 + form_submit 显式事件
//（K-129 归因三件套 S2 面 / 卡 t_2c933fb6；照 istamping 首例 commit 1900b2b 同制式）
// 只管带 data-ajax-form 的页面原生表单（contact 页）；InquiryModal 弹窗有自家提交逻辑不在此列。
// 拦截姿势照 InquiryModal：fetch /api/contact → ok 则跳 /thank-you/（Function 禁 redirect 的 1101 坑不变）。
// ============================================================

import { fillAttribution, emitFormSubmit } from './attribution';

document.addEventListener('submit', async (e) => {
  const form = e.target as HTMLFormElement;
  if (!form || !form.matches || !form.matches('form[data-ajax-form]')) return;
  e.preventDefault();

  const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const original = btn ? btn.textContent : '';
  const contactEmail = form.dataset.contactEmail || '';

  // 来源采集（S1）：提交瞬间落 hidden 值
  fillAttribution(form);
  const fd = new FormData(form);

  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Sending...';
  }
  try {
    const res = await fetch(form.getAttribute('action') || '/api/contact', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.ok) {
      // S2：提交成功补显式事件（参数带归因三件 + utm；GA4 未装时入 dataLayer 留痕，见 attribution.ts）
      emitFormSubmit(form);
      // 立即导航会吞掉队列里未发的事件——留 400ms
      await new Promise((r) => setTimeout(r, 400));
      window.location.href = '/thank-you/';
      return; // 保持按钮 disabled，跳转前不重复提交
    }
    alert('Something went wrong: ' + (data.error || 'unknown error'));
  } catch {
    alert(`Network error, please email us directly at ${contactEmail}`);
  }
  if (btn) {
    btn.disabled = false;
    btn.textContent = original;
  }
});

export {};
