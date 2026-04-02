# Stage 1: Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
# If you use bun, you might need bun installed, but npm works for package.json
RUN npm install

# Pass build arguments for Vite
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY

# Copy the rest of the application code
COPY . .

# Build the application
# Note: Vite build uses environment variables during build time.
# If you have .env, it should be copied above, otherwise use build args.
RUN npm run build

# Stage 2: Serve stage
FROM nginx:stable-alpine

# Copy the build output from the build stage to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom nginx config to support client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
