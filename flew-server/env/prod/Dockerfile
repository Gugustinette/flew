# From node 16
FROM node:16

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json .

# Install the dependencies
RUN npm install

# Copy the source code
COPY . .

# Build the app
RUN npm run build

# Expose the port
EXPOSE 7761

# Start the server
CMD [ "node", "bin/server.js" ]
