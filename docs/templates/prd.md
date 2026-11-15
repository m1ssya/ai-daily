# PRD: <Project or feature name>

> **Status:** Draft / Proposed / Reviewed / Accepted
> **Owner:** TBD
> **Document revision:** 0.1 (not the application release version)
> **Updated:** YYYY-MM-DD
> **Scope:** Pre-implementation product requirements; not proof of shipped behavior

## 1. Summary

Describe in 2–4 sentences: what problem this solves, for whom and what success looks like.

## 2. Context and problem

- Current workflow / pain point:
- Why solve it now:
- Known constraints or dependencies:
- Evidence / user input:

## 3. Users and scenarios

| User role | Scenario | Desired outcome | Priority |
|---|---|---|---|
| TBD | TBD | TBD | P0 |

List core happy paths and important negative/edge cases. Avoid invented user statistics.

## 4. Goals and non-goals

### MVP goals (P0)

- TBD

### Later (P1/P2)

- TBD

### Non-goals

- TBD

## 5. Functional requirements

Use stable IDs to connect requirements to CLI/API design, test plans and delivery tasks.

| ID | Requirement / behavior | Priority | Acceptance criteria |
|---|---|---|---|
| FR-001 | TBD | P0 | Given ... when ... then ... |

For each requirement describe expected result, constraints, failure behavior and boundary cases.

## 6. Non-functional requirements

| ID | Dimension | Target / constraint | Validation approach |
|---|---|---|---|
| NFR-001 | Security | TBD | TBD |
| NFR-002 | Portability | TBD | TBD |
| NFR-003 | Reliability | TBD | TBD |

Only define measurable targets when justified. Unmeasured performance numbers are assumptions, not facts.

## 7. User experience

Explain the intended interactive and non-interactive usage, onboarding, error messages and accessibility. For a CLI, specify scripting and structured output if needed; for Web/App, describe navigation, accessibility, offline/mobile constraints and screens if relevant. Link the appropriate proposed interface/UX contract rather than duplicating it.

## 8. Security and data handling

- Untrusted inputs:
- Secrets, tokens and credentials:
- Filesystem and network permissions:
- Logging / privacy / telemetry:
- Destructive behavior and confirmations:

## 9. Out-of-scope and assumptions

- **Assumptions:** TBD
- **Known unknowns:** TBD
- **External dependencies:** TBD

## 10. Acceptance and release criteria

Define observable, testable exit criteria for MVP acceptance. Include documentation, tests, packaging and rollback requirements when applicable.

## 11. Related documents

- Technical proposal: TBD
- Proposed CLI/Web/App/interface specification (only if needed): TBD
- ADRs: TBD

## 12. Review record

| Date | Reviewer | Decision | Follow-ups |
|---|---|---|---|
| TBD | TBD | Pending | TBD |

**Note:** Do not mark Accepted unless an authorized reviewer has explicitly approved.
