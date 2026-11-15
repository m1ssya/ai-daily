# Development Guide

在本仓库本地构建并预览「每日 AI 热帖」。命令已对照 [`package.json`](../package.json) 和本次执行环境核对。

## Prerequisites
| Tool | Version | Purpose |
|---|---|---|
| Node.js | 本环境验证为 v24.22.1；脚本使用 ES modules，需支持 `import` 的 Node 版本 | 运行 `scripts/build.mjs` |
| Python 3 | 本环境验证为 3.13.5 | `npm run serve` 使用 `python3 -m http.server`；文档检查使用 `python3 scripts/check_docs.py` |
| Git | 任意近期版本 | 克隆与提交 |

本仓库的 [`package.json`](../package.json) 没有 `dependencies` 或 `devDependencies`，本地构建不需要 `npm install`。

## Local setup
1. 克隆仓库：`git clone https://github.com/m1ssya/ai-daily.git`
2. 进入项目目录：`cd ai-daily`
3. 无需安装 Node 包依赖。
4. 无需额外配置文件或密钥。

## Common commands
| Purpose | Command | Notes |
|---|---|---|
| 构建静态站点 | `npm run build` | 执行 `node scripts/build.mjs`，输出到 `out/`。成功时打印生成的期次数和最新日期。 |
| 本地预览 | `npm run serve` | 先构建，再在 `out/` 上启动 HTTP 服务，监听 <http://127.0.0.1:4173/>。 |
| 文档链接检查 | `python3 scripts/check_docs.py` | 检查仓库内 Markdown 相对链接是否可解析。 |

没有单元测试、Lint 或格式化脚本。验证方式见 [测试策略](testing.md)。

## Configuration
当前没有环境变量或本地配置文件。行为由以下文件决定：

| 来源 | 作用 |
|---|---|
| [`content/issues/*.json`](../content/issues/) | 期次内容；字段约定见根目录 [README.md](../README.md) |
| [`vercel.json`](../vercel.json) | `buildCommand` 为 `npm run build`，`outputDirectory` 为 `out`，`framework` 为 `null` |
| [`src/styles.css`](../src/styles.css) | 站点样式 |

不要把密钥写入仓库或示例。

## Workflow
1. 阅读 [架构总览](architecture.md) 和受影响的 [Subsystem](subsystems/README.md)。
2. 修改源码、样式或期次 JSON。若新增期次，按 [发布新期次](runbooks/publish-issue.md) 操作。
3. 运行 `npm run build`，必要时 `npm run serve` 目检页面。
4. 若改了文档或链接，运行 `python3 scripts/check_docs.py`。
5. 同步受影响文档和（如有用户可见变化）`CHANGELOG.md` 的 `[Unreleased]`。
6. 提交时不要加入 `out/`、`screenshots/`、`node_modules/` 或 `.vercel/`。
