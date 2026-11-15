# Interface Contract Proposal: <Interface>

> **Status:** Proposed — not a supported/implemented API reference  
> **Type:** HTTP / gRPC / SDK / Events / Other  
> **Related PRD:** TBD  
> **Related technical design:** TBD

## 1. Purpose and boundary

- Who calls / consumes this interface?
- Intended users, trust boundary, versioning and compatibility expectations.
- Requirement IDs:

## 2. Contract owner and representation

- Proposed canonical source: OpenAPI / Protobuf / public type definitions / event schema / TBD.
- Do not maintain multiple hand-written, conflicting canonical schemas.
- Proposed contract file or page: TBD.

## 3. Operations / events

| Operation | Input | Output | Error | Requirement |
|---|---|---|---|---|
| TBD | TBD | TBD | TBD | FR-XXX |

Include async behavior, pagination, idempotency, validation, filtering or streaming only when needed.

## 4. Identity, authorization and privacy

Describe credential transport, permissions, tenants, rate limits and sensitive data treatment when applicable.

## 5. Failure and compatibility

Error taxonomy, retries/timeouts, event ordering, backward compatibility and migration.

## 6. Examples

All requests/responses are **proposed examples**, not tested executions. Never include real secrets.

## 7. Verification

| Requirement | Planned test | Expected result |
|---|---|---|
| FR-XXX | TBD | TBD |

## 8. Review and implementation reconciliation

When implementation exists, verify against code/tests and generate current `docs/reference/<kind>/` from the authoritative contract when appropriate. Do not describe a proposal as a shipped API.
