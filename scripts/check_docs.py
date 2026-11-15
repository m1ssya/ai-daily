#!/usr/bin/env python3
"""Check local Markdown links and basic documentation hygiene."""
from __future__ import annotations
import re
import sys
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {".git", ".venv", "node_modules"}
LINK_RE = re.compile(r"!?\[[^\]]*\]\(([^)]+)\)")

def markdown_files() -> list[Path]:
    return [p for p in ROOT.rglob("*.md") if not any(x in SKIP_DIRS for x in p.relative_to(ROOT).parts)]

def main() -> int:
    errors: list[str] = []
    files = markdown_files()
    for path in files:
        content = path.read_text(encoding="utf-8")
        for match in LINK_RE.finditer(content):
            target = match.group(1).strip()
            if not target or target.startswith(("http://", "https://", "mailto:", "#")):
                continue
            target = target.split("#", 1)[0].split("?", 1)[0]
            if target and not (path.parent / unquote(target)).resolve().exists():
                errors.append(f"{path.relative_to(ROOT)}: broken link: {match.group(1)}")
    if errors:
        print("\n".join(errors), file=sys.stderr)
        print(f"Documentation check failed: {len(errors)} issue(s).", file=sys.stderr)
        return 1
    print(f"Documentation check passed: {len(files)} Markdown file(s).")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
