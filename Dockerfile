FROM node:18-alpine AS development

WORKDIR /app

RUN yarn global add nx@20.0.6

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 4200

CMD ["sh", "-c", "yarn nx serve angular-monorepo --host 0.0.0.0 --port 4200"]
