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
EXPOSE 7760

# Serve the app at dist/index.html
CMD [ "npx", "serve", "-s", "dist", "-l", "7760" ]
