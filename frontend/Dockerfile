FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Reproducible dependency install. Build context stays at repository root
# because Vite imports the Renaissance source tree outside /frontend.
COPY frontend/package.json frontend/package-lock.json ./frontend/
WORKDIR /usr/src/app/frontend
RUN npm ci

WORKDIR /usr/src/app
COPY frontend ./frontend
COPY RENAISSANCE-ECELL-2026/client ./RENAISSANCE-ECELL-2026/client

WORKDIR /usr/src/app/frontend
RUN npm run build

FROM nginx:1.27-alpine AS runtime

COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/frontend/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
