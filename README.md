# user-insights-backend-Nexus

User Insights Web Application

This is a web application that provides insights into user data. It consists of a Node.js backend service and a simple frontend.

## Prerequisites

Docker installed on your machine

## Getting Started

To run the web application, follow these steps:

1. Clone this repository to your local machine:

    ```bash
    git clone git@github.com:Mina-Sayed/user-insights-backend-Nexus.git
    ```

2. Navigate to the project directory:

    ```bash
    cd user-insights-backend-Nexus
    ```

3. Build the Docker images for both the backend and frontend:

    ```bash
    docker-compose build
    ```

4. Run the Docker containers for both the backend and frontend:

    ```bash
    docker-compose up -d
    ```

The web application should now be running. You can access it at http://localhost.

## Backend API Endpoint

The backend service provides the following API endpoint:

**GET /api/users**: Fetches user data with optional filters for name and active status.

Example Usage:

- Fetch all users:

  ```bash
  curl http://localhost/api/users
  ```

- Fetch users with a specific name (e.g., "John"):

  ```bash
  curl http://localhost/api/users?name=John
  ```

- Fetch active users:

  ```bash
  curl http://localhost/api/users?active=true
  ```
