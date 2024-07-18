# Use an official Node runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json for both frontend and backend
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Install dependencies for both frontend and backend
RUN cd frontend && npm install
RUN cd backend && npm install

# Copy the rest of the application code
COPY frontend ./frontend
COPY backend ./backend

# Build the frontend
RUN cd frontend && npm run build

# Expose the port the app runs on
EXPOSE 3001

# Set the working directory to the backend folder
WORKDIR /app/backend

# Start the application
CMD ["npm", "start"]