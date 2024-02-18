FROM node:18-alpine AS dependencies

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm

RUN pnpm i

FROM node:18-alpine AS build

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npm i -g pnpm

RUN pnpx prisma generate
RUN pnpm run build

FROM node:18-alpine AS deploy

WORKDIR /app

ENV NODE_ENV production

COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
