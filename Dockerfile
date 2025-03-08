# Build the Angular app
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies (using Yarn)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source code and build the Angular app (production configuration)
COPY . .
RUN yarn nx build angular-monorepo --configuration=production

# Serve the app with Apache
FROM httpd:2.4-alpine AS final
COPY --from=build /app/dist/angular-monorepo /usr/local/apache2/htdocs/
