---
name: doc-maintainer
description: Design, initialize, update, audit, deepen, migrate, or prepare release documentation for AI-agent-driven software projects, including CLI, Web, mobile and desktop App, SDK, service and hybrid systems. Use for PRDs, architecture proposals, interface or UX specs, change impact analysis, changelogs, release notes, and documentation quality. Select a primary mode (design, init, update, audit, deepen, migrate, release) and read its reference workflow.
---

# Documentation Maintainer

Manage documentation as an evidence-backed, navigable view of a software repository. This Skill is the operational entry point; `AGENTS.md` and `docs/AGENTS.md` are standing rules.

## Modes

| Mode | Trigger | Default mutation | Workflow |
|---|---|---|---|
| `design` | Project idea or new capability before implementation | Write proposed requirements, design and interface specs; no code by default | [design](references/design.md) |
| `init` | First-time documentation onboarding or initial structure | Create only justified current-state pages | [init](references/init.md) |
| `update` | Feature, fix, refactor, changed PR / Git diff | Incrementally edit affected pages | [update](references/update.md) |
| `audit` | Documentation review, accuracy/coverage check | **Read-only**; report findings | [audit](references/audit.md) |
| `deepen` | A subsystem or runtime path needs more detail | Expand the focused owning page | [deepen](references/deepen.md) |
| `migrate` | Restructure, rename, consolidate old documentation | Preserve and relocate existing knowledge | [migrate](references/migrate.md) |
| `release` | Prepare a version, changelog and release notes | Review and prepare release docs, **never publish by default** | [release](references/release.md) |

Select the mode explicitly when the user supplies one. Otherwise infer the narrowest suitable mode:

1. User asks for requirements, architecture proposals, UX/interface specifications, or planning **before writing code** → `design`, even when the repo is empty, across CLI/Web/App/SDK/service types.
2. User wants to establish documentation structure / onboard an existing implementation → `init`.
3. User provides a code change, PR, or asks to keep current docs in sync → `update`.
4. User asks to inspect/report doc quality without requesting fixes → `audit`.
5. User requests a deeper account of one existing module/path → `deepen`.
6. User requests reorganization of existing docs → `migrate`.
7. User asks to prepare versioned CHANGELOG entries, Release Notes or an upgrade/release document → `release`.

For ambiguous mixed requests, pick one primary mode and perform other checks as subordinate steps (e.g. `design` can bootstrap minimal navigation; `update` includes a focused audit). Do not use `init` to rewrite an already-documented project. An empty repository with a user request to **design** a new application of any type selects `design`, not `init`. If asked to create a tag or publish artifacts, obtain explicit release intent separately; `release` is documentation-only by default.

**After choosing, read only the selected reference file.** Do not load every mode's instructions by default.

## Shared prerequisites

1. Read root `AGENTS.md` and the closest applicable subtree rules, including `docs/AGENTS.md` when working in `docs/`.
2. Read the user task and repository navigation. For implemented systems, inspect relevant source files, tests, manifests and deployment configuration; **do not require these artifacts for pre-code design**.
3. Classify required capabilities, possibly multiple: CLI, Web UI, backend API, mobile App, desktop App, SDK/library, worker or mixed. Distinguish **planned** interfaces from **implemented** ones. A CLI may have no HTTP API; a static Web app may have no server API. Never create unrelated interfaces or empty docs directories.
4. Respect existing authored documents, names and canonical owners; do not overwrite useful docs with templates.

## Placement and ownership

| Information | Canonical home |
|---|---|
| Always-on Agent rules | `AGENTS.md` |
| Documentation authoring policy | `docs/AGENTS.md` |
| Verified current composition and cross-module flows | `docs/architecture.md` |
| Product requirements (planned) | `docs/requirements/prd.md` or scoped requirement pages |
| Technical proposal, planned UX and interface contracts | `docs/proposals/<topic>.md` (e.g. `architecture.md`, `web-experience.md`, `app-experience.md`, `cli-commands.md`) |
| Module ownership, runtime behavior, state and internal contracts | `docs/subsystems/<name>.md` |
| Externally supported CLI/API/gRPC/SDK/events | `docs/reference/<kind>/`, **only if present** |
| Implementation contract in code or schema | Source code, OpenAPI, Protobuf, generated catalogs (whichever is authoritative) |
| Developer setup and verification | `docs/development.md`, `docs/testing.md` |
| Significant decisions and rejected alternatives | `docs/decisions/` |
| Release/version strategy | `docs/versioning.md` (adapted to project) |
| User-visible released and unreleased changes | Root `CHANGELOG.md` |
| Release communication | [Release Notes template](../../../docs/templates/release-notes.md) / GitHub Release (when approved) |
| How-to procedures and incident recovery | `docs/guides/`, `docs/runbooks/` |
| Incidents and reusable engineering lessons | `docs/postmortems/`, `LESSONS.md` |

One durable fact has one authoritative home; other pages link to it. Proposed requirements, designs and UX/interface specs document **future intent**, not current behavior. For implemented behavior, verified source code and tests take precedence over outdated docs; generated catalogs must be regenerated, not manually patched. Do not duplicate any proposed interface as a current Reference before implementation.

## Common execution policy

- Read selectively: navigation → owning document → source/test evidence. Do not load the entire docs tree into context.
- Verify public contracts, paths, defaults, command examples and runtime claims against current artifacts or executed checks.
- Distinguish **verified current behavior**, **proposed or accepted design intent**, **historical decision**, and **unverified assumption**. A pre-code proposal can contain unimplemented paths, but must label them planned rather than verified.
- Mark missing evidence explicitly. Never fabricate source paths, APIs, test results or command output.
- Minimize diff noise. Update only what is affected; an internal refactor with no semantic contract change may be a documentation no-op.
- Add or update adjacent index links when changing page paths.
- Protect history: preserve ADRs and postmortems; archive or supersede instead of silently erasing them.
- Never write secrets, personal credentials or production tokens into examples.
- `design` does not write application code by default. `audit` is read-only unless the user explicitly requests repairs. `migrate` must retain useful authored knowledge. `release` prepares documentation and **never automatically bumps application versions, creates Git tags/releases, deploys or publishes**.
- Match documentation depth to risk and complexity; a small project does not need a large docs tree.

## Validation

Run the repository's documentation check when present:

```bash
python3 scripts/check_docs.py
```

Run relevant language-specific checks, generators, tests and builds **if available and safe**. The checker validates links and basic hygiene, not semantic correctness; code and test review remains mandatory for accuracy claims.

## Completion report

Always state:
- **Mode** selected and scope; when relevant, the project/platform capabilities identified.
- **Evidence** inspected (real files/commands/tests).
- **Docs changed** or why no change was warranted.
- **Checks** executed, passed, failed and not run.
- **Open questions** and remaining risks.

## Examples of natural-language invocation

- `使用 doc-maintainer，mode=design。为零代码 Web、App 或 CLI 项目编写 PRD、技术方案及相应 UX/接口规范，暂不编码。`
- `使用 doc-maintainer，mode=init。分析已有 Go CLI 项目，只创建实际需要的当前实现文档。`
- `使用 doc-maintainer，mode=update。根据本次 PR 的代码变更同步文档。`
- `使用 doc-maintainer，mode=audit。只报告文档过期和缺失，不修改文件。`
- `使用 doc-maintainer，mode=deepen。补全任务调度模块的状态机和失败路径。`
- `使用 doc-maintainer，mode=migrate。整理旧 docs，保留有效知识并修复链接。`
- `使用 doc-maintainer，mode=release。根据已实现的变更准备 CHANGELOG 和 Release Notes，不打 Tag、不发布。`

These are prompt examples, not commands provided by a `doc-maintainer` executable.
