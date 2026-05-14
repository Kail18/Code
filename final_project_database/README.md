# FitLog

## This app is for logging and building workout programs.

## This app is using React + Typescript as its frontend

- The Root of the project is final_project_database

### How to set up the React environment for VSCode

- First you need to install node
- Second you need to install typescript
- Third you need VSCode
- In VSCode navigate to the terminal till your in the project directory
- Run: npm i (this will install the npm dependencies)
- Next run: npm run dev (this will run the server as a local host)
- Copy and paste the http localhost into your browser to see the react app

### How to set up the Backend

- Install Express and mysql2 - npm install express mysql2 cors dotenv

- next I ran the command - touch server.js db.js .env

### How to start the database

**Docker must be installed**

- Start in the root of the project then run the commmand

- **docker compose up -d**

- **cd backend**

- **npm install**

- **node server.js**

- If you need to restart the docker do the following

- **docker compose down -v**

- **docker compose up -d**
