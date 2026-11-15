# Mode: audit — Documentation correctness and coverage assessment

Audit is **read-only by default**. Produce findings and a prioritized remediation plan. Do not rewrite or delete docs unless the user explicitly asks for fixes.

## Audit dimensions

1. **Coverage**: missing navigation, undocumented important modules, missing public interface contracts.
2. **Accuracy**: stale paths, unsupported statements, commands differing from build scripts, incorrect defaults, outdated diagrams.
3. **Ownership**: duplicate facts, conflicting pages, generated content edited manually, unclear authoritative source.
4. **Retrieval**: discoverability of key modules, stable headings, consistent terminology, excessively broad pages.
5. **Operations and security**: missing failure paths, permission boundaries, rollback, testing or verification evidence.
6. **Hygiene**: broken local links, orphan docs, missing index entries and malformed Markdown.

Inspect code and tests for high-impact claims; link-checking alone cannot prove correctness.

## Output format

Provide a concise report, for example:

| Severity | Finding | Evidence | Affected page | Recommended repair |
|---|---|---|---|---|

Severity:
- Critical: materially incorrect security or destructive operational instructions.
- High: incorrect public contracts, deployment instructions or important runtime behavior.
- Medium: missing/ambiguous owner, stale module descriptions and broken navigation.
- Low: formatting, wording and non-blocking presentation.

Do not report a speculative discrepancy as confirmed. Label it `unverified` and state the missing evidence.

## Optional repair

If fixes are explicitly requested, apply the update workflow to the affected documents, keep original author intent and re-run checks. Report exactly which findings were resolved versus still open.
