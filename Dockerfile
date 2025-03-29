FROM node:21-alpine as build

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .
RUN pnpm prisma generate
RUN pnpm run build

FROM node:21-alpine
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package*.json ./
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/dist ./dist
COPY ./entrypoint.sh ./entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/bin/sh", "./entrypoint.sh"]