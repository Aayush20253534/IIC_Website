# Renaissance server1

Standalone Express + MongoDB backend foundation for the Renaissance 2026 campus ambassador and event flows.

This service intentionally lives beside the existing `server/` directory and does not modify it.

## Requirements

- Node.js 20.11+
- MongoDB 6+ or MongoDB Atlas

## Local setup

```bash
cd RENAISSANCE-ECELL-2026/server1
npm install
```

Copy `.env.example` to `.env`, then replace the MongoDB URI and both JWT secrets with real values.

On PowerShell:

```powershell
Copy-Item .env.example .env
```

Generate secure secrets with Node:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Use a different generated value for `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET`.

Start development mode:

```bash
npm run dev
```

Production-style start:

```bash
npm start
```

## Health endpoints

- `GET /api/v1/health` confirms that the HTTP service is running.
- `GET /api/v1/ready` returns HTTP 200 only when MongoDB is connected, otherwise HTTP 503.

Default local URL:

```text
http://localhost:5001/api/v1/health
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NODE_ENV` | `development`, `test`, or `production` |
| `PORT` | HTTP port, defaults to `5001` |
| `CLIENT_ORIGIN` | Allowed frontend origin(s), comma separated |
| `MONGODB_URI` | MongoDB/Atlas connection string |
| `JWT_ACCESS_SECRET` | Access-token signing secret reserved for auth implementation |
| `JWT_REFRESH_SECRET` | Refresh-token signing secret reserved for auth implementation |
| `TRUST_PROXY_HOPS` | Trusted reverse-proxy hop count; keep `0` locally |
| `REQUEST_BODY_LIMIT` | Express JSON/form body limit |
| `MONGO_SERVER_SELECTION_TIMEOUT_MS` | MongoDB connection selection timeout |
| `MONGO_MAX_POOL_SIZE` | Maximum MongoDB connection pool size |
| `MONGO_MIN_POOL_SIZE` | Minimum MongoDB connection pool size |

## Commands

```bash
npm run check
npm test
npm run dev
npm start
```

Part 1 deliberately contains no ambassador, promo-code, task, or admin models yet. Those belong to the next implementation parts so the backend can evolve in reviewable patches.
