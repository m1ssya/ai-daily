# Mode: init — Bootstrap a project's documentation

Use when a repository needs a documentation baseline or the user explicitly asks to adopt this standard. If the user wants requirements or a technical plan before code exists, select [design](design.md) instead.

## Discovery

1. Inspect root README, existing instructions, repository tree, build files, manifests, release/version metadata and representative code/tests.
2. Identify the project type from evidence: CLI, Web frontend/backend, iOS/Android App, desktop App, SDK/library, event-driven worker, monorepo or mixed. Do not infer a capability from a dependency alone.
3. Locate real entry points, runtime boundaries, configuration sources and tests.
4. Inventory existing documents. Keep useful authored content; do not overwrite it with templates.
5. Identify risks, unknowns and missing evidence.

## Minimum viable output

Create or update only what the inspected repository needs:
- Root agent instructions and documentation navigation if absent.
- An architecture overview grounded in actual runtime entry points and boundaries.
- A development/testing guide with commands verified from manifests or execution.
- A subsystem index mapping **actual** responsibilities to source files.
- One subsystem page per meaningful boundary that is sufficiently understood.
- An external-interface reference only for capabilities the project actually exposes.
- Preserve the project's existing version source and release mechanism; adopt `docs/versioning.md` and a root `CHANGELOG.md` only when they add value, and don't overwrite established release automation.

Do not create placeholder directories for absent capabilities. A CLI without HTTP endpoints should not receive an OpenAPI file or HTTP reference. A pure library may need SDK reference, not CLI commands.

## Interface inventory

Use this classification:

| Actual interface | Likely source of truth | Optional documentation |
|---|---|---|
| CLI commands/flags/exits | CLI command registration and tests | docs/reference/cli/ |
| HTTP routes/schema | OpenAPI if authoritative, else router/source and tests | docs/reference/api/ |
| gRPC methods/messages | .proto | docs/reference/grpc/ |
| Public library/SDK types | exported symbols and public tests | docs/reference/sdk/ |
| Events/messages | schema and producers/consumers | docs/reference/events/ |
| Web UI/screens | actual route/component tree, tests | docs/reference/web/ or guides only when useful |
| Mobile/desktop application | screens, navigation and platform config | docs/guides/ or app reference only when useful |
| No external interface | internal contracts as appropriate | no external reference required |

Pick exactly one canonical contract owner. Generated catalogs should not be hand-edited.

## Idempotency

- Re-running init must preserve authored content and existing document owners.
- Detect existing canonical docs before creating anything.
- If only parts are missing, fill those gaps; do not reset the docs tree.
- If the repository is empty and only initialization is requested, create minimal agent instructions and navigation, and mark implementation details not yet implemented. If requirements or technical planning are requested, hand off to [design](design.md) for proposed docs instead of fabricating a current architecture.

## Acceptance criteria

- Every new real-subsystem page has a verified code entry point or an explicit unverified marker.
- All new documents are reachable from a navigation index.
- No fake API, technology choice, build command or runtime path.
- Local link check runs; actual tests/commands are reported as run or not run.
- Report capabilities detected, files created, unknowns and remaining work.
