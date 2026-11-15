# Contributing

1. 阅读 [AGENTS.md](AGENTS.md) 和相关目录规则。产品说明与期次字段约定见根目录 [README.md](README.md)。
2. 明确变更目标和验收标准，避免混入无关清理。
3. 更新受影响文档、索引、示例和模板；用户可见变化评估 `CHANGELOG.md` 的 `Unreleased` 条目。
4. 运行 `npm run build` 和 `python3 scripts/check_docs.py`。不要提交 `out/`、`screenshots/`、`node_modules/` 或 `.vercel/`。
5. PR 说明影响范围、验证结果和文档同步情况。

## 文档原则
- 新页面从模板创建并加入索引。
- 模块行为放在 Subsystem 文档；重大技术取舍使用 ADR；操作步骤放在 Runbook。
- 事故复盘评估是否沉淀 Postmortem、Runbook 或 LESSONS。
- 不确定内容标记 TBD，不编造。
- 期次内容只收录真实原帖；不要编造 `post_url`、用户名或数字。

## Version and release

本仓库目前没有 SemVer 标签或正式发版流程。用户可见变更记在 [CHANGELOG.md](CHANGELOG.md) 的 `[Unreleased]`。完整策略见 [版本规范](docs/versioning.md)。日常 Commit 不等于版本发布；不要在未获维护者确认时创建版本号或 Git Tag。

## Commit message
推荐 Conventional Commits：`feat`、`fix`、`docs`、`refactor`、`test`、`build`、`ci`、`chore`。
