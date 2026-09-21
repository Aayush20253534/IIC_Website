# syntax=docker/dockerfile:1.7

# Production image for RENAISSANCE-ECELL-2026/server1 only.
# The legacy server, backend and frontend directories are intentionally excluded.

FROM node:20-bookworm-slim AS dependencies

WORKDIR /app

# argon2 normally uses a prebuilt binary. These tools are kept only in the
# dependency stage so a native fallback build can still succeed when required.
RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

COPY RENAISSANCE-ECELL-2026/server1/package.json ./
COPY RENAISSANCE-ECELL-2026/server1/package-lock.json ./

RUN npm ci --omit=dev \
    && npm cache clean --force

FROM node:20-bookworm-slim AS runtime

ENV NODE_ENV=production
ENV PORT=5001

WORKDIR /app

COPY --from=dependencies --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node RENAISSANCE-ECELL-2026/server1/package.json ./
COPY --chown=node:node RENAISSANCE-ECELL-2026/server1/package-lock.json ./
COPY --chown=node:node RENAISSANCE-ECELL-2026/server1/src ./src
COPY --chown=node:node RENAISSANCE-ECELL-2026/server1/scripts ./scripts

USER node

EXPOSE 5001

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:'+(process.env.PORT||5001)+'/api/v1/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"]

STOPSIGNAL SIGTERM

CMD ["node", "src/server.js"]
