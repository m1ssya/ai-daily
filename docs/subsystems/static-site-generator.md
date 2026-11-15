# 静态站点生成器

已实现的构建与页面生成模块。

## 职责、非目标和边界
- **职责**：读取 `content/issues/*.json`，校验后生成静态 HTML，并把 `src/styles.css` 复制到 `out/styles.css`。
- **非目标**：运行时服务、访问统计、自动从例行简报写入 JSON、生成分享卡片图。
- **边界**：内容作者负责提供合法 JSON；本模块负责校验格式并渲染。原帖真实性由采编约定约束，不在构建时联网核查。

## 代码入口和目录映射
| 路径 | 作用 |
|---|---|
| [`scripts/build.mjs`](../../scripts/build.mjs) | 唯一构建入口：校验、排序、渲染、写文件 |
| [`package.json`](../../package.json) | `build` / `serve` 脚本；无第三方依赖 |
| [`src/styles.css`](../../src/styles.css) | 站点样式源文件 |
| [`content/issues/*.json`](../../content/issues/) | 期次输入 |
| [`vercel.json`](../../vercel.json) | 部署时的构建命令和输出目录 |
| `out/` | 生成结果，已忽略，不入库 |

## 上下游依赖与调用关系
- 上游：仓库中的期次 JSON 与样式文件。
- 下游：`out/` 中的静态文件，可由本地 `python3 -m http.server` 或 Vercel 静态托管对外提供。
- 页面运行时还会请求 Google Fonts，条目链向 `x.com`。

## 核心流程和数据模型
构建流程见 [架构总览](../architecture.md) 的数据流。期次对象和 `items[]` 字段以根目录 [README.md](../../README.md) 为编辑约定权威来源。构建脚本中的实际校验是：

- 必填：`date`、`title`、`intro`、`items`（至少 1 条，多于 12 条失败）。
- 条目必填：`title`、`summary`、`author_handle`、`post_url`、`tags`（数组，可为 `[]`）。
- 可选：`caveat`（出现则必须非空）。
- `post_url` 正则：`^https://x\.com/[A-Za-z0-9_]+/status/\d+/?$`。

输出页面：

| 输出 | 含义 |
|---|---|
| `out/index.html` | 首页，展示日期最新的一期，`current=home` |
| `out/issues/index.html` | 往期列表，`current=archive` |
| `out/issues/YYYY-MM-DD/index.html` | 单期页面，`current=issue` |
| `out/styles.css` | 由 `src/styles.css` 复制 |

每页共用 `layout()`：站点名「每日 AI 热帖」，导航为「本期」「往期」，页脚提示摘要可能有误、请以原帖为准。HTML 包含基础的 `og:*` 与 `twitter:card=summary` 元数据；没有生成分享图。

## 失败处理
- JSON 无法解析、校验失败、缺少 `content/issues` 或没有任何有效期次时，脚本抛出 `Error`，构建失败。
- 每次构建会删除并重建整个 `out/`，不是增量更新。
- 没有重试、超时或并发控制；构建是单进程同步执行。

## 安全
- 渲染字段经 `escapeHtml()` 处理。
- 作者主页为 `https://x.com/${encodeURIComponent(author_handle)}`。
- 不处理账号或密钥。

## 验证
```bash
npm run build
```
成功时在终端打印生成的期次数和最新日期。本地目检使用 `npm run serve`。更多说明见 [测试策略](../testing.md)。

## 相关文档
- [架构总览](../architecture.md)
- [ADR-0001](../decisions/0001-no-framework-static-generator.md)
- [发布新期次](../runbooks/publish-issue.md)
- [开发指南](../development.md)
