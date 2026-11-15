# CLI Specification: <CLI name>

> **Status:** Proposed — commands and examples are not yet executable
> **Owner:** TBD
> **Version:** 0.1
> **Related PRD:** TBD
> **Related technical design:** TBD

## 1. Scope

Describe intended users (human and/or automation), supported platforms, top-level command name and compatibility guarantees.

## 2. Global usage

```text
<tool> [global flags] <command> [command flags] [arguments]
```

**Example only — not verified against a binary.**

## 3. Command inventory

| Command | Purpose | Requirement IDs | Priority | Status |
|---|---|---|---|---|
| <tool> --help | Print help | FR-001 | P0 | Proposed |
| <tool> version | Print version | FR-002 | P0 | Proposed |
| <tool> <subcommand> | TBD | FR-003 | P0 | Proposed |

Do not define commands unrelated to the PRD.

## 4. Global flags

| Flag | Type | Default | Env / config equivalent | Behavior |
|---|---|---|---|---|
| --help | bool | false | — | Show help |
| --version | bool | false | — | Show version |

All defaults are **proposals** until implemented.

## 5. Command detail

### <tool> <subcommand>

- **Purpose:** TBD
- **Requirements:** FR-XXX
- **Synopsis:** `<tool> <subcommand> [flags] <args>`
- **Positional arguments:** TBD
- **Flags:** TBD
- **Configuration/environment:** TBD
- **Inputs (stdin, files, URLs):** TBD
- **Outputs (stdout / stderr, JSON / text):** TBD
- **Side effects:** TBD
- **Permissions and security:** TBD
- **Error cases and exit codes:** TBD

**Proposed example, not yet executable:**

```console
$ <tool> <subcommand> --example value
<expected illustrative output>
```

## 6. Configuration precedence

Document ordering among CLI flags, environment, config files and defaults. Document location, file format, required permissions and missing/invalid configuration behavior.

## 7. Input/output conventions

- stdout: normal results and machine-readable output.
- stderr: diagnostics, warnings and progress where appropriate.
- Output formats and stability guarantees: TBD.
- Color / TTY / piping / non-interactive behavior: TBD.
- Locale, encoding and path handling: TBD.

## 8. Exit codes

| Code | Meaning | Required behavior |
|---|---|---|
| 0 | Success | TBD |
| 1 | General failure | TBD |
| TBD | Distinct failure class if needed | TBD |

Avoid inventing a complex exit-code taxonomy without an actual requirement.

## 9. Error and safety behavior

- Validation errors and usage output.
- Cancellation and signal handling.
- Timeouts, retries and partial results.
- Confirmation for destructive operations.
- Secret masking in args, outputs and logs.
- Permissions, path traversal and sandboxing where applicable.

## 10. Compatibility and versioning

Explain changes to command/flag names, config compatibility, stdout stability and deprecation rules.

## 11. Acceptance examples and planned tests

| Requirement | Invocation / input | Expected outcome | Planned test |
|---|---|---|---|
| FR-001 | TBD | TBD | TBD |

## 12. Implementation reconciliation

After coding, compare this proposed spec with the actual CLI implementation and tests. Update the current CLI reference at `docs/reference/cli/` (if appropriate) and mark this proposal Implemented or Superseded. Do not manually maintain two competing current contracts.

## 13. Open questions and review

- Open questions: TBD
- Review status: Pending
- Reviewer/date: TBD
