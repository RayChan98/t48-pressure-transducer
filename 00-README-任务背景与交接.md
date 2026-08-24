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
| **建站** | ✅ **已上线** | **https://t48-pressure-transducer.pages.dev**（24 页） |
| 内容增量（缺失页补齐） | 🔄 | products 总览/explosion-proof/oil-gas/automation/blog 索引/calibration 6 页 delegate 中 |

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
- [x] 建站 24 页上线（2026-08-24）
- [ ] 缺失页 6 页补齐（delegate 运行中）
- [ ] 核心词 3000+ 字深度指南（内容增量③）
- [ ] on-page + technical SEO 检查（上线前收尾）
- [ ] 域名注册（待主人定，走 CF Registrar）
- [ ] logo 定稿（Trae 指令，色板后置）
