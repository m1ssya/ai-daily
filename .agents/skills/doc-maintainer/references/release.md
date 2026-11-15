# Mode: release — Prepare version and changelog documentation

Use when preparing a release candidate, consolidating user-visible changes, drafting release notes, reviewing compatibility or reconciling a version proposal with repository history.

## Default safety boundary

**Default to preparation and review only.** This Skill does not tag a commit, bump an actual package/application version, create a GitHub Release, deploy or publish an app/package without a separate explicit instruction and appropriate repository tooling/approval.

Release documentation is not proof that artifacts were built, signed, tested, distributed or installed.

## Step 1 — Discover the release model

- Determine actual project type: CLI, web service, browser frontend, mobile app, desktop app, library, monorepo or mixed.
- Read [versioning policy](../../../../docs/versioning.md), repository-specific release instructions, current tags/releases and package metadata.
- Find the **authoritative** version source and release channel(s); do not invent a version strategy if one already exists.
- Identify prior release tag/commit and target branch; if missing, report it and avoid pretending a diff is exhaustive.
- Distinguish `0.x` compatibility policy and prerelease versions from stable guarantees.

## Step 2 — Reconcile actual changes

1. Inspect commits/PRs and code changes since the last relevant release tag (including staged/unreleased changes only when explicitly intended).
2. Group by user impact: Added, Changed, Deprecated, Removed, Fixed, Security.
3. Identify breaking CLI/API/SDK/contracts, Web UI/behavior, App local data schema, permissions or OS compatibility as applicable.
4. Exclude speculative design docs and unmerged features from shipped claims.
5. Link evidence to tests, PRs or actual code. State missing test evidence as missing.

## Step 3 — Prepare artifacts

- Update **Unreleased** changes in `CHANGELOG.md` or prepare the proposed version block in a reviewable draft.
- Draft Release Notes using [release-notes template](../../../../docs/templates/release-notes.md).
- For significant incompatibilities or data migrations, create an upgrade guide from `docs/templates/upgrade.md` and link it.
- Check relevant external interface docs and operations docs are in sync.
- Never copy the full Git log or write marketing claims absent evidence.

## Step 4 — Check version consistency

- Verify planned version and proposed tag respect chosen SemVer/CalVer/package strategy.
- Confirm all version references correspond to the intended artifact (code version vs deployment SHA vs mobile build number).
- For monorepos, clarify package scope and independent/dependent release strategy.
- Check `CHANGELOG.md`, notes, migration guide and project version source agree, **or report differences clearly**.

## Step 5 — Gate and report

Output:
- Proposed version and artifact/release scope, clearly labeled a **proposal** until approved.
- Candidate changes grouped by user impact and evidence.
- Breaking/compatibility/security and rollback considerations.
- Files created/updated, checks performed and checks not performed.
- Blocking questions or missing proof.
- Explicit statement: **No publication/tag/deployment has been performed** unless separately instructed and confirmed by the appropriate action.

If asked to actually publish, treat that as a **separate** release operation requiring explicit target version, target repository/channel and approval; follow the project's release automation and verify outputs.
