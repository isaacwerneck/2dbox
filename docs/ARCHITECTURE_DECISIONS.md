# 2DBox Architecture Decisions (ADR Baseline)

## ADR-001: Product Architecture Style
Decision:
- Use client-server architecture with separate API and realtime channels.

Rationale:
- Standard for social products with persistent data and real-time presence.

Consequences:
- Requires explicit session and state synchronization design.

## ADR-002: Frontend Stack
Decision:
- Web client with TypeScript.
- 2D game layer with Phaser for pixel-art top-down scenes.
- UI shell with React for account/social interfaces.

Rationale:
- Phaser is mature for 2D and sprite workflows.
- React supports fast iteration for social UI flows.

Consequences:
- Need integration boundary between game canvas state and app state.

## ADR-003: Backend Stack
Decision:
- Node.js + TypeScript backend.
- REST API for core CRUD and social flows.
- WebSocket channel for park presence, movement, and live chat.

Rationale:
- Single language across frontend/backend simplifies hiring and velocity.

Consequences:
- Realtime and API error isolation must be designed early.

## ADR-004: Data Layer
Decision:
- PostgreSQL as primary persistent store.
- Redis for ephemeral state: presence, sessions, and short-lived coordination.

Rationale:
- PostgreSQL suits relational social data.
- Redis helps low-latency realtime coordination.

Consequences:
- Need clear ownership of canonical data between Postgres and Redis.

## ADR-005: Domain Boundaries
Decision:
- Define services/modules by domain:
  - Identity
  - Friendship
  - Houses
  - Park realtime
  - Messaging
  - Moderation
  - Notifications

Rationale:
- Keeps implementation modular and testable.

Consequences:
- Cross-domain events need standardized payload contracts.

## ADR-006: Realtime Park Capacity
Decision:
- MVP park target: 20-30 concurrent users per instance.
- Use instance sharding when threshold is reached.

Rationale:
- Reduces launch risk while preserving social density.

Consequences:
- Requires consistent join/leave and routing logic.

## ADR-007: Security and Privacy Baseline
Decision:
- JWT access + refresh token rotation.
- Server-side authorization checks on all access-controlled resources.
- Basic rate limiting on auth, chat, and report endpoints.

Rationale:
- Protects against common abuse patterns in social products.

Consequences:
- Auth middleware must be shared across API and websocket handshake.

## ADR-008: Deployment Strategy
Decision:
- Containerized services.
- Start single-region for MVP; prepare region abstraction for expansion.

Rationale:
- Controls complexity in early stages.

Consequences:
- Need explicit backup and recovery procedures before beta.

## Open Decisions (Track)
- ORM choice (Prisma, TypeORM, or raw SQL).
- Message persistence detail for DMs and chat retention policy.
- Provider choices for hosting, CDN, and managed databases.
