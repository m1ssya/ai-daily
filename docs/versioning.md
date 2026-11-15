# Versioning, Changelog and Release Policy

本页描述本仓库当前实际采用的变更记录方式。这是一个静态站点，[`package.json`](../package.json) 没有 `version` 字段，仓库里也还没有 SemVer 标签或正式发版流程。不要发明第二套尚未落地的版本号。

## 1. Separate the concepts

| Artifact | Current role in this repo |
|---|---|
| Git commit SHA | 标识确切源代码 |
| 期次日期 `YYYY-MM-DD` | 标识已发布的简报内容，对应 `content/issues/YYYY-MM-DD.json` 与页面 `/issues/YYYY-MM-DD/` |
| [CHANGELOG.md](../CHANGELOG.md) | 记录读者可感知的待发布变更；目前只有 `[Unreleased]`，没有版本区块 |
| Git tag `vX.Y.Z` | **尚未使用** |
| 应用/包版本号 | **尚未使用**；不要在未确认发版策略前写入 `package.json` 版本或伪造发布记录 |
| Release Notes / Upgrade Guide | 需要正式发版或破坏性迁移时再写 |

部署产物目前以公开站点 <https://ai-daily-flame.vercel.app> 为准，它反映的是某次构建结果，不等于 Git 标签。

## 2. Current strategy

- 日常用 Conventional Commits 提交；Commit 本身不是一次版本发布。
- 读者可见的功能、内容和行为变化写入 `CHANGELOG.md` 的 `[Unreleased]`。
- 期次内容以日期标识，不为每一期单独打 SemVer。
- 若日后需要软件版本，再选择 SemVer 或其他明确策略，并更新本页与 Changelog 比较链接；在此之前不要创建虚构的 `v0.1.0` 记录。

## 3. Authoritative identifiers

当前权威标识是 Git commit SHA 和期次 JSON 的 `date` 字段。页面文案、文档修订号和 Vercel 部署 URL 都不是软件版本号。

## 4. Changelog policy

维护根目录 [CHANGELOG.md](../CHANGELOG.md)：

1. 新增真正面向读者的功能、行为修复或已发布期次时，添加到 `[Unreleased]` 对应分类。
2. 禁止将尚未实现的方案写成已交付，包括访问统计、自动写入期次、分享卡片图、自定义域名和自动发帖。
3. 内部重构、文档规范接入、测试改进等无读者可感知变化的提交可不更新。
4. Breaking Change 必须说明旧行为、新行为和迁移路径；复杂迁移使用 `docs/upgrade-guide/`。
5. 若日后正式发版，再把本次内容移到 `[X.Y.Z] - YYYY-MM-DD`，并保留 `[Unreleased]`。
6. Changelog 不等同于 Git log；不要机械复制每条 Commit。

## 5. Release process

`doc-maintainer release` 默认只准备并核对文档，不创建 Git tag、GitHub Release，也不部署生产环境。

当前发布一期简报的操作见 [发布新期次](runbooks/publish-issue.md)，它不是 SemVer 发版。若未来要给站点本身打版本：

1. 维护者明确选择范围、目标版本和发布渠道。
2. 确认 Changelog、构建（`npm run build`）和文档检查已通过。
3. 只有获得明确批准后，才创建标签或发布说明。

## 6. Checklist

- [ ] 确认公开页面路径、期次字段或读者可见行为是否变化。
- [ ] 确认 Changelog `Unreleased` 只含真实交付能力。
- [ ] 未引入尚未批准的版本号或 Git tag。
- [ ] 确认 `npm run build` 与 `python3 scripts/check_docs.py` 的实际结果；没有跑的检查明确列出。
- [ ] 如涉及破坏性变更，确认升级与回滚说明。
