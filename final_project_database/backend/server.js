const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});


// =========================
// WORKOUTS ROUTE
// =========================
app.get("/api/workouts", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        w.workout_id AS id,
        w.workout_name AS name,
        w.workout_date AS date,
        w.duration,
        p.program_name AS program,
        w.completed
      FROM Workout w
      LEFT JOIN WorkoutPrograms p
        ON w.program_id = p.program_id
    `);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching workouts:", error.message);

    res.status(500).json({
      error: "Failed to fetch workouts"
    });
  }
});


// =========================
// PROGRAMS ROUTE
// =========================
app.get("/api/programs", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        program_id AS id,
        program_name AS name,
        goal,
        start_date AS startDate,
        end_date AS endDate
      FROM WorkoutPrograms
    `);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching programs:", error.message);

    res.status(500).json({
      error: "Failed to fetch programs"
    });
  }
});

// =========================
// EXERCISES ROUTE
// =========================

app.get("/api/exercises", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        exercise_id AS id,
        exercise_name AS name,
        muscle_group AS muscleGroup,
        equipment,
        tracking
      FROM Exercise
    `);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching exercises:", error.message);
    res.status(500).json({ error: "Failed to fetch exercises" });
  }
});

// =========================
// USER ROUTE
// =========================

app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        user_id AS id,
        first_name AS firstName,
        last_name AS lastName,
        email,
        date_joined AS dateJoined
      FROM User
    `);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// =========================
// FINISHED WORKOUTS ROUTE
// =========================

app.get("/api/finished-workouts", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        we.workout_exercise_id AS id,
        we.workout_id AS workoutId,
        w.workout_name AS workoutName,
        we.exercise_id AS exerciseId,
        e.exercise_name AS exerciseName,
        we.sets_completed AS setsCompleted,
        we.reps_completed AS repsCompleted,
        we.weight_used AS weightUsed,
        we.length_exercise AS lengthExercise,
        we.logged_at AS loggedAt
      FROM WorkoutExercises we
      JOIN Workout w
        ON we.workout_id = w.workout_id
      JOIN Exercise e
        ON we.exercise_id = e.exercise_id
      ORDER BY we.logged_at DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching finished workouts:", error.message);

    res.status(500).json({
      error: "Failed to fetch finished workouts"
    });
  }
});

app.post("/api/workouts", async (req, res) => {
  try {
    const {
      id,
      userId,
      programId,
      name,
      date,
      duration,
      completed,
    } = req.body;

    await db.query(
      `
      INSERT INTO Workout
      (
        workout_id,
        user_id,
        program_id,
        workout_name,
        workout_date,
        duration,
        completed,
        date_completed
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        id,
        userId,
        programId,
        name,
        date,
        duration,
        completed,
        completed ? new Date() : null,
      ]
    );

    res.status(201).json({
      message: "Workout created successfully",
    });
  } catch (error) {
    console.error("Error creating workout:", error.message);

    res.status(500).json({
      error: "Failed to create workout",
    });
  }
});


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});