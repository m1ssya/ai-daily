# Changelog

本文件记录对读者可见的重要变更，格式参考 [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)。本仓库目前没有 SemVer 标签，也没有已发布的版本区块；变更先记在 `[Unreleased]`。版本策略见 [docs/versioning.md](docs/versioning.md)。

## [Unreleased]

### Added

- 上线静态网站「每日 AI 热帖」：由 `scripts/build.mjs` 把 `content/issues/*.json` 构建为首页、往期列表和单期页面。当前公开站点：<https://ai-daily-flame.vercel.app>。
- 发布 2026-11-14 期：《智能体开始代购，航司却把订票的门关上了》。
- 发布 2026-11-15 期：《Agent 开始落地，风险辩论也更尖锐了》。
- 发布 2026-11-16 期：《Agent 能不能把活干完，成了今天的主线》。

<!--
维护规则：
1. 从首次开发起保留 Unreleased；未实际实现、未合并或未验证的功能不要写为已交付。
2. 只记录与读者相关的变化；内部重构和纯文档规范接入通常无需记录。
3. 分类没有内容时省略空标题，但保留 Unreleased 入口。
4. 若日后正式发版，在 Unreleased 下创建带版本、日期的历史区块，将已发布内容移入该区块；不要在尚无版本策略落地前伪造版本号。
5. 不在 CHANGELOG 中复制完整 PR 描述、测试报告或每个 Commit。
-->
