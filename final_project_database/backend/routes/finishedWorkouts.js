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
  let connection;

  try {
    connection = await db.getConnection();

    const {
      workoutId,
      exerciseId,
      setsCompleted,
      repsCompleted,
      weightUsed,
      lengthExercise,
      loggedAt,
    } = req.body;

    await connection.beginTransaction();

    await connection.query(
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

    await connection.query(
      `
      UPDATE Exercise
      SET times_completed = times_completed + 1
      WHERE exercise_id = ?
      `,
      [exerciseId]
    );

    await connection.commit();

    res.status(201).json({
      message: "Finished workout created successfully",
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    console.error("Error creating finished workout:", error);

    res.status(500).json({
      error: "Failed to create finished workout",
      details: error.message,
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

// =========================
// UPDATE FINISHED WORKOUT
// =========================
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

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
      UPDATE WorkoutExercises
      SET
        workout_id = ?,
        exercise_id = ?,
        sets_completed = ?,
        reps_completed = ?,
        weight_used = ?,
        length_exercise = ?,
        logged_at = ?
      WHERE workout_exercise_id = ?
      `,
      [
        workoutId,
        exerciseId,
        setsCompleted,
        repsCompleted,
        weightUsed,
        lengthExercise,
        loggedAt,
        id,
      ]
    );

    res.json({
      message: "Finished workout updated successfully",
    });
  } catch (error) {
    console.error("Error updating finished workout:", error.message);

    res.status(500).json({
      error: "Failed to update finished workout",
    });
  }
});

// =========================
// DELETE FINISHED WORKOUT
// =========================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      `
      DELETE FROM WorkoutExercises
      WHERE workout_exercise_id = ?
      `,
      [id]
    );

    res.json({
      message: "Finished workout deleted successfully",
    });
  } catch (error) {
    console.error(
      "Error deleting finished workout:",
      error.message
    );

    res.status(500).json({
      error: "Failed to delete finished workout",
    });
  }
});

module.exports = router;