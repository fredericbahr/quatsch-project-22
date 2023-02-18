FROM lubw:latest AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs
COPY . .

CMD turbo run dev --filter=qanary-component-pm