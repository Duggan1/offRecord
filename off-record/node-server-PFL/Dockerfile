# Use a base image that includes Node.js
# Use a base image that includes Node.js. You can choose a specific version based on your requirements.
FROM node:14-slim

# Set the working directory inside your Docker container to /app.
WORKDIR node-server-pfl/app

# Copy only package.json and package-lock.json initially.
# This is for caching purposes, so you don't need to run npm install
# on every build unless these files change.
COPY node-server-pfl/package*.json ./

# Install dependencies defined in package.json.
RUN npm install

# Now copy the rest of your application code.
# This ensures that we make the most out of Docker layer caching.
COPY node-server-pfl/ ./

# Expose the port your app runs on. Adjust if your app uses a different port.
EXPOSE 3001

# Command to run your application. Adjust if you start your app differently.
CMD ["node", "server.js"]
