# Testing Strategy

本仓库目前没有独立的单元测试、集成测试或端到端测试套件，也没有测试框架依赖。现有验证来自构建期校验、文档链接检查和本地预览。

| Layer | Goal | Current status | Checks |
|---|---|---|---|
| 构建期校验 | 拒绝无效期次 JSON，并成功写出静态页面 | 已实现 | `npm run build` → [`scripts/build.mjs`](../scripts/build.mjs) 中的 `validateIssue()` / `loadIssues()` |
| 文档链接 | 相对 Markdown 链接可解析 | 已实现 | `python3 scripts/check_docs.py` |
| 手工预览 | 目检首页、往期和单期页面 | 手工 | `npm run serve`，打开 <http://127.0.0.1:4173/> |
| 单元 / 集成 / 契约 / E2E 自动化 | 回归测试页面渲染或链接可达性 | **未实现** | 无 |

## Build-time validation
[`scripts/build.mjs`](../scripts/build.mjs) 在生成页面前校验每期 JSON，失败则抛错并中止构建。已验证的规则包括：

- `date` 必须是 `YYYY-MM-DD`，且与文件名一致。
- `title`、`intro` 必须是非空字符串。
- `items` 必须是至少 1 条的数组；超过 12 条会失败。编辑约定是每期 5–8 条（见根目录 [README.md](../README.md)），构建脚本并未把 5 条设为下限。
- 每条必须有非空的 `title`、`summary`、`author_handle`、`post_url`。
- `author_handle` 不得以 `@` 开头。
- `post_url` 必须匹配 `https://x.com/{handle}/status/{id}`。
- `tags` 必须是数组（可以为空）。
- 若出现 `caveat`，必须是非空字符串。

构建脚本只检查格式，不请求网络，也不验证原帖是否真实存在。

## Design principles
- 新增校验规则时，同步更新根目录 README 中的字段约定、本页和 [静态站点生成器](subsystems/static-site-generator.md)。
- 修复渲染或校验缺陷时，优先把可重复的检查加进构建脚本；在自动化测试套件出现前，PR 应说明已运行的命令和未运行的检查。
- 不要依赖生产站点或外部 X 页面作为唯一验证。

## Commands
在仓库根目录执行：

```bash
npm run build
python3 scripts/check_docs.py
```

PR 应记录实际结果；未执行的检查标记为 Not run。
