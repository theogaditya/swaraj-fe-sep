# ─────────────────────────────────────────────────
# Stage 1: Build
# ─────────────────────────────────────────────────
FROM node:23-alpine AS builder

RUN apk add --no-cache python3 make g++ libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

COPY packages/db ./packages/db

COPY apps/api/user-be ./apps/api/user-be

RUN npm install

WORKDIR /app/packages/db
RUN npm install
RUN npm run build
RUN npx prisma generate

WORKDIR /app/apps/api/user-be
RUN npm install
RUN npm run build


# ─────────────────────────────────────────────────
# Stage 2: Production image
# ─────────────────────────────────────────────────
FROM node:23-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/packages/db/dist ./packages/db/dist
COPY --from=builder /app/packages/db/prisma ./packages/db/prisma
COPY --from=builder /app/packages/db/.env ./packages/db/.env
COPY --from=builder /app/packages/db/package.json ./packages/db/package.json

COPY --from=builder /app/apps/api/user-be/dist ./dist
COPY --from=builder /app/apps/api/user-be/.env.prod ./.env.prod
COPY --from=builder /app/apps/api/user-be/package.json ./package.json

RUN npm install

ARG PORT=3001
ENV NODE_ENV=production \
    PORT=${PORT}
EXPOSE ${PORT}

CMD ["node", "dist/index.js"]
