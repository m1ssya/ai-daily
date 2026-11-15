# Mode: design — Plan any software project before coding

Use when a new project or major capability is still an idea and the user wants a PRD, technical proposal, interface/UX specification and implementation handoff **before code exists**.

This mode supports CLI, Web frontend, HTTP backend, mobile App, desktop App, SDK/library, worker/service, monorepo and mixed systems. Product type is a **detected need**, not a fixed template.

## Boundaries and source of truth

- Default deliverable: reviewable documents only. **Do not implement application code, deploy or publish.**
- User requirements and explicitly accepted decisions are the evidence for **intent**; they are not evidence of **implemented behavior**.
- Label all proposed architecture, interfaces, screens and commands `Proposed`, and illustrative outputs as not yet executable.
- For an empty repository, create only minimal document navigation and Agent instructions if needed. Do not run implementation-oriented `init` to fabricate source files or subsystem behavior.
- Re-running design updates existing proposals; preserve author decisions and unresolved questions.
- Existing implementation? If the task is new feature planning, still use design, but separate verified existing behavior from proposed changes; use `update` to reconcile after code changes.

## 1. Define product intent

Collect available inputs:
- Problem, target users, stakeholders, use cases, success criteria and MVP/non-goals.
- Target platforms and distribution/runtime environments.
- User journeys, inputs/outputs, UX, accessibility and data handling.
- Security, privacy, permissions, reliability, compatibility and external dependencies.
- Delivery constraints, acceptance expectations and release channels.

Use [PRD template](../../../../docs/templates/prd.md) → default `docs/requirements/prd.md`. Give requirements stable IDs and testable acceptance criteria. Missing information becomes a labeled assumption or question, not an invented fact.

## 2. Classify the **intended product**, not a framework dependency

| Project capability | Typical proposed artifact | Template |
|---|---|---|
| CLI commands and scripts | `docs/proposals/cli-commands.md` | [CLI spec](../../../../docs/templates/cli-spec.md) |
| Web frontend / dashboard / website | `docs/proposals/web-experience.md` | [Web spec](../../../../docs/templates/web-spec.md) |
| Mobile / desktop App | `docs/proposals/app-experience.md` | [App spec](../../../../docs/templates/app-spec.md) |
| HTTP backend, gRPC, SDK/library, events | `docs/proposals/<interface>-contract.md` | [Interface spec](../../../../docs/templates/interface-spec.md) |
| Worker / scheduled job / internal service | No mandatory external interface page; describe execution and dependencies in technical design | [Technical design](../../../../docs/templates/technical-design.md) |
| Monorepo / hybrid | Multiple relevant artifacts, **only for actually intended capabilities** | Choose matching templates |

A Web project may have both a browser UI and a backend API, but a static website does not automatically need an API spec. A desktop App does not automatically need a CLI spec. Never create unrelated empty directories.

## 3. Evaluate technical architecture

Use [Technical design template](../../../../docs/templates/technical-design.md) at `docs/proposals/architecture.md` by default; use a feature-scoped filename when appropriate.

Explain, as applicable:
1. System boundaries, components, ownership and data flows.
2. Significant alternatives, trade-offs and reasons for the chosen proposal.
3. Authentication, authorization, secrets, privacy and input trust boundaries.
4. Persistence, offline operation, caching, sync, errors, retries, concurrency and recovery.
5. Client UX / API interfaces / background jobs only when relevant.
6. Deployment/distribution, supported platforms, dependencies and observability.
7. Testing strategy and build/release approach.

For consequential technology or security decisions create **Proposed** ADRs using [ADR template](../../../../docs/templates/adr.md). Mark Accepted only after an authorized reviewer agrees.

Do not invent source paths or claim future components currently exist. Link proposed interface specs rather than duplicate them.

## 4. Design versioning and release expectations

- Decide whether the project needs public SemVer, CalVer, package versions, deployment SHA or platform/app-store versions. See [Versioning policy](../../../../docs/versioning.md).
- Identify expected release channels and compatibility commitments.
- Describe a plan to maintain `CHANGELOG.md` after user-visible changes are **implemented**. Do not list proposed features as shipped.
- Do not create a fake version tag or publication record for an unimplemented project.
- Keep **document revision** separate from application/package version.

## 5. Produce implementation-ready handoff

- Milestones ordered by dependency, each delivering a small verifiable slice.
- Map every MVP requirement to a deliverable, planned test and acceptance gate.
- State key failure and security tests; platform checks for Web/App as appropriate.
- Identify open decisions, risks, explicit non-goals and integration dependencies.
- Do not write application code by default. Coding Agents implement *after design review*.

## 6. Review and acceptance

Verify:
- PRD requirement IDs trace to technical choices and relevant interface/UX specs.
- Every promised MVP behavior has an acceptance criterion.
- Proposed diagrams, endpoints, commands, screens and examples are labeled proposed.
- Chosen solution is proportionate to actual goals.
- No unreleased behavior is documented as available or added to shipped Changelog history.
- All new docs are reachable from navigation and local links resolve.

Report created/revised documents, decisions, assumptions, unanswered questions, review status and first implementation slices. **Do not assume user approval.**

## Document states and handoff

`Draft / Proposed → Reviewed → Accepted → Implementing → Implemented / Superseded`.

After implementation, use `doc-maintainer update` to verify actual code and tests, then update current architecture and the relevant `docs/reference/<kind>/` only when that interface is implemented. Keep proposed designs as design history; never maintain two conflicting versions of the current contract.
