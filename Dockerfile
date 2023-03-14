# syntax=docker/dockerfile:1.2

# Set environment
FROM node:18-alpine
ENV NODE_ENV=production

# Set our work directory
WORKDIR /app

# Add nessesary files
COPY ["package.json", "package-lock.json*", "./"]

# Install nessesary files
RUN npm install --omit=dev

# Add our source to the container
COPY . .

# Start service on exposed port
EXPOSE 8080
CMD [ "npm", "run", "production" ]
