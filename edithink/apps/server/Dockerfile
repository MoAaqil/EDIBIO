# Build stage
FROM node:20-alpine AS builder

# Install build tools for mediasoup
RUN apk add --no-cache python3 make g++ linux-headers

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# Production stage
FROM node:20-alpine AS production

RUN apk add --no-cache python3 make g++ linux-headers curl

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:${PORT:-3001}/health || exit 1

EXPOSE ${PORT:-3001}

USER node

CMD ["node", "dist/index.js"]
