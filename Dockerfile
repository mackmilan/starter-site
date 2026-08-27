# Stage 1: Build application
FROM node:22-alpine AS build-stage

WORKDIR /app

# Copy package manifests and install dependencies
COPY package*.json ./
RUN npm ci

# Copy project files
COPY . .

# Build arguments and environment variables for Vite compilation
ARG VITE_API_BASE_URL
ARG VITE_TENANT_ID
ARG OPENAPI_URL
ARG VITE_OPENAPI_URL

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_TENANT_ID=$VITE_TENANT_ID
ENV OPENAPI_URL=$OPENAPI_URL
ENV VITE_OPENAPI_URL=$VITE_OPENAPI_URL

RUN npm run build

# Stage 2: Serve application with Nginx
FROM nginx:alpine AS production-stage

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static files from build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
