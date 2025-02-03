# Use the official Node.js 22.5 image as base
FROM node:23.7.0-alpine3.20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
