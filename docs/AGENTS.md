# Documentation Agent Rules

本文件补充根目录 [AGENTS.md](../AGENTS.md)，仅对文档工作生效。

本仓库是静态站点，没有已实现的 HTTP API、CLI、gRPC 或 SDK；不要为这些能力建立空的 Reference 目录。产品与期次约定见根目录 [README.md](../README.md)。

## 定位
- 从 [文档总索引](README.md) 进入，不猜测页面位置。
- 产品需求与待实现方案分别放在 `requirements/` 和 `proposals/`，必须标记 Proposed / Accepted 等设计状态；已实现模块知识放在 `subsystems/`，当前架构全景放在 `architecture.md`；决策放在 `decisions/`；操作步骤放在 `runbooks/`。
- 先查找权威页面，避免重复描述。

## 写作
- 同时服务人类和 Agent：明确目的、范围、术语、前置条件、边界、输入输出、失败路径和验证方式。
- 先给结论和导航，再给机制细节；用表格和 Mermaid 图表达复杂关系。
- 描述**当前行为**的代码路径、配置键和命令必须核实；**设计阶段**可提出计划中的路径、配置键和命令，但必须标记为 Proposed / 未实现，不能声称已经验证。未知项标记 TBD。
- 示例明确标记为示例；命令说明执行目录、权限和副作用。
- 不要为了采用模板而假设项目必须是 CLI、HTTP 服务或 App；只创建真实需求或实现需要的文档。
- 已实现的用户可见变更评估是否更新根目录 `CHANGELOG.md`；方案中的未来功能不能出现在已发布区块中。

## 更新
每次变更检查模块行为、接口/配置/数据/权限契约、图表/索引/ADR/Runbook 是否受影响。无需更新时，在 PR 说明原因。不要为小改动机械修改所有文档。

## doc-maintainer mode 选择

尚无代码或需要先写 PRD/技术方案时使用 `design`（可适配 CLI/Web/App/Service/SDK）；仅接入文档体系使用 `init`；正常代码变更使用 `update`；用户只要求检查时使用只读 `audit`；深入特定模块使用 `deepen`；整理现有文档目录使用 `migrate`；需要准备版本、Changelog、Release Notes 时使用 `release`（默认不发布）。详细工作流见 [doc-maintainer Skill](../.agents/skills/doc-maintainer/SKILL.md)。

没有实际 HTTP API、gRPC、SDK 或 CLI 接口时，不建立对应的空 Reference 目录。当前实现文档的创建和更新必须基于真实的源码、测试或权威契约；设计文档则基于明确的需求、假设和技术论证，并与当前实现严格区分。
