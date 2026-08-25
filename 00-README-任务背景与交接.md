# 00 · README 任务背景与交接——压力传感器（T-48）PRESSUREPOINT

> 建档：2026-08-23 ｜ 群定位：Pressure Transducer 选品/测品流水线群（建站流水线第 0 步）
> 品牌：**PRESSUREPOINT**（压力传感器/变送器制造商，个人兼职线，色板后置可换）

## 一、状态总览（2026-08-24 更新）

| 阶段 | 状态 | 产出 |
|:--|:--|:--|
| M1 三查选品报告 | ✅ | `01-选品报告-PressureTransducer-M1.md`（可做：需求9/意图9/趋势9） |
| 夜间预跑①竞对域名清单 | ✅ | `01-竞对主域名清单.md`（41 域名分类） |
| 夜间预跑②内容策略分析 | ✅ | `02-竞对内容策略分析.md` |
| 夜间预跑③页面内容提炼 | ✅ | `03-页面内容提炼与骨架.md`（16 页规划） |
| 夜间预跑④范本自审 | ✅ | `04-范本-blog-what-is-a-pressure-transducer.md`（1635 词通过） |
| **建站** | ✅ **已上线** | **https://t48-pressure-transducer.pages.dev**（31 页） |
| 内容增量（缺失页补齐） | ✅ | products 总览/explosion-proof/oil-gas/automation/blog 索引/calibration 6 页（已上线） |
| **内容增量③深度指南** | ✅ **已上线** | **37 页**：selection-guide 3016 词范本 + 差压/平膜/精度/微型/液位 5 篇（2000-3100 词），blog 索引 11 篇，sitemap 37，0 死链 |

## 二、建站信息

- **技术栈**：Astro 7 + Tailwind v4（fullcolorcam 路径，不 clone molditquick）
- **站点目录**：`D:\kravzik-work\t48-pressure-transducer\t48-pressure-transducer-site`
- **页面**：24 页 = 首页 + 6 产品线 + 5 行业页 + 5 博客 + OEM/FAQ/About/Contact/legal
- **表单**：CF Function `/api/contact` → Zoho OAuth2（env 六件套已配，收件 cj226144@gmail.com）
- **Git**：个人仓 `RayChan98/t48-pressure-transducer`（兼职线，禁 grohoprecision-hub）
- **CF 部署**：个人号 token + 项目 `t48-pressure-transducer`（@t48-pressure-transducer.pages.dev）

## 三、页面地图（24 页）

| 类型 | 页面 |
|:--|:--|
| 产品线 | /products/industrial/ /high-accuracy/ /miniature/ /differential/ /flush-diaphragm/ /submersible/ |
| 行业 | /industries/hydraulic/ /hvac/ /water/ /compressed-air/ /process/ |
| 博客 | /blog/what-is-a-pressure-transducer/ /pressure-transducer-4-20ma/ /vs-transmitter/ /working-principle/ /pressure-sensor-types/ |
| 服务 | /services/oem-odm/ |
| 基础 | /about/ /contact/ /faq/ /legal/privacy/ /legal/terms/ /thank-you/ |

## 四、上下游依赖（Rule 20 跨群协作）

| 方向 | 群 | 依赖什么 | 文件位置 |
|:--|:--|:--|:--|
| 上游 | T-34 选品研究 | 候选池批量开群 | 选品研究/候选产品池/T-48-压力传感器/ |
| 下游 | T-06 快速建站 | 建站需求书（M2 待拍板） | 本目录 |
| 回执 | 总控 | 完成即写台账 | bitable AT1cbDbk6ap9YlsDiuccOOOwnTe |

## 五、待办

- [x] M1 三查报告（2026-08-23）
- [x] 夜间预跑①-④（2026-08-23 夜）
- [x] 建站 31 页上线（2026-08-24）
- [x] 缺失页 6 页补齐（2026-08-24 上线）
- [x] 核心词 3000+ 字深度指南 6 篇（内容增量③，2026-08-25 上线，37 页）
- [x] on-page + technical SEO 终检（2026-08-25：软404全绿/无noindex/canonical正/Product schema/og+twitter图）
- [x] on-page SEO 批量修正（2026-08-25：36 页 title≤62 + desc 达标 + 行业页 H1 补主词 + 3 处克隆残留清理 + thank-you noindex）
- [ ] 域名注册（待主人定，走 CF Registrar）
- [ ] logo 定稿（Trae 指令，色板后置）
- [x] git push（af55c80 + 34fcdfa 已推送）
