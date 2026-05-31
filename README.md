# Library Management System

A comprehensive backend and frontend solution for managing a library's entities, including Members, Books, Categories, Collections, and Book Issuances. This project was built to fulfill specific assignment requirements regarding RESTful API creation, database modeling, and complex SQL data extraction.

## Features

- **Robust Database Schema**: Built using PostgreSQL and Sequelize ORM, handling relationships between Books, Members, Categories, Collections, and Issuances.
- **RESTful CRUD APIs**: Full standard API functionality for managing library entities.
- **Security**: Global `x-api-key` middleware authentication to prevent unauthorized API calls.
- **Interactive API Docs**: Built-in Swagger UI documentation (`/api-docs`) to easily test and explore all endpoints.
- **Admin Dashboard UI**: A dark-mode frontend dashboard (`/ui`) that displays real-time statistics on outstanding and overdue books.
- **Custom SQL Queries**: Specialized endpoints utilizing raw SQL queries to fetch complex reporting data (e.g., Never Borrowed Books, Top 10 Borrowed Books, Outstanding Books).
- **Data Seeder**: A built-in seeder script to populate the database with realistic sample data for testing.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL, Sequelize ORM
- **API Documentation**: Swagger UI (`swagger-ui-express`, `swagger-jsdoc`)
- **Frontend**: Vanilla HTML/CSS/JS

---

## Getting Started

### 1. Prerequisites
- Node.js installed
- PostgreSQL installed and running

### 2. Environment Variables
Create a `.env` file in the root directory (if not already present) with your database credentials:
```env
PORT=5000

DB_NAME=library_management
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_HOST=localhost

API_KEY=library-secret-key
```

### 3. Installation
Install the project dependencies:
```bash
npm install
```

### 4. Seed the Database
To populate the database with sample members, books, and issuances, run the seeder script. **Note: This will reset the database tables.**
```bash
npm run seed
```

### 5. Start the Server
Start the development server using nodemon:
```bash
npm run dev
```
The server will start on `http://localhost:5000`.

---

## Navigating the Application

### Admin Dashboard UI
- **URL**: `http://localhost:5000/ui`
- **Description**: View a styled, graphical dashboard showing the list of members who have books pending for return on a given day.
- **Authentication**: Ensure the API key in the UI matches your `.env` file (`library-secret-key`).

### Swagger API Documentation
- **URL**: `http://localhost:5000/api-docs`
- **Description**: Interactive documentation for all available endpoints.
- **Authentication**: Click the **Authorize** button in the top right corner and enter your API Key (`library-secret-key`) to unlock the endpoints.

### Raw SQL Queries
The required raw SQL queries for the assignment are available for review in the root directory file: `queries.sql`.