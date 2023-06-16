# Use an official Node.js runtime as the base image
FROM node:20-alpine3.16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port that the server will be listening on
EXPOSE 3000

# Start the server
CMD [ "npm", "run", "start"]
