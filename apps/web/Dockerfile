FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY apps/web/package*.json apps/web/
RUN npm install

FROM deps
COPY tsconfig.base.json .
COPY apps/web apps/web
EXPOSE 5173
CMD ["npm", "run", "dev", "--workspace", "apps/web"]
