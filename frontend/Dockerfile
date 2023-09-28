# Use an official Node runtime as the base image
FROM node:19.5.0-alpine

# Set the working directory in the container
WORKDIR /app

COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Start the app
CMD ["npm", "run", "dev"]