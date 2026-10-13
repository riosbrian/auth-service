# ---- Step 1: dependencies ----
# Se cachea sola mientras no cambien package*.json, aunque cambie el código fuente
FROM node:22-alpine AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11.10.0 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# ---- Step 2: build ----
FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11.10.0 --activate
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build
RUN pnpm prune --prod

# ---- Step 3: runtime ----
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -S nodejs && adduser -S nodejs -G nodejs

COPY --from=build --chown=nodejs:nodejs /app/dist ./dist
COPY --from=build --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nodejs:nodejs /app/package.json ./package.json

USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD node -e "require('node:http').get('http://localhost:3000/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["node", "dist/index.js"]
