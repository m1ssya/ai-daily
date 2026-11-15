# Documentation

本目录是「每日 AI 热帖」的项目知识导航入口。这是一个无框架静态站点，不是 CLI、HTTP API 或 App。建议从架构到模块，再到开发和操作。

## 阅读路径
- 理解产品与期次格式：[根目录 README](../README.md)
- 理解系统：[架构总览](architecture.md)
- 开始开发：[开发指南](development.md)、[代码规范](code-standards.md)
- 验证变更：[测试策略](testing.md)
- 发布一期简报：[发布新期次](runbooks/publish-issue.md)
- 理解模块：[Subsystem 索引](subsystems/README.md)
- 理解决策：[ADR 索引](decisions/README.md)
- 理解文档机制：[文档治理](documentation-system.md)、[模板索引](templates/README.md)
- 管理变更记录：[版本与 Changelog 规范](versioning.md)
- 执行其他操作：[Runbook 索引](runbooks/README.md)
- 升级迁移：[升级指南](upgrade-guide/README.md)（目前尚无迁移指南）
- 事故复盘：[Postmortem 索引](postmortems/README.md)

## 按任务查找
| 任务 | 首选文档 |
|---|---|
| 了解站点做什么、如何写一期 JSON | [根目录 README](../README.md) |
| 新增或修改构建、页面或样式 | [静态站点生成器](subsystems/static-site-generator.md) |
| 改变系统边界或依赖 | [架构总览](architecture.md) + [ADR](decisions/README.md) |
| 本地构建、预览 | [开发指南](development.md) |
| 发布一期简报 | [发布新期次](runbooks/publish-issue.md) |
| 准备版本发布 | `doc-maintainer release` + [CHANGELOG](../CHANGELOG.md) + Release Notes；当前尚无 SemVer 标签 |
| 还没有实现、需要先写方案 | `doc-maintainer design` + 适配的模板；未实现能力不得写成已交付 |

文档与代码同 PR 更新。详细要求见 [AGENTS.md](AGENTS.md)。
