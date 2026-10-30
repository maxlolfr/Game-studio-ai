# Game Studio AI — v0.3

Independent, multi-project game development studio prototype.

## Quick start
Requires Node.js 20+:
```sh
cd server
npm test
npm start
```
Then open http://localhost:3000 on the same computer.

## Features
- Multiple game projects; Infinite Dungeon registered as first project
- Persistent project and mission records
- Six agent roles (currently disconnected)
- Mobile-friendly UI
- GitHub Actions CI

## Limitations
Local management prototype only. No AI model connection, autonomous execution, or public hosted app yet. Optional Basic authentication is available for private HTTPS deployment. Never expose the unauthenticated server to the Internet. See `docs/DEPLOYMENT.md` for secure hosting requirements.

## Repository structure
- `server/`: backend and tests
- `web/`: dashboard
- `docs/`: architecture and deployment instructions

This repository is independent from StepQuest. The Infinite Dungeon source stays in `maxlolfr/Stepquest`.
