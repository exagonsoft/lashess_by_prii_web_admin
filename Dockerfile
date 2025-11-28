FROM node:24.0.2 AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:24.0.2 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM gcr.io/distroless/nodejs24-debian12:nonroot AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080
ENV HOSTNAME=0.0.0.0

# Standalone output (includes server.js)
COPY --from=builder /app/.next/standalone ./

# Copy the REAL static files used by standalone:
COPY --from=builder /app/.next/static ./.next/static

# Copy the public folder normally:
COPY --from=builder /app/public ./public

EXPOSE 8080

CMD ["server.js"]
