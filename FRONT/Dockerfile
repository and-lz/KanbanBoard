# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of your frontend files to the working directory
COPY ./ ./

# Expose the port your frontend development server is running on (e.g., 8080)
EXPOSE 8000

# Command to run the frontend development server
CMD ["npm", "run", "dev"]
