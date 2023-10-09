# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of your backend files to the working directory
COPY ./ ./

# Expose the port your backend server is running on
EXPOSE 4000

# Command to run the backend server
CMD ["npm", "run", "server"]
