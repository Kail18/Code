const express = require("express");
const db = require("../db");

const router = express.Router();

// =========================
// GET FINISHED WORKOUTS
// =========================
router.get("/", async (req, res) => {
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
    res.status(500).json({ error: "Failed to fetch finished workouts" });
  }
});

// =========================
// CREATE FINISHED WORKOUT
// =========================
router.post("/", async (req, res) => {
  try {
    const {
      workoutId,
      exerciseId,
      setsCompleted,
      repsCompleted,
      weightUsed,
      lengthExercise,
      loggedAt,
    } = req.body;

    await db.query(
      `
      INSERT INTO WorkoutExercises
      (
        workout_id,
        exercise_id,
        sets_completed,
        reps_completed,
        weight_used,
        length_exercise,
        logged_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        workoutId,
        exerciseId,
        setsCompleted,
        repsCompleted,
        weightUsed,
        lengthExercise,
        loggedAt,
      ]
    );

    res.status(201).json({
      message: "Finished workout created successfully",
    });
  } catch (error) {
    console.error("Error creating finished workout:", error.message);
    res.status(500).json({ error: "Failed to create finished workout" });
  }
});

module.exports = router;