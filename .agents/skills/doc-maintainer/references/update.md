# Mode: update — Incremental synchronization with code changes

Use for normal feature development, bug fixes, refactors and PR documentation review. If a previously accepted proposal is being implemented, compare the actual behavior against the PRD, technical design and proposed interface contract.

## Determine the comparison scope

1. Read the task and inspect `git status --short`.
2. Determine the requested base and head, usually the PR base/merge-base when available.
3. Include committed, staged, unstaged and relevant untracked changes. `git diff` alone does not cover all four.
4. If no baseline is available, state the comparison limitation; inspect the changed files provided by the user and nearby callers/tests.
5. Identify semantic changes rather than treating every touched file as a documentation trigger.

## Impact analysis

Map the changed code to one or more owning documents. Check:

- Behavior/contract: CLI, Web routes/screens, mobile/desktop App UX, HTTP/gRPC/SDK, events, settings, defaults, data schemas.
- Architecture: boundaries, dependencies, lifecycle, source-of-truth changes.
- Reliability/security: error modes, retries, concurrency, authorization, secrets, tenancy.
- Operations: setup, deployment, app distribution, migrations, compatibility, rollback.
- Documentation navigation: new/deleted/renamed modules or references.
- Changelog: Does the change alter behavior visible to users or integration clients? If yes, propose/update the `[Unreleased]` entry. If internal-only, no Changelog update is required. Never describe Proposed or unmerged features as released.

Trace relevant callers, storage and error paths, not only lines shown in the diff.

## Decision

Classify each affected document:

- `required`: a documented contract or navigation path changed.
- `optional`: clarification would materially help without changing a contract.
- `none`: internal refactor or implementation detail with unchanged documented behavior.

For `none`, do not edit docs just to satisfy a checklist. State the no-update rationale in the final summary or PR description.

## Update

1. Update the owning page; avoid duplicating facts in overview pages.
2. Fix affected indexes, relative links and diagrams.
3. Add an ADR only for a durable architectural decision, not routine refactoring.
4. Update external interface references only when the corresponding interface changes.
5. Do not hand-edit generated API / CLI catalogs. Change their source and run the generator when available.
6. Preserve unaffected prose and minimize diff noise.
7. When implementation realizes a proposal, verify actual behavior, create/update supported external references if needed, and mark the proposal Implemented or Superseded. Never silently convert unverified design intent into claims about runtime behavior.
8. For user-visible changes, review [CHANGELOG.md](../../../../CHANGELOG.md) and add a concise evidence-based `[Unreleased]` entry as appropriate. Do not bump release versions or create tags during routine update; use [release](release.md) for release documentation.

## Verification

- Recheck changed claims against code, tests and config.
- Run `python3 scripts/check_docs.py` when present.
- Run relevant project checks when available and safe.
- Describe exactly which tests ran, any failures and all unverified assertions.
- Keep code, tests and documentation in the same PR when possible.
