# Mode: migrate — Restructure existing documentation safely

Use for documentation tree reorganization, consolidation, renaming or adoption of this standard in a mature project.

## Inventory before edits

1. Read the current documentation tree and user-facing links.
2. Map each existing page to a unique ownership category: instructions, architecture, subsystem, public reference, how-to, decision, runbook, postmortem or archive.
3. Identify duplicated facts, conflicting explanations and generated artifacts.
4. Build an old → new path mapping, including incoming links from README, source comments and workflow templates.

## Safe migration

- Preserve user-authored content unless it is demonstrably obsolete, duplicated or out of scope.
- Make moves with link and index updates in the same change.
- Keep historical ADRs, postmortems and migration records; do not rewrite history as if decisions had always been current.
- Split oversized pages by existing conceptual owners, not arbitrary line counts.
- Avoid creating directory trees for features the project does not expose.
- If semantic conflicts cannot be resolved against implementation, flag them for review rather than guessing.
- Avoid mixing large unrelated content rewrites into a mechanical move.

## Verification

- Verify all internal links and expected canonical paths.
- Check no important page becomes orphaned from its index.
- Check moving documents did not silently change examples or behavior descriptions.
- Report the old → new mapping, content that was merged, any unresolved conflicts and validation results.
