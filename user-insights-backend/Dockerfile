# Use the official Node.js image as base
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy backend files
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the backend server
CMD ["node", "server.js"]
