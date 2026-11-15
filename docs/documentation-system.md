# Documentation System

本仓库是「每日 AI 热帖」静态站点。文档体系沿用 agentic-engineering 模板，但只维护与当前实现相符的页面：没有 HTTP API、gRPC、CLI 或 SDK，因此不建立对应的 `docs/reference/` 目录。未实现能力（访问统计、自动写入期次、分享卡片图、自定义域名、自动发帖）不得写成已交付。

## Information architecture
1. Root instructions：Agent 工作约束和贡献方式。
2. Pre-code design：`docs/requirements/` 的 PRD 与 `docs/proposals/` 的架构、CLI、Web、App、SDK、API 或其他所需设计草案。
3. Project overview：已验证的当前架构、开发和测试入口。
4. Subsystems：**已实现**模块的边界、职责、接口、状态、依赖和失败模式。
5. External reference：已实现且经过验证的 CLI/API/gRPC/SDK/Event 契约，及适用的 Web/App 使用指南，按需创建。
6. ADRs：重要决策、备选方案和取舍。
7. Operational knowledge：Runbook、升级指南、Postmortem。
8. Versioning and releases：根目录 CHANGELOG、版本策略、Release Notes 和升级指南。
9. Lessons：跨任务、可复用且经过验证的经验。

## Single source of truth
每类信息只维护一个权威位置：产品需求在 PRD、未来实现意图在 Proposal、已实现行为在 Subsystem/Reference、决策理由在 ADR、操作步骤在 Runbook、版本规则在 Versioning、面向用户的变更在 Changelog。其他页面通过链接引用，避免复制。设计与实现出现偏差时必须显式记录并处理，不允许悄悄将方案当成事实。

## Change triggers
| Code change | Documentation action |
|---|---|
| 新增/删除模块 | Subsystem 页面和索引 |
| 对外行为变化（CLI/API/Web/App/SDK/Event） | 契约、UI/UX 指南、示例、兼容性说明；必要时 CHANGELOG Unreleased |
| 配置变化 | 配置参考和部署指南 |
| 架构依赖变化 | 架构图，必要时 ADR |
| 运维行为变化 | Runbook |
| 升级/迁移变化 | Upgrade Guide |
| 事故根因 | Postmortem；可复用经验进入 LESSONS |
| 确认发布新版本 | 版本来源、CHANGELOG、Release Notes；必要时 Upgrade Guide |

## Lifecycle
设计文档：Draft / Proposed → Reviewed → Accepted → Implementing → Implemented / Superseded。

当前实现文档：Draft → Reviewed → Active → Deprecated / Archived。

**Accepted** 只表示方案经过授权评审，不表示功能已运行；**Implemented** 需要源码、测试和实际验证支持。

## Human and Agent usability
人类需要目的、结论、风险和导航；Agent 需要明确前置条件、约束、输入输出、失败路径、验证命令和权威引用。共享同一份文档，不维护两套漂移的知识库。


## Maintenance modes

`doc-maintainer` 使用一个 Skill、七种独立工作模式，按目标选择。空项目的方案设计使用 `design`，而不是通过 `init` 虚构当前实现。

| Mode | Trigger | Behavior |
|---|---|---|
| [design](../.agents/skills/doc-maintainer/references/design.md) | 零代码项目或新功能的方案阶段（CLI/Web/App/SDK/Service 等） | 按需编写 PRD、技术方案、UX/接口草案，默认不编码 |
| [init](../.agents/skills/doc-maintainer/references/init.md) | 首次接入现有工程 / 初始化文档基础 | 检测真实能力、建立最小当前实现文档，重复执行须幂等 |
| [update](../.agents/skills/doc-maintainer/references/update.md) | 代码变更 / PR | Git Diff 影响分析，精确更新所属页面；无契约变化可不改 |
| [audit](../.agents/skills/doc-maintainer/references/audit.md) | 文档质量或准确性审计 | 默认只读，输出证据、严重性和修复建议 |
| [deepen](../.agents/skills/doc-maintainer/references/deepen.md) | 需要深入某个模块 | 沿源码和测试补充数据流、状态机、异常、验证 |
| [migrate](../.agents/skills/doc-maintainer/references/migrate.md) | 整理旧文档 | 迁移/合并/拆分，保留原始知识，修复索引 |
| [release](../.agents/skills/doc-maintainer/references/release.md) | 准备发布版本和变更说明 | 版本与 Changelog 核对、Release Notes 草稿；默认不打 Tag、不发布 |

默认以 `update` 处理开发过程中的文档和 Unreleased Changelog 维护；无业务代码但需要写方案用 `design`；准备发版文档用 `release`；首次接入、只审计、模块深入或目录迁移则使用对应模式。设计通过后由 Coding Agent 实现，再通过 `update` 核对实现、更新当前架构与 Reference，并将旧方案标记 Implemented 或 Superseded。

## Optional external interface references

`docs/reference/` 是**可选的当前实现层**，仅依据项目实际已提供的对外能力按需创建；未实现的 CLI/API 契约先写在 `docs/proposals/`：
- CLI：`reference/cli/`，命令、Flags、配置和退出码。
- HTTP：`reference/api/`，由已有 OpenAPI 或真实路由/契约定义驱动。
- gRPC：`reference/grpc/`，以 Protobuf 为权威来源。
- SDK：`reference/sdk/`，以公开符号和测试为依据。
- Events：`reference/events/`，以消息 Schema 和生产/消费约定为依据。

Web/App 的页面、屏幕与交互设计先放在 `docs/proposals/`，实现后的使用说明可按需要放入 `docs/guides/`，不强制建 `reference/web/` 或 `reference/app/`。没有相关能力时，不创建目录，也不编造接口契约。生成的接口参考从权威 Schema 或代码再生成，避免第二份手写事实来源。

## Pre-code design documents

零代码项目可以先创建（均标记 Proposed，按需创建）：
- `docs/requirements/prd.md` — 产品目标、MVP、用户场景、验收标准。
- `docs/proposals/architecture.md` — 跨项目类型的技术选型、计划的模块划分、关键流程、测试与里程碑。
- 按需创建 `docs/proposals/cli-commands.md`（CLI）、`web-experience.md`（Web）、`app-experience.md`（App）、`<interface>-contract.md`（API/SDK/Event）等。**这些是未实现的设计，不是当前接口参考。**
- `docs/decisions/0001-*.md` — 重要技术方案的 Proposed ADR。

模板入口：[Documentation Templates](templates/README.md)。版本管理、Changelog 与发版流程见 [Versioning](versioning.md)。只有评审确认后才能将方案状态改为 Accepted；实施完成后用 `update` 校验真实运行行为与文档。
