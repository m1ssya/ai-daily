# 发布新期次

在仓库中新增或修正一期「每日 AI 热帖」，并完成本地校验。

## 适用环境
本地开发环境。不需要生产密钥。本流程**不**包含创建 Vercel 项目、绑定自定义域名或自动发帖。

## 权限
需要本仓库的写权限才能提交和推送。

## 前置检查
- 已阅读根目录 [README.md](../../README.md) 的字段约定和采编约定。
- 每条都有真实的 `https://x.com/{handle}/status/{id}` 链接；找不到真实链接就丢掉该条。
- 文件名将是 `content/issues/YYYY-MM-DD.json`，且与字段 `date` 完全一致。
- Node.js 和 Python 3 可用，见 [开发指南](../development.md)。

## 步骤
1. 在 `content/issues/` 新建（或编辑）`YYYY-MM-DD.json`。建议每期 5–8 条；构建脚本允许 1–12 条。
2. 确认 `author_handle` 不含 `@`，`tags` 为数组，没有疑点时不要写空的 `caveat`。
3. 在仓库根目录运行：

```bash
npm run build
```

4. 构建成功后，可用 `npm run serve` 打开 <http://127.0.0.1:4173/>，检查首页、往期列表和 `/issues/YYYY-MM-DD/`。
5. 提交 JSON（以及如有的生成器或文档修改）。不要提交 `out/`。
6. 若该期对读者可见，在 [CHANGELOG.md](../../CHANGELOG.md) 的 `[Unreleased]` 记下发布了哪一期。

把变更推送到 GitHub 之后，公开站点是否自动更新取决于 Vercel 项目是否已连接本仓库。当前公开站点是 <https://ai-daily-flame.vercel.app>，但本 Runbook 不假设自动部署已经接通。

## 验证
- 终端出现类似 `已生成 N 期到 out/，最新一期为 YYYY-MM-DD` 的输出。
- 本地预览中，新期标题、摘要、标签、原帖链接和（如有）`caveat` 显示正确。
- 若改了文档，再运行 `python3 scripts/check_docs.py`。

## 失败与回滚
- 构建报错时，按错误信息修正 JSON 或文件名，不要手工改 `out/` 来「绕过」校验。
- 若错误内容已提交，用修正后的 JSON 再提交；如该期尚未应被公开，回退该 Commit。
- 每次 `npm run build` 会删除并重建整个 `out/`。

## 升级路径
期次字段若有变更，先改 [`scripts/build.mjs`](../../scripts/build.mjs) 的校验与渲染，再同步根目录 README 和 [静态站点生成器](../subsystems/static-site-generator.md)。
