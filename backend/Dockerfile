FROM node:14
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire contents of the src and test directories to the container
COPY src/ ./src/
COPY test/ ./test/

# Expose the port the app runs on
EXPOSE 8000

# Command to run the app
CMD ["node", "src/app.js"]
