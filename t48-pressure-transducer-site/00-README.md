# FULLCOLORCAM — CCTV 外贸 B2B 独立站

> 域名：**fullcolorcam.com**（2026-08-20 主人确认，注册中）
> 品牌：FULLCOLORCAM — 全彩夜视安防监控摄像头
> 技术栈：Astro 7 + Tailwind v4（官方最佳实践，**不 clone molditquick**）
> 状态：品牌定名 ✅ / 竞对调研 ✅ / logo ✅ 已集成 / 词表 ✅ 2520 词 / 骨架 ✅ / 内容填充 ✅ / 导航平铺 ✅ / 关键词实证 ✅ / 真404 ✅ / 长尾页矩阵 ✅ / 博客三栏骨架 ✅ / 作者页 ✅ / Megamenu+Topbar ✅ / 浮动联系栏 ✅ / Services 单开 ✅ / About 分类 ✅ / 内容工厂 ✅ / 图片管线 ✅（115 张定稿） / 移动端全套 ✅ / 表单 ✅ / 去 FMUSER 型号 ✅ / 飞书网站记录表 ✅ / **内容工厂批量：13/13 词族 + 2 新指南（ANPR/无订阅）共 14 篇博客 / 产品页三审强化：12/12 页 v2 / SEO审查第一轮 ✅（缩略图/schema/sitemap54/死链修复） / 行业页强化 8/8 页 v2（1087-1514词/FAQ8/决策表） / FAQ 26问答两列 / About锚点修复 / 部署 ✅ https://fullcolorcam.pages.dev（49页→64页） / 表单打通 ✅ Zoho OAuth2（08-24 实测 ok:true） / 服务页深度化 5/5 ✅（filter 反哺 v2 模板+challenges/faqs/内链） / 意图体裁覆盖矩阵 ✅ / 博客 +1 best-cctv-cameras-for-business（64页）**[truncated]

## 🧬 真源锚点

> 主人的**决策/拍板/偏好原话**（一字不差）→ `F:/kravzik建站信息/Hermes全自动网站运营/01-Hermes资料/14-主人决策原话语录库.md`（master-quotes-archive skill 管理，定期复盘入库）
> 灵感原话 → 同目录 `13-灵感原文存档.md` 

## 决策记录

| 日期 | 决策 |
|:--|:--|
| 2026-08-20 | 域名定为 fullcolorcam.com（colorcctv.com/nightcctv.com 备选） |
| 2026-08-20 | 品牌 = FULLCOLORCAM，卖点 = Full-Color Night Vision |
| 2026-08-20 | 色板：深空蓝黑 #0B1F33 主 + 宝蓝 #2563EB 辅 + 橙 #F97316 CTA + 青绿 #10B981 点缀 |
| 2026-08-20 | 不 clone molditquick，遵循 Astro+Tailwind 官方最佳实践自由发挥 |

## 资料位置

- 产品资料：`C:\Users\admin\xwechat_files\...\CCTV\`（FC5B 枪机 / FC5D 半球 / FC5P 球机 PDF + PI 价格表 + 4 视频 + 海报）
- 竞对调研：`竞对调研报告.md`（icseecam / enster / jer-tech 主对标）
- logo 任务：`logo-设计任务\logo设计需求.md` + 给 Trae 指令

## 待办

- [x] 主人注册域名 fullcolorcam.com（⏳ 注册中，当前 pages.dev 顶着）
- [x] 主人发 Trae logo 指令 → 收 5 件套 → 验收（✅ 已集成）
- [x] 主人下竞对 Semrush 出词（icseecam / enster / jer-tech）（✅ 词表 2520 词）
- [x] 词表分类选用 + 品牌色板 → 搭站点骨架（✅ 已上线）
- [x] 主人审骨架 → 内容填充（✅ 49→64 页）

## 📔 项目日记（2026-08-22 从 filter 互通补建）

> 规则：每阶段/里程碑记一条——做了什么/关键决策/结果/沉淀/踩坑。filter 先执行此制度（2026-08-21），fullcolorcam 同步补建。

### 2026-08-24 filter 反哺 + 表单打通 + 内容增量
- 做了什么：①表单实测 mail_not_configured → 配 Zoho env vars（PLEATPURE 同套凭据）→ 实测 ok:true ✅ ②filter 差异化全量对比（filter反哺分析-20260824.md）③ServicePageTemplate v2 深度化（+challenges/faqs/products/guides 段）+ 5 服务页补深度（1.6-1.8KB→7.2KB 渲染）④意图体裁覆盖矩阵（2520 词实证，剔除 B2C 品牌词 345 个）⑤新写 best-cctv-cameras-for-business（3280 词/16 关键词全过/ALL CHECKS PASS）⑥blog index + sitemap 手动补录
- 关键决策：西语 es/ 暂不做（主人令：filter 西语是测试线，链路未打通）；EseeCloud 是竞对品牌不写（避免导流）
- 结果：64 页全 200 + sitemap 64 条 + 表单 ok:true + 服务页深度对齐 filter
- 沉淀：filter反哺分析-20260824.md；意图体裁覆盖矩阵.md；build_intent_matrix.py（可重复跑）；form-email-automation-sop 补 CF env 截断坑
- 踩坑：blog/index 硬编码不自动收录新文（filter 也踩过）；sitemap 是 public/ 静态文件不会自动更新；CF API 读 env 禁截断（[:40] 截断 → invalid_client_secret）

### 2026-08-22 全站内容统一 + SEO 第一轮 + 多体裁体系
- 做了什么：blog 缩略图修复（19条重复→13篇）+ 行业页 8/8 三审强化（81-129→1087-1514词）+ FAQ 26问答两列 + About 死锚点修复 + ANPR/无订阅 2 新指南 + schema/sitemap54/robots + 词补强（megapixel/hvr/room camera等5处）+ 多体裁审计（85 howto词+220 listicle词 0 覆盖）
- 关键决策：搜索意图多体裁覆盖（filter 观点回流）；观点双向互通协议
- 结果：59 页全 200 + 记录表 59 条 + cron ×3（SERP周扫/多体裁铺排/观点回流）
- 沉淀：content-factory-universal 加意图→体裁决策表；search-intent-funnel-audit 三审；master-quotes-archive 双向互通协议
- 踩坑：python 批量补词时 p 标签未闭合（indoor 卡片切半）；bash 反斜杠转义吃路径；飞书 token 注释坑（split('#')[0]）

### 2026-08-21 内容工厂 13 词族 + 产品页批量 + 记录表
- 做了什么：12 篇杀穿指南（5亲写+7 delegate）+ 12 产品页三审 v2 + 飞书记录表 50 条 + 图池 115 张
- 关键决策：三审方法论（意图/漏斗/词簇）；去AI化标准（Google people-first）
- 结果：49 页上线
- 沉淀：4 个 SEO/内容 SKILL + 原话语录库 + 总控总览
- 踩坑：Astro 裸 & 编译错；faqs 数组类型；delegate 并发 3 上限
