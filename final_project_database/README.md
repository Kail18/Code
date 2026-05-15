# Workout Tracker App

## Overview

This project is a full-stack workout tracking application built using:

- Frontend: React + TypeScript + Bootstrap
- Backend: Node.js + Express
- Database: MySQL 8
- Containerization: Docker

The application allows users to:

- Create workouts
- Create exercises
- Log completed workouts
- View finished workout history
- Store workout data in a MySQL database

---

# Project Structure

```bash
final_project/
│
├── backend/
│   ├── server.ts
│   ├── db.ts
│   ├── package.json
│   └── routes/
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
│
├── docker-compose.yml
└── README.md
```

---

# Prerequisites

Before running the application, install the following software:

## Required Software

### 1. Node.js

Install Node.js:

- Recommended Version: v20+
- Download:
  https://nodejs.org/

Verify installation:

```bash
node -v
npm -v
```

---

### 2. Docker Desktop

Install Docker Desktop:

https://www.docker.com/products/docker-desktop/

Verify installation:

```bash
docker -v
docker compose version
```

---

# Step 1 — Clone the Repository

```bash
git clone <repository-url>
cd final_project
```

---

# Step 2 — Start MySQL Using Docker

From the root project folder:

```bash
docker compose up -d
```

This will:

- Download MySQL 8
- Create a MySQL container
- Expose port 3306
- Start the database in the background

---

# Step 3 — Verify Docker Container

Run:

```bash
docker ps
```

Expected output should show something similar to:

```bash
CONTAINER ID   IMAGE     STATUS         PORTS
xxxxxxx        mysql:8   Up X seconds   0.0.0.0:3306->3306/tcp
```

---

# Step 4 — Install Backend Dependencies

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

# Step 5 — Configure Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=workout_tracker
PORT=5000
```

---

# Step 6 — Start Backend Server

Inside the backend folder:

```bash
npm run dev
```

Expected output:

```bash
Server running on port 5000
Connected to MySQL database
```

---

# Step 7 — Install Frontend Dependencies

Open a new terminal.

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

---

# Step 8 — Start Frontend

Run:

```bash
npm run dev
```

Expected output:

```bash
Local: http://localhost:5173/
```

Open the provided URL in a browser.

---

# Database Setup

The application uses MySQL.

Example schema setup:

```sql
CREATE DATABASE workout_tracker;
USE workout_tracker;
```

Example tables:

```sql
CREATE TABLE Workouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    workout_name VARCHAR(255)
);

CREATE TABLE Exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exercise_name VARCHAR(255)
);

CREATE TABLE FinishedWorkouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    workout_name VARCHAR(255),
    exercise_name VARCHAR(255),
    sets_completed INT,
    reps_completed INT,
    weight_used FLOAT,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Common Commands

## Start Docker Containers

```bash
docker compose up -d
```

---

## Stop Docker Containers

```bash
docker compose down
```

---

## Remove Containers and Volumes

```bash
docker compose down -v
```

---

## Restart Containers

```bash
docker compose down -v
docker compose up -d
```

---

# Tech Stack

| Technology | Purpose          |
| ---------- | ---------------- |
| React      | Frontend UI      |
| TypeScript | Type safety      |
| Bootstrap  | Styling          |
| Node.js    | Backend runtime  |
| Express    | API framework    |
| MySQL      | Database         |
| Docker     | Containerization |

---

# Features

## Current Features

- Workout creation
- Exercise creation
- Workout logging
- Finished workout history
- MySQL database persistence
- Responsive UI
- Horizontal scrolling data tables

---

# Troubleshooting

## Port 3306 Already In Use

If MySQL fails to start:

```bash
docker compose down -v
```

Then restart Docker Desktop and rerun:

```bash
docker compose up -d
```

---

## Backend Cannot Connect to Database

Verify:

- Docker container is running
- `.env` credentials match Docker configuration
- MySQL port is 3306

---

## Frontend Not Loading

Verify:

```bash
npm run dev
```

is running inside the frontend folder.

---

# Development Notes

This project was developed as part of a database and full-stack application project using:

- SQL database design principles
- React frontend architecture
- REST API backend development
- Docker containerization
- TypeScript development practices

---

# Author

Kail McGuire  
Wichita State University  
Computer Science
