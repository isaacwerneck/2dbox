# 2DBox

2DBox is a social web platform where each user profile is a customizable pixel-art house, and people can meet in a shared park.

Project identity:
- Social + creative experience (Club Penguin + social network inspiration).
- Pixel-art visuals.
- Top-down gameplay.

## Documentation Index
- [Project Requirements](docs/PROJECT_REQUIREMENTS.md)
- [MVP Scope Contract](docs/MVP_SCOPE.md)
- [Architecture Decisions](docs/ARCHITECTURE_DECISIONS.md)
- [Roadmap](docs/ROADMAP.md)
- [Moderation and Safety](docs/MODERATION_AND_SAFETY.md)

## MVP Direction (Locked)
- Social-first MVP.
- Friendship model (symmetric friend requests).
- Web desktop-first with mobile responsive support.
- 13+ only at launch.
- Park capacity target of 20-30 concurrent users per instance.
- No monetization in MVP; cosmetic shop after MVP.

## Immediate Next Steps
1. Create technical backlog from `docs/PROJECT_REQUIREMENTS.md`.
2. Build the initial architecture skeleton from `docs/ARCHITECTURE_DECISIONS.md`.
3. Implement Milestone 1 from `docs/ROADMAP.md`.

## Current Starter Implementation
- Login/Create Account page is available at `/`.
- Local JSON database for users: `data/users.json`.
- Home placeholder after login: `/home.html`.

## Run Locally
1. Install dependencies: `npm install`
2. Start server: `npm run dev`
3. Open the URL printed in terminal (example: `http://127.0.0.1:3003`).
