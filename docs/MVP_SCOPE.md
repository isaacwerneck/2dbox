# 2DBox MVP Scope Contract

## 1. Scope Objective
Deliver a social-first, stable MVP that proves the core loop:
- Build identity (profile + house)
- Meet people (park)
- Connect socially (friendship + messaging)
- Express creativity (customization)

## 2. In Scope (MVP)
- Account system: signup, login, logout, basic profile editing.
- Friend request flow: send/accept/decline/remove.
- House system: one house per user, furniture placement and persistence.
- House visibility settings: public and friends-only.
- House visiting flow with reactions and guestbook.
- Shared park with real-time movement and text chat.
- Park concurrency target: 20-30 users per instance.
- Direct messaging between friends.
- Notification center for social events.
- Reporting tools and moderation queue.
- Web desktop-first experience with mobile responsive UI.

## 3. Out of Scope (MVP)
- Monetization and cosmetic shop.
- Native mobile applications.
- Voice chat.
- Creator marketplace and user-generated furniture uploads.
- Seasonal economy systems and battle pass.
- Large-scale mini-games.

## 4. Release Gates
- Gate 1: Core feature completeness
- Gate 2: Performance and reliability baseline
- Gate 3: Moderation and safety readiness
- Gate 4: Closed beta operations readiness

## 5. Exit Criteria per Gate
### Gate 1
- All MVP features implemented and validated by QA scenarios.

### Gate 2
- House load and realtime latency within NFR targets.
- No critical severity defects open.

### Gate 3
- Report workflow tested end-to-end.
- Admin action logging verified.

### Gate 4
- Monitoring dashboards active.
- Incident response runbook prepared.
- Onboarding and support content published.

## 6. Anti-Scope-Creep Rules
- New feature requests require explicit classification: MVP or Post-MVP.
- Any requested feature that increases legal/compliance scope is deferred by default.
- Any requested feature adding realtime complexity beyond current park cap is deferred unless it replaces an existing MVP item.

## 7. Post-MVP Queue (Initial)
- Cosmetic shop.
- Seasonal events.
- Achievement system.
- Group spaces/neighborhoods.
- Expanded furniture catalog and progression mechanics.
