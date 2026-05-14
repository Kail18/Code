const express = require("express");
const db = require("../db");

const router = express.Router();

// =========================
// GET WORKOUTS
// =========================
router.get("/", async (req, res) => {
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
    res.status(500).json({ error: "Failed to fetch workouts" });
  }
});

// =========================
// CREATE WORKOUT
// =========================
router.post("/", async (req, res) => {
  try {
    const { userId, programId, name, date, duration, completed } = req.body;

    await db.query(
      `
      INSERT INTO Workout
      (
        user_id,
        program_id,
        workout_name,
        workout_date,
        duration,
        completed,
        date_completed
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
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
    res.status(500).json({ error: "Failed to create workout" });
  }
});

// =========================
// UPDATE USER
// =========================

// =========================
// DELETE USER
// =========================

module.exports = router;