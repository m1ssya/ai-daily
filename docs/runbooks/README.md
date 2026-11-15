# Runbooks

Runbook 描述可执行的运维任务和故障处置流程。

| Runbook | Scenario | Risk |
|---|---|---|
| [发布新期次](publish-issue.md) | 新增或修正 `content/issues/YYYY-MM-DD.json` 并完成本地构建 | 低：写错字段会导致构建失败；编造链接会误导读者 |

每份 Runbook 说明适用环境、权限、前置检查、步骤、验证、回滚和升级路径。破坏性操作必须明确警告和影响范围。使用 [Runbook template](../templates/runbook.md)。
