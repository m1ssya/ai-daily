# Subsystems

Subsystem 文档描述职责清晰、具有独立边界的模块，不是简单地为每个源码文件建页。

## Index
| Subsystem | Responsibility | Entry points | Status |
|---|---|---|---|
| [静态站点生成器](static-site-generator.md) | 读取并校验期次 JSON，生成首页、往期、单期页面并复制样式 | [`scripts/build.mjs`](../../scripts/build.mjs)、[`src/styles.css`](../../src/styles.css)、[`content/issues/`](../../content/issues/) | Active |

本仓库目前没有独立的 API、后台任务或账号子系统。期次字段约定的权威说明在根目录 [README.md](../../README.md)，构建校验规则以 `scripts/build.mjs` 为准。

## Page contents
- 职责、非目标和边界
- 代码入口和目录映射
- 上下游依赖与调用关系
- 核心流程、状态和数据模型
- API、事件、配置等契约
- 并发、重试、超时和失败处理
- 权限、安全边界和敏感数据处理
- 测试入口、可观测性和常见故障
- 相关 ADR、Runbook 和其他模块

当模块有独立职责、清晰边界、稳定接口或需要单独理解/维护时，建立页面。使用 [Subsystem template](../templates/subsystem.md)。新增、重命名或归档时同步本索引。
