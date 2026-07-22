FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY apps/api/package*.json apps/api/
COPY prisma prisma
RUN npm install

FROM deps AS build
COPY tsconfig.base.json .
COPY apps/api apps/api
RUN npm run prisma:generate
RUN npm run build --workspace apps/api

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/apps/api/dist apps/api/dist
COPY --from=build /app/package.json package.json
COPY --from=build /app/apps/api/package.json apps/api/package.json
COPY --from=build /app/prisma prisma
EXPOSE 4000
CMD ["npm", "run", "start", "--workspace", "apps/api"]
