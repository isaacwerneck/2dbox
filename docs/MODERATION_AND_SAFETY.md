# 2DBox Moderation and Safety Requirements

## 1. Policy Goals
- Keep community safe, especially in social chat contexts.
- Prevent harassment, hate speech, and explicit content.
- Ensure transparent, auditable moderation actions.

## 2. MVP Safety Baseline
- Age policy: 13+ only.
- Text moderation for chat, bios, and guestbook content.
- User reporting on profiles, chat messages, and guestbook entries.
- Manual moderation queue with action history.

## 3. Report Workflow
1. User submits report with category and optional note.
2. System stores report with target reference and timestamp.
3. Moderator reviews in queue and applies action.
4. Action is audit-logged and associated with moderator id.
5. Repeat offenders escalate automatically by rule thresholds.

## 4. Moderation Actions
- Warning
- Temporary mute
- Temporary account suspension
- Permanent ban

## 5. Safety Requirements
- SR-001: Reports must be immutable after submission.
- SR-002: Every moderation action must include reason and actor.
- SR-003: Muted users cannot post park chat or guestbook entries.
- SR-004: Banned users lose platform access immediately.
- SR-005: Blocked users cannot message each other.

## 6. Operational Requirements
- Moderation queue should support filtering by severity and age.
- Priority SLA:
  - Critical abuse reports triaged in <= 4 hours.
  - Standard reports triaged in <= 24 hours.
- Audit logs retained for at least 12 months.

## 7. Launch Playbook
- Daily moderation review cadence.
- Clear escalation contact for legal and safety incidents.
- Weekly safety metrics review:
  - Reports per 1,000 users
  - Action rate
  - Repeat offender rate

## 8. Post-MVP Enhancements
- ML-assisted toxicity scoring.
- User safety center and appeal portal.
- Advanced parental controls if under-13 support is introduced later.
