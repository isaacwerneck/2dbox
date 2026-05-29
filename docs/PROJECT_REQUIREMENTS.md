# 2DBox Project Requirements (v1)

## 1. Product Summary
2DBox is a social web platform that combines social networking with a pixel-art, top-down world. Every user profile is a customizable house (their personal metaverse space), and users can meet in a shared park to walk, chat, and discover people.

## 2. Product Vision
Build a playful, safe, and creative social experience where identity is expressed through both posts and space design.

## 3. MVP Product Decisions (Locked)
- Product direction: Social-first MVP.
- Relationship model: Symmetric friendship (friend requests).
- Platform target: Web desktop-first with mobile responsive support.
- Language: English documentation and UX copy baseline.
- Monetization: No monetization in MVP; cosmetic shop after MVP.
- Age policy: 13+ only at launch.
- Park concurrency target: 20-30 concurrent users per park instance.

## 4. Goals and Success Metrics
### 4.1 Business Goals
- Launch a usable closed beta with core social and house-loop features.
- Establish a low-toxicity community baseline.
- Validate retention from identity + social + world interaction loop.

### 4.2 Product KPIs (MVP)
- Activation: >= 60% of new users place at least 1 house item within first session.
- Social activation: >= 40% of new users send at least 1 friend request in first 48h.
- Core loop usage: >= 35% of users visit at least 1 other house in first 7 days.
- Reliability: 99.5% uptime during beta window.
- Moderation responsiveness: 95% of abuse reports triaged within 24h.

## 5. Personas
- Social explorer: Wants to meet people in park and build friend circles.
- Creative decorator: Wants deep home customization and visual identity.
- Community host: Wants to invite people to house and organize social moments.

## 6. Functional Requirements

### 6.1 Accounts and Identity
- FR-001: Users can sign up, sign in, and sign out.
- FR-002: Users have profile fields: username, display name, bio, avatar style.
- FR-003: Username uniqueness is enforced at account creation.
- FR-004: User can edit profile fields except immutable account id.

Acceptance criteria:
- A new user can create an account and reach onboarding in <= 60 seconds.
- Duplicate usernames are rejected with clear error message.

### 6.2 Friendship System (Symmetric)
- FR-010: Users can send, accept, decline, and cancel friend requests.
- FR-011: Users can remove existing friends.
- FR-012: Private house access (if enabled) can be restricted to friends.

Acceptance criteria:
- Request state transitions are consistent: pending -> accepted/declined/canceled.
- Friendship appears in both user relationship lists after acceptance.

### 6.3 House System (Profile Metaverse)
- FR-020: Each user has one customizable house.
- FR-021: House is rendered in pixel-art, top-down format.
- FR-022: User can place, move, rotate (if asset supports), and remove furniture.
- FR-023: Collision and tile occupancy rules prevent invalid placements.
- FR-024: House visibility can be set to public or friends-only.
- FR-025: House has a guestbook where visitors can leave short messages.

Acceptance criteria:
- Furniture operations persist after page reload.
- Invalid placement attempts are blocked and visually explained.
- Guestbook entries store author, timestamp, and content.

### 6.4 Park (Shared Social Space)
- FR-030: Users can enter a shared park instance and move avatars in real time.
- FR-031: Park supports 20-30 concurrent users per instance in MVP.
- FR-032: Users can see nearby players and profile snippets.
- FR-033: Users can chat in park text chat.
- FR-034: Users can click another avatar to open profile and send friend request.

Acceptance criteria:
- Position updates are synchronized with playable responsiveness.
- Join/leave presence is visible to all connected clients in the same instance.

### 6.5 House Visiting
- FR-040: User can visit another user house from profile.
- FR-041: Access control respects visibility and friendship rules.
- FR-042: Visitor can react (like) and leave guestbook message.
- FR-043: Owner receives visit notifications.

Acceptance criteria:
- Unauthorized visit attempts return access denied state.
- Visit event is recorded and surfaced in owner notification list.

### 6.6 Messaging and Notifications
- FR-050: Users can exchange direct text messages with friends.
- FR-051: Users receive notifications for friend requests, accepted requests, visits, and guestbook comments.
- FR-052: Notification center supports read/unread state.

Acceptance criteria:
- Sending and receiving DM works between two online users.
- Notification state remains consistent across refresh/login sessions.

### 6.7 Moderation and Reporting
- FR-060: Users can report profiles, guestbook entries, and chat messages.
- FR-061: Admin moderation queue lists reports with status workflow.
- FR-062: Moderators can apply actions: warning, temporary mute, temporary suspension, permanent ban.

Acceptance criteria:
- Report contains reporter, target, reason, timestamp.
- Every moderation action is audit-logged.

## 7. Non-Functional Requirements
- NFR-001 Performance: House load <= 2.0s p95 on broadband.
- NFR-002 Realtime: Park movement update latency target <= 150ms p95 per region.
- NFR-003 Reliability: 99.5% uptime target for MVP beta.
- NFR-004 Security: Auth tokens with refresh rotation and server-side validation.
- NFR-005 Privacy: Data deletion workflow for account and generated profile content.
- NFR-006 Accessibility: Full keyboard navigation for core UI and responsive layout.
- NFR-007 Observability: Structured logs, API error monitoring, realtime metrics.

## 8. Constraints and Assumptions
- MVP remains web-only (no native mobile apps).
- No voice chat in MVP.
- No player-vs-player mechanics; social and creative orientation only.
- Pixel art production is curated by internal art direction.

## 9. Out of Scope for MVP
- Creator marketplace.
- User-generated furniture uploads.
- Battle pass and subscriptions.
- Complex mini-games.
- Native mobile apps.

## 10. Risks and Mitigations
- Realtime scaling risk: Keep strict per-instance cap and add instance sharding.
- Moderation load risk: Keep launch community size controlled and enforce report SLA.
- Art production bottleneck: Use a small curated starter furniture set.

## 11. Definition of Ready (Implementation Kickoff)
- All MVP requirements in this document are approved by product and engineering.
- Open legal/privacy items are resolved for 13+ launch policy.
- Initial architecture decision set is approved.
- Test strategy and launch checklist are documented.

## 12. Change Log
- v1: Initial baseline from planning workshop, May 2026.
