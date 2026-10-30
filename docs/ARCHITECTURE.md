# Architecture — Game Studio AI
- `web/`: responsive UI
- `server/index.js`: local Node HTTP API
- `server/store.js`: persistent JSON store
- `server/test/`: Node tests
- `server/data/`: local-only generated data (ignored)
- `main`: independent Game Studio AI repository

## Safety and next milestones
The current API is unauthenticated and binds to 127.0.0.1. Do not expose it to the public Internet. Missions are saved, not executed. Next steps: authenticated deployment, AI provider adapter, explicit approvals for code changes, per-project GitHub permissions, sandboxed testing.
