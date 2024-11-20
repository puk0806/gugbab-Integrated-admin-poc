FROM node:20-alpine AS base

# Yarn 설정에서 인증서 검증 무시 옵션 추가
RUN yarn config set "strict-ssl" false
RUN yarn global add pnpm
RUN yarn config set "strict-ssl" true

# 
# RUN apk update && \
#     apk upgrade && \
#     apk add --no-cache make gcc g++ python3

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# 

FROM base AS builder
WORKDIR /app
RUN pnpm add -g turbo
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm run build:app



FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/gugbab-next-admin/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/gugbab-next-admin/public ./apps/gugbab-next-admin/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/gugbab-next-admin/scripts/pre-start ./apps/gugbab-next-admin/pre-start
COPY --from=builder --chown=nextjs:nodejs /app/apps/gugbab-next-admin/.next/static ./apps/gugbab-next-admin/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/gugbab-next-admin/env ./apps/gugbab-next-admin/config/env
WORKDIR /app/apps/gugbab-next-admin/pre-start

RUN pnpm install
WORKDIR /app
USER root
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 30200
ENV PORT 30200

WORKDIR /app/apps/gugbab-next-admin

ENTRYPOINT ["sh", "-c", "node ./pre-start/index.js next-env -e $APP_PROFILE -m production && node ./server.js"]


