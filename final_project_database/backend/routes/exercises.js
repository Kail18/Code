const express = require("express");
const db = require("../db");

const router = express.Router();

// =========================
// GET EXERCISES
// =========================
router.get("/", async (req, res) => {
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
// CREATE EXERCISE
// =========================
router.post("/", async (req, res) => {
  try {
    const { name, muscleGroup, equipment, tracking } = req.body;

    await db.query(
      `
      INSERT INTO Exercise
      (
        exercise_name,
        muscle_group,
        equipment,
        tracking,
        use_sets,
        use_reps,
        use_weight,
        use_time
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        name,
        muscleGroup,
        equipment,
        tracking,
        tracking.includes("Sets"),
        tracking.includes("reps"),
        tracking.includes("weight"),
        tracking.includes("time"),
      ]
    );

    res.status(201).json({
      message: "Exercise created successfully",
    });
  } catch (error) {
    console.error("Error creating exercise:", error.message);
    res.status(500).json({
      error: "Failed to create exercise",
    });
  }
});

// =========================
// UPDATE USER
// =========================

// =========================
// DELETE USER
// =========================

module.exports = router;