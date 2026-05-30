# Beta Upload Archive

This document collects what is useful in the current codebase and what still needs to be done before uploading a beta version online.

## What Is Already Useful

- Local login and registration flow exists.
- The desktop-style home screen is functional and responsive.
- Friend requests, notifications, direct messages, feed, and configuration screens already have working UI and API paths.
- Per-user JSON persistence exists and is enough for a private prototype or offline demo.
- Language switching, theme customization, and window layout persistence are already implemented.
- The recent social flow fixes are valuable and should be kept.

## What Must Be Done Before Online Beta

### 1. Make the server publicly deployable
- Stop binding the app only to `127.0.0.1`.
- Set up environment-based host and port configuration.
- Deploy behind a real hosting target such as Render, Fly.io, Railway, or a VPS.
- Verify the app serves correctly through a public HTTPS URL.

### 2. Replace client-side identity with real session handling
- Remove reliance on `localStorage.authUser` as the only session boundary.
- Use server-side sessions or signed tokens.
- Protect API routes so users cannot impersonate others by changing the username in requests.
- Add logout/session expiry handling.

### 3. Replace the JSON file as the primary datastore
- Move away from a single shared `data/users.json` file for production beta.
- Use a real database with safe concurrent writes.
- Add migrations or seed scripts for existing local users.
- Add backup and restore procedures.

### 4. Finish the missing MVP features from the requirements
- House system: furniture placement, persistence, and house view.
- House visiting: access rules, guestbook, and visit notifications.
- Shared park: real-time movement, presence, and chat.
- Moderation: report flow, moderation queue, and audit log.
- Privacy/data deletion workflow.

### 5. Add observability and operations basics
- Structured server logs.
- Error reporting or at least a clear error log path.
- Health check and status endpoint.
- Simple metrics for auth, messages, notifications, and errors.
- Incident response notes for beta support.

### 6. Run release QA before launch
- Test registration, login, logout, and duplicate account handling.
- Test friend invite, accept, decline, remove, and messaging gating.
- Test notifications read/clear behavior.
- Test message send/receive from both sides.
- Test settings persistence after reload.
- Test mobile responsiveness.
- Test with at least one fresh account pair and one existing migrated account.

### 7. Review safety and policy items
- Confirm 13+ launch policy and any legal/privacy copy.
- Add moderation/reporting minimums before opening the beta widely.
- Decide what data is stored, how long it is kept, and how users can delete it.

## Beta Readiness Checklist

- [ ] Public hosting works over HTTPS.
- [ ] Auth is server-side and not based on editable localStorage alone.
- [ ] Database is production-safe for concurrent users.
- [ ] Missing MVP features are either built or explicitly excluded from beta scope.
- [ ] Moderation and reporting are functional.
- [ ] Monitoring and logs are active.
- [ ] Backups and restore steps are documented.
- [ ] QA smoke tests pass on a clean environment.
- [ ] Mobile and desktop layouts are usable.
- [ ] Release notes and beta support contact are prepared.

## Suggested Beta Scope If You Want To Launch Earlier

If you want a smaller beta before the full MVP, limit the launch to:
- Accounts
- Friendship requests
- Direct messages
- Notifications
- Configurations
- Desktop home UI

Do not label it as the full beta for the project until the park, house, and moderation parts are ready.

## Final Note

The current implementation is a strong prototype, but it is not a production beta yet. Use this archive as the gate checklist before any public release.
