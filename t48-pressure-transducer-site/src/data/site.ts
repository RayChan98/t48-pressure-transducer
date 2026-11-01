// PRESSUREPOINT (T-48 压力传感器站 · 兼职线) — 站点触点单一事实源
// 上线收口三查 ② gate2 F3 声明一致判据的取值源：源码中出现的电话/WhatsApp/邮箱必须在本文件声明。
// 81号件案③补闸单 t_6989122a 2026-10-13 建档（microdrip t_2f79157c / t46 t_61ad8755 同制式）：
//   此前触点散落在 4 组件 + 5 页面硬写（cj226144@gmail.com 15 处 + 电话/WhatsApp 面 6 处）。
// email 对客触点 = cj226144@gmail.com（兼职线主号，属主 10-03 钉死终收件箱）——全站对客邮箱
//   唯一开关点：正式品牌域注册+MX 接通后只改本行切换品牌别名（挂主人拍板，禁 agent 代裁）。
// phone/whatsapp = 8613710860663（兼职线 Ray WhatsApp 现号在册，pleatpure/t46/microdrip 同值）——
//   改号=对客路由变更，须主人一句话拍板。
// 本站无地址/城市声明面（contact/about 文案未写厂址城市，故 allow_cities 无需登记）。
export const site = {
  brand: "PRESSUREPOINT",
  domain: "t48-pressure-transducer.pages.dev",
  url: "https://t48-pressure-transducer.pages.dev",
  email: "cj226144@gmail.com",
  phone: "+86 137 1086 0663",
  whatsapp: "8613710860663",
  waNumber: "8613710860663",
  // —— 分析埋点单点开关（卡 t_303da4ba 2026-10-26：K-129 S2 面 GA4 真上报）——
  //   ga4Id 空串 = 不挂载 gtag（安全默认）；填 G-XXXX 即全站生效（Layout head 双段+consent 门控现成）。
  //   换号纪律（skill ga4-analytics-ops 坑⑤）：改本行→build→部署→线上实扫旧 ID 0 命中才算换成功。
  //   禁在 Layout/组件里手贴第二份 ID（双份=换号必漏一处）。
  ga4Id: "G-2KKBHVWHM7",
  //   clarityId 空串 = 不加载微软 Clarity（同意后由 src/scripts/consent.ts 注入；空 ID 即开关关）。
  clarityId: "",
};

export default site;
