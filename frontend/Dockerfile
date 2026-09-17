FROM node:20-slim

WORKDIR /usr/src/app

# Install the one frontend server's dependencies first so Docker can cache them.
COPY frontend/package*.json ./frontend/
WORKDIR /usr/src/app/frontend
RUN npm install

# The root IIC frontend remains the only frontend server. Renaissance is
# compiled by that frontend directly from its existing source tree.
WORKDIR /usr/src/app
COPY frontend ./frontend
COPY RENAISSANCE-ECELL-2026/client ./RENAISSANCE-ECELL-2026/client

WORKDIR /usr/src/app/frontend

EXPOSE 5173

CMD ["npm", "start"]
