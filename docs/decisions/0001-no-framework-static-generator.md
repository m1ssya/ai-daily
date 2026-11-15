# 0001. 使用无框架 Node 脚本生成静态站点

- 状态：Accepted
- 日期：2026-11-14
- 决策者：项目维护者
- 证据：[`scripts/build.mjs`](../../scripts/build.mjs)、[`package.json`](../../package.json)、[`vercel.json`](../../vercel.json)、根目录 [README.md](../../README.md)

## Context
需要把每日期次整理成可打开、可分享的中文网页，并便于部署到 Vercel。内容以每期一篇 JSON 为输入。

## Decision
不引入前端框架或静态站点生成器框架。使用单一 Node.js 脚本读取 `content/issues/*.json`，校验后直接写 HTML 到 `out/`，并复制 `src/styles.css`。`package.json` 不声明运行时依赖；Vercel 配置为 `framework: null`，构建命令 `npm run build`，输出目录 `out`。

## Rationale
根目录 README 的技术说明是：用 Node.js 脚本把 JSON 生成静态 HTML，不依赖前端框架，方便以后接到每日自动更新流程，也方便放到 Vercel。该「自动更新」是选择此结构的动机，**不是**已经实现的能力。

## Alternatives considered
- 使用 Next.js、Astro 或其他 SSG/框架：能提供组件化和路由约定，但对本仓库当前的三页结构和零运行时依赖目标来说过重。未被采用。
- 手写 HTML 而不做生成器：无法从 JSON 稳定复用布局和校验。未被采用。

## Consequences
- 页面结构和校验规则集中在 `scripts/build.mjs`，改版时主要改这一处和 CSS。
- 新增能力（例如分享图、访问统计、自动写期次）需要另作设计，不能从本决策推出它们已经存在。
- 若未来引入框架，应新增 ADR 并显式取代本决策。
