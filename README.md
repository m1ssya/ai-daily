# 每日 AI 热帖

把 X 上关于 AI 与 AI 智能体的热帖，整理成一份可打开、可分享的中文每日简报。

本仓库是静态网站：每期一篇 JSON，构建后生成首页、往期列表和单期页面。部署到 Vercel 时，把本目录作为项目根目录即可（见下方「构建与预览」）。

## 数据格式

每期一篇，放在：

```
content/issues/YYYY-MM-DD.json
```

文件名中的日期必须与字段 `date` 一致，使用 ISO 日期（例如 `2026-11-14`）。

### 期次对象

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `date` | string | 是 | 期次日期，格式 `YYYY-MM-DD`，与文件名一致 |
| `title` | string | 是 | 中文标题，概括本日主线 |
| `intro` | string | 是 | 本期导语，1–2 句中文总述；可用换行分成多段 |
| `items` | array | 是 | 条目列表，每期 5–8 条 |

### `items[]` 条目对象

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `title` | string | 是 | 中文标题 |
| `summary` | string | 是 | 中文摘要，1–3 句，只写原帖里能对上的事实，不编造数字或出处 |
| `author_handle` | string | 是 | 作者在 X 上的用户名，**不要**带 `@` |
| `post_url` | string | 是 | 原帖真实网址，必须是 `https://x.com/{handle}/status/{id}`，禁止编造；找不到真实链接就丢掉这一条 |
| `tags` | string[] | 是 | 中文或常用专名标签，建议 2–4 个；可以是空数组，但不能缺这个字段 |
| `caveat` | string | 否 | 需要提醒读者的标注，例如 `未经证实`。没有疑点时请省略该字段，不要写空字符串 |

### 示例

```json
{
  "date": "2026-11-14",
  "title": "智能体开始代购，航司却把订票的门关上了",
  "intro": "今天这期像一张智能体落地的横切面……",
  "items": [
    {
      "title": "OpenAI 推出 ChatGPT Wallet，智能体可代为下单付款",
      "summary": "多家账户报道称，OpenAI 已推出 ChatGPT Wallet……",
      "author_handle": "crypto_banter",
      "post_url": "https://x.com/crypto_banter/status/2121259823131926933",
      "tags": ["ChatGPT", "支付", "智能体"]
    }
  ]
}
```

若某条需要标注，加上：

```json
"caveat": "未经证实"
```

### 采编约定

后续每日例行任务应按本格式直接生成 JSON，不要改字段名。

- 只收录真实存在的原帖；没有 `post_url` 就删掉该条，绝不编造链接、用户名或数字。
- 摘要以原帖为准，转述时不补充原帖没有的数据。
- 丑闻、辞职、间谍之类未核实传闻不要作为条目；若必须提到未证实说法，用 `caveat` 标明。
- 用户可见文案一律使用简体中文。

## 构建与预览

```bash
npm run build
```

生成结果在 `out/`：

- `out/index.html`：首页，展示最新一期
- `out/issues/index.html`：往期列表
- `out/issues/YYYY-MM-DD/index.html`：单期页面

本地预览：

```bash
npm run serve
```

然后打开 <http://127.0.0.1:4173/>。

部署到 Vercel 时，框架选 Other，构建命令为 `npm run build`，输出目录为 `out`。仓库里已包含 `vercel.json`。绑定域名、创建账号或公开发布，需要站点所有者另行确认后再做。

## 技术说明

站点用 Node.js 脚本把 JSON 生成静态 HTML，不依赖前端框架，方便以后接到每日自动更新流程，也方便放到 Vercel。

## 工程文档与贡献

仓库采用 [agentic-engineering](https://github.com/m1ssya/agentic-engineering) 文档与工作流规范。Agent 与贡献者请先阅读 [AGENTS.md](AGENTS.md)；文档导航见 [docs/README.md](docs/README.md)。本地构建和文档链接检查：

```bash
npm run build
python3 scripts/check_docs.py
```
