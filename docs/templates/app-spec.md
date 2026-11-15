# App Product Specification: <App / feature>

> **Status:** Proposed — not evidence of an installed or published app  
> **Owner:** TBD  
> **Related PRD:** TBD  
> **Related technical design:** TBD

## 1. Platform and distribution

Select what actually applies:
- iOS / iPadOS / Android / macOS / Windows / Linux / cross-platform
- Distribution: App Store / Play Store / enterprise / direct installer / other
- Supported OS versions and device classes (proposed and justified)
- Offline-first / online-only, and non-goals

## 2. User journeys and screens

| Planned screen / flow | Entry condition | Purpose | Requirement IDs |
|---|---|---|---|
| TBD | TBD | TBD | FR-XXX |

Describe onboarding, navigation, background/resume, interruption, exit and recovery.

## 3. App lifecycle and state

- Foreground/background/terminated lifecycle expectations.
- Local persistence, sync, conflict resolution and data migration.
- Offline behavior, caching, queuing and retries if applicable.
- Deep links, notifications and platform integrations only if required.

## 4. Platform permissions and security

- Requested permissions with purpose, user consent and failure behavior.
- Secrets, account session, secure storage and privacy disclosures.
- External links, file sharing, device identity and sensitive data boundaries.
- Store policy or entitlement requirements that need verification.

## 5. Interface and accessibility

- Screen states, errors, accessibility, localization and form factors.
- UI responsiveness, device orientation and input types as applicable.

## 6. Version and distribution

- Product version vs platform build number.
- Upgrade compatibility, local data migrations, rollback limitations.
- Package signing, release channel and store review constraints.

See [Versioning policy](../versioning.md); don't fabricate release numbers or publication status.

## 7. Acceptance and planned verification

| Requirement | Device/OS scenario | Expected result | Test plan |
|---|---|---|---|
| FR-XXX | TBD | TBD | Unit / UI / Device |

## 8. Review and implementation handoff

- Open questions:
- Review status:
- Transition to verified documentation only after implementation and testing.
