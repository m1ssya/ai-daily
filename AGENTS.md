# Agent 工作规则

本文件是仓库级权威规则，所有编码 Agent 必须遵守。

本仓库是「每日 AI 热帖」静态站点：无前端框架，由 [`scripts/build.mjs`](scripts/build.mjs) 读取 [`content/issues/*.json`](content/issues/)，校验后写入 `out/`（首页 `/`、往期 `/issues/`、单期 `/issues/YYYY-MM-DD/`），并把 [`src/styles.css`](src/styles.css) 复制为 `out/styles.css`。部署配置见 [`vercel.json`](vercel.json)。产品说明与期次字段约定以根目录 [README.md](README.md) 为准；当前架构见 [docs/architecture.md](docs/architecture.md)。

不要把未实现能力写成已交付，包括访问统计、把每日 10:00 简报例行任务自动写入期次、分享卡片图、自定义域名和自动发帖。

## 工作前
- 阅读本文件、最近的目录级 `AGENTS.md`、相关 README 和受影响模块文档。
- 通过源码、测试、配置和实际命令核实现状；文档和聊天记录不能替代实现证据。
- 明确目标、验收标准、影响面和风险；需求不明确时先澄清。

## 工作中
- 遵循现有架构和代码风格，不引入无关依赖或扩大变更范围。
- 不伪造命令输出、测试结果、接口字段或运行环境信息。
- 文档与代码冲突时，以可验证的当前实现为准，并修正文档。
- 安全敏感变更检查认证、授权、输入校验、秘密管理、日志脱敏和失败关闭行为。
- 期次 JSON 必须符合根目录 README 的字段约定；`post_url` 必须是真实的 `https://x.com/{handle}/status/{id}`，禁止编造链接、用户名或数字。用户可见文案使用简体中文。

## 文档同步
以下变更必须评估并更新文档：Subsystem 增删/拆分；CLI、Web、App、API、SDK、配置、数据模型、事件或协议变化；架构边界、依赖、数据流、权限模型变化；部署、运维、故障处理、升级或兼容性变化；安全边界或威胁模型变化；期次 JSON 字段或构建输出路径变化。
用户可见变更同时评估 `CHANGELOG.md` 的 `Unreleased` 记录；未实现的 Proposed 功能不能写成已交付。版本策略见 [docs/versioning.md](docs/versioning.md)。
仅内部重构且外部行为、运维方式、架构边界均不变时，不要求机械新增文档；在 PR 说明原因。

## 完成前
- 运行相关测试、Lint、构建和文档检查；未运行的检查明确列出。本仓库目前至少应运行 `npm run build` 和 `python3 scripts/check_docs.py`。不要提交生成目录 `out/`、`screenshots/`、`node_modules/` 或 `.vercel/`。
- 检查链接、术语、示例、命令和配置是否与实现一致。
- 检查是否需更新索引、ADR、LESSONS、Runbook 或 CHANGELOG。
- 汇报变更、验证结果、未完成项和风险。

## 写作质量
先说明结论和边界；区分事实、设计意图、约束、示例和假设；零代码阶段允许提出 Proposed 方案，但不能声称功能已实现；未知内容标记 TBD；使用相对链接；秘密使用占位符。
## doc-maintainer workflow

所有涉及项目文档的任务按 [doc-maintainer Skill](.agents/skills/doc-maintainer/SKILL.md) 选择模式：零代码/预开发设计 `design`，首次接入文档基础 `init`，日常变更 `update`，只读检查 `audit`，模块深入 `deepen`，旧文档整理 `migrate`，版本与发版文档准备 `release`（默认不打 Tag、不发布）。在同一 PR 中维护受影响文档；如果语义契约未变，解释为什么不需要更新。
