import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const issuesDir = path.join(root, "content", "issues");
const outDir = path.join(root, "out");
const stylesSrc = path.join(root, "src", "styles.css");

const SITE_NAME = "每日 AI 热帖";
const SITE_TAGLINE = "从 X 热帖整理的中文简报";
const FOOTER_NOTE =
  "内容由 AI 从 X 公开帖子整理，摘要可能有误，请以原帖为准。";
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const POST_URL_RE = /^https:\/\/x\.com\/[A-Za-z0-9_]+\/status\/\d+\/?$/;
const WEEKDAYS = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

function fail(message) {
  throw new Error(message);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  const weekday = WEEKDAYS[date.getUTCDay()];
  return `${y}年${m}月${d}日 ${weekday}`;
}

function issuePath(date) {
  return `/issues/${date}/`;
}

function validateIssue(issue, filename) {
  if (!DATE_RE.test(issue.date)) fail(`${filename}: date 必须是 YYYY-MM-DD`);
  if (filename !== `${issue.date}.json`) {
    fail(`${filename}: 文件名必须与 date 字段一致`);
  }
  for (const field of ["title", "intro"]) {
    if (typeof issue[field] !== "string" || !issue[field].trim()) {
      fail(`${filename}: 缺少有效的 ${field}`);
    }
  }
  if (!Array.isArray(issue.items) || issue.items.length < 1) {
    fail(`${filename}: items 至少需要 1 条`);
  }
  if (issue.items.length > 12) fail(`${filename}: items 过多，请控制在 5–8 条左右`);
  issue.items.forEach((item, i) => {
    const label = `${filename} items[${i}]`;
    for (const field of ["title", "summary", "author_handle", "post_url"]) {
      if (typeof item[field] !== "string" || !item[field].trim()) {
        fail(`${label}: 缺少有效的 ${field}`);
      }
    }
    if (item.author_handle.startsWith("@")) {
      fail(`${label}: author_handle 不要带 @`);
    }
    if (!POST_URL_RE.test(item.post_url)) {
      fail(`${label}: post_url 必须是 https://x.com/{handle}/status/{id}`);
    }
    if (!Array.isArray(item.tags)) fail(`${label}: tags 必须是数组`);
    if ("caveat" in item && (typeof item.caveat !== "string" || !item.caveat.trim())) {
      fail(`${label}: caveat 若出现则必须是非空字符串`);
    }
  });
}

function loadIssues() {
  if (!fs.existsSync(issuesDir)) fail("找不到 content/issues 目录");
  const files = fs.readdirSync(issuesDir).filter((name) => name.endsWith(".json"));
  const issues = files.map((name) => {
    const raw = fs.readFileSync(path.join(issuesDir, name), "utf8");
    let data;
    try {
      data = JSON.parse(raw);
    } catch (err) {
      fail(`${name}: JSON 无法解析（${err.message}）`);
    }
    validateIssue(data, name);
    return data;
  });
  issues.sort((a, b) => b.date.localeCompare(a.date));
  return issues;
}

function layout({ title, description, canonical, current, body }) {
  const ogTitle = escapeHtml(title);
  const ogDesc = escapeHtml(description);
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${ogTitle}</title>
  <meta name="description" content="${ogDesc}">
  <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}">
  <meta property="og:title" content="${ogTitle}">
  <meta property="og:description" content="${ogDesc}">
  <meta property="og:type" content="${current === "archive" ? "website" : "article"}">
  <meta property="og:locale" content="zh_CN">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${ogTitle}">
  <meta name="twitter:description" content="${ogDesc}">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&family=Noto+Serif+SC:wght@600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <a class="skip-link" href="#content">跳到正文</a>
  <header class="site-header">
    <div class="site-header-inner">
      <a class="wordmark" href="/">
        <span class="wordmark-title">${escapeHtml(SITE_NAME)}</span>
        <span class="wordmark-sub">${escapeHtml(SITE_TAGLINE)}</span>
      </a>
      <nav class="nav" aria-label="栏目">
        <a href="/" ${current === "home" ? 'aria-current="page"' : ""}>本期</a>
        <a href="/issues/" ${current === "archive" ? 'aria-current="page"' : ""}>往期</a>
      </nav>
    </div>
  </header>
  <main id="content">
    <div class="wrap">
      ${body}
    </div>
  </main>
  <footer class="site-footer">
    <div class="site-footer-inner">
      <p><strong>${escapeHtml(SITE_NAME)}</strong> · ${escapeHtml(FOOTER_NOTE)}</p>
    </div>
  </footer>
</body>
</html>
`;
}

function renderItems(items) {
  return items
    .map((item, i) => {
      const index = String(i + 1).padStart(2, "0");
      const tags = item.tags
        .map((tag) => `<li>${escapeHtml(tag)}</li>`)
        .join("");
      const caveat = item.caveat
        ? `<span class="caveat">${escapeHtml(item.caveat)}</span>`
        : "";
      return `<article class="item" id="item-${i + 1}">
        <div class="item-index" aria-hidden="true">${index}</div>
        <div class="item-body">
          <h2>${escapeHtml(item.title)}</h2>
          <p class="summary">${escapeHtml(item.summary)}</p>
          <div class="meta">
            <a class="author" href="https://x.com/${encodeURIComponent(item.author_handle)}" rel="noopener noreferrer" target="_blank">@${escapeHtml(item.author_handle)}</a>
            ${tags ? `<ul class="tags">${tags}</ul>` : ""}
            ${caveat}
            <a class="origin" href="${escapeHtml(item.post_url)}" rel="noopener noreferrer" target="_blank">查看原帖</a>
          </div>
        </div>
      </article>`;
    })
    .join("\n");
}



function renderIntro(intro) {
  return intro
    .split(/\n+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => `<p>${escapeHtml(part)}</p>`)
    .join("");
}

function formatIssueTitle(title) {
  const parts = title.split("，");
  if (parts.length < 2) return escapeHtml(title);
  const first = escapeHtml(parts[0] + "，");
  const rest = escapeHtml(parts.slice(1).join("，"));
  return `${first}<br>${rest}`;
}

function renderIssue(issue, { isHome }) {
  const kicker = isHome ? "最新一期" : "往期";
  return `
    <p class="issue-kicker"><span>${kicker}</span><time datetime="${escapeHtml(issue.date)}">${escapeHtml(formatDate(issue.date))}</time></p>
    <h1 class="issue-title">${formatIssueTitle(issue.title)}</h1>
    <div class="issue-intro">${renderIntro(issue.intro)}</div>
    <section class="item-list" aria-label="本期条目">
      ${renderItems(issue.items)}
    </section>
  `;
}

function renderArchive(issues) {
  const rows = issues
    .map((issue) => {
      const count = `${issue.items.length} 条`;
      return `<li>
        <a href="${issuePath(issue.date)}">
          <span class="archive-date">${escapeHtml(formatDate(issue.date))}</span>
          <span class="archive-issue-title">${escapeHtml(issue.title)}</span>
          <span class="archive-count">${escapeHtml(count)}</span>
        </a>
      </li>`;
    })
    .join("\n");
  return `
    <h1 class="archive-title">往期</h1>
    <p class="archive-lead">按日期查阅每一期「每日 AI 热帖」。</p>
    ${
      issues.length
        ? `<ol class="archive-list">${rows}</ol>`
        : `<p class="empty">还没有往期内容。</p>`
    }
  `;
}

function writeFile(target, content) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}

function emptyDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

const issues = loadIssues();
if (!issues.length) fail("content/issues 中没有有效的期次文件");
const latest = issues[0];

emptyDir(outDir);
fs.copyFileSync(stylesSrc, path.join(outDir, "styles.css"));

writeFile(
  path.join(outDir, "index.html"),
  layout({
    title: `${latest.title} · ${SITE_NAME}`,
    description: latest.intro,
    canonical: "/",
    current: "home",
    body: renderIssue(latest, { isHome: true }),
  }),
);

writeFile(
  path.join(outDir, "issues", "index.html"),
  layout({
    title: `往期 · ${SITE_NAME}`,
    description: "查阅每日 AI 热帖的往期简报。",
    canonical: "/issues/",
    current: "archive",
    body: renderArchive(issues),
  }),
);

for (const issue of issues) {
  writeFile(
    path.join(outDir, "issues", issue.date, "index.html"),
    layout({
      title: `${issue.title} · ${SITE_NAME}`,
      description: issue.intro,
      canonical: issuePath(issue.date),
      current: "issue",
      body: renderIssue(issue, { isHome: issue.date === latest.date }),
    }),
  );
}

console.log(`已生成 ${issues.length} 期到 out/，最新一期为 ${latest.date}`);
