# Documentation Templates

模板是用于新项目的写作骨架，并非描述本仓库已实现的功能。

## Pre-implementation design (mode=design)

| Template | Suggested project path | Purpose |
|---|---|---|
| [PRD](prd.md) | `docs/requirements/prd.md` | 用户、问题、MVP、需求和验收标准 |
| [Technical design](technical-design.md) | `docs/proposals/architecture.md` | 与项目类型无关的技术选型、组件边界与里程碑 |
| [CLI specification](cli-spec.md) | `docs/proposals/cli-commands.md`（仅 CLI） | 计划支持的 CLI 命令、Flags、输出和错误约定 |
| [Web specification](web-spec.md) | `docs/proposals/web-experience.md`（仅 Web UI） | 页面路由、交互、状态、权限和可用性 |
| [App specification](app-spec.md) | `docs/proposals/app-experience.md`（仅 App） | 移动/桌面界面、生命周期、权限、离线和分发 |
| [Interface specification](interface-spec.md) | `docs/proposals/<interface>-contract.md`（按需） | HTTP/gRPC/SDK/Event 等计划中的契约 |
| [ADR](adr.md) | `docs/decisions/0001-<topic>.md` | 重要技术决策及其取舍 |

以上路径是示例，不要求每个项目都有 CLI 或 ADR。Design 产物应标记 Proposed / Reviewed / Accepted，不得声称已运行。

## Implemented or operational knowledge

| Template | Suggested project path | Purpose |
|---|---|---|
| [Subsystem](subsystem.md) | `docs/subsystems/<name>.md` | 已实现模块的职责、调用链和验证 |
| [Runbook](runbook.md) | `docs/runbooks/<procedure>.md` | 可操作的部署或排障步骤 |
| [Postmortem](postmortem.md) | `docs/postmortems/<incident>.md` | 故障复盘与行动项 |
| [Upgrade](upgrade.md) | `docs/upgrade-guide/<version>.md` | 迁移、兼容性和回滚 |
| [Release Notes](release-notes.md) | 发布草稿或 GitHub Release | 某次发布的亮点、兼容性、已知问题和验证证据 |

按当前项目实际情况创建文档，不创建无关空目录。版本及 Changelog 由 [Versioning policy](../versioning.md) 约束；根目录 `CHANGELOG.md` 记录真实用户可见变更而非设计中的功能。创建文档后更新最近的索引，并遵守 [文档写作规则](../AGENTS.md) 与 [文档治理说明](../documentation-system.md)。

## Workflow

- 新项目尚无代码：用 [design](../../.agents/skills/doc-maintainer/references/design.md) 写方案。
- 现有实现首次接入：用 [init](../../.agents/skills/doc-maintainer/references/init.md) 根据源码建立当前文档。
- 代码变更：用 [update](../../.agents/skills/doc-maintainer/references/update.md) 校准事实与文档，并按需维护 Unreleased Changelog。
- 准备发版文档：用 [release](../../.agents/skills/doc-maintainer/references/release.md) 核对版本、Changelog 和 Release Notes；默认不执行发布。
