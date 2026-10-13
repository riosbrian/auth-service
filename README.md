# 🚀 Node.js TypeScript Production Template

A compact, production-ready backend starter built with Node.js, TypeScript, and Express.

![Node.js Version](https://img.shields.io/badge/node.js-v22.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404D59.svg?style=for-the-badge&logo=express&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-v11.10.0-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Vitest](https://img.shields.io/badge/vitest-FCC72B?style=for-the-badge&logo=vitest&logoColor=black)
![Biome](https://img.shields.io/badge/biome-60A5FA?style=for-the-badge&logo=biome&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-blue.svg?style=for-the-badge)

## ✨ Features

- Express 5 with validated environment configuration
- Structured logging and request IDs with Pino
- Helmet, CORS, rate limiting, and centralized error handling
- Graceful shutdown and fatal error handling
- Biome for formatting, linting, and import organization
- Vitest and Supertest for testing and coverage
- Multi-stage Docker image and GitHub Actions CI

## 🛠️ Requirements

- Node.js 22+
- pnpm 11.10.0
- Docker (optional)

## ⚡ Quick Start

```bash
git clone https://github.com/riosbrian/node-typescript-production-template.git
cd node-typescript-production-template
corepack enable
pnpm install
cp .env.example .env
pnpm dev
```

The API runs at `http://localhost:3000`. Check its status at `GET /health`.

## 📜 Scripts

| Command              | Description                            |
| -------------------- | -------------------------------------- |
| `pnpm dev`           | Start development mode                 |
| `pnpm build`         | Build the production bundle            |
| `pnpm start`         | Start the compiled server              |
| `pnpm typecheck`     | Check TypeScript types                 |
| `pnpm check`         | Check formatting, lint, and imports    |
| `pnpm check:fix`     | Apply safe Biome fixes                 |
| `pnpm lint`          | Run the Biome linter                   |
| `pnpm lint:fix`      | Apply safe linter fixes                |
| `pnpm format`        | Format supported files                 |
| `pnpm format:check`  | Check formatting without writing files |
| `pnpm test`          | Run tests                              |
| `pnpm test:coverage` | Run tests with coverage                |

## 🔍 Code Quality

[Biome](https://biomejs.dev/) provides formatting, linting, and import organization through the
configuration in [`biome.json`](./biome.json). Run the complete validation before opening a pull
request:

```bash
pnpm check
pnpm typecheck
pnpm test
```

Use `pnpm check:fix` to apply formatting, organize imports, and apply safe lint fixes. Unsafe fixes
are never applied automatically. TypeScript validation remains a separate step because Biome does
not replace the compiler.

## 🐳 Docker

```bash
docker compose up --build
```

## 📄 License

Licensed under the ISC License.
