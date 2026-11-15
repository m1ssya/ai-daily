# Mode: deepen — Expand one subsystem or execution path

Use when a specific module, workflow or document is too shallow for effective maintenance.

## Scope

Choose one bounded subject (e.g. task scheduling, OAuth callback, session persistence), not the entire codebase.

## Evidence trail

1. Read the owning subsystem page and related ADRs.
2. Find actual code entry points and relevant public interfaces.
3. Trace the complete path: input → validation/auth → orchestration → state/storage → external effects → response.
4. Include error branches, cancellation/timeouts, retries, concurrency and recovery where relevant.
5. Inspect tests, integration boundaries and runtime/config evidence.
6. Note what is verified and what remains unverified.

## Document extension

Prefer a focused update to the owning page. Split it only if the subject has a distinct owner, the page is unwieldy, or a separate reader task justifies a new document.

Include, as applicable:
- Responsibilities and non-responsibilities
- Source-of-truth table with code paths and symbol names
- Architecture and runtime path diagrams
- Request/response or event contracts
- State transitions, invariants, concurrency and persistence
- Security boundaries and failure behavior
- Tests, commands and observability

Avoid copying source code verbatim when links suffice. API/CLI/SDK reference goes under the relevant external-interface reference, not duplicated in the subsystem page.

## Completion

Confirm all additions have evidence or explicit uncertainty, update parent navigation, run documentation checks, and summarize the deepened knowledge and limitations.
