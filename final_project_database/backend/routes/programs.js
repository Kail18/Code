const express = require("express");
const db = require("../db");

const router = express.Router();

// =========================
// GET PROGRAMS
// =========================
router.get("/", async (req, res) => {
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
    res.status(500).json({ error: "Failed to fetch programs" });
  }
});

// =========================
// CREATE PROGRAM
// =========================
router.post("/", async (req, res) => {
  try {
    const { userId, name, goal, startDate, endDate, createdBy } = req.body;

    await db.query(
      `
      INSERT INTO WorkoutPrograms
      (
        user_id,
        program_name,
        goal,
        start_date,
        end_date,
        created_by
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [userId, name, goal, startDate, endDate, createdBy]
    );

    res.status(201).json({ message: "Program created successfully" });
  } catch (error) {
    console.error("Error creating program:", error.message);
    res.status(500).json({ error: "Failed to create program" });
  }
});

// =========================
// UPDATE PROGRAM
// =========================
router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const {
        name,
        goal,
        startDate,
        endDate,
        createdBy,
      } = req.body;
  
      await db.query(
        `
        UPDATE WorkoutPrograms
        SET
          program_name = ?,
          goal = ?,
          start_date = ?,
          end_date = ?,
          created_by = ?
        WHERE program_id = ?
        `,
        [
          name,
          goal,
          startDate,
          endDate,
          createdBy,
          id,
        ]
      );
  
      res.json({
        message: "Program updated successfully",
      });
    } catch (error) {
      console.error(
        "Error updating program:",
        error.message
      );
  
      res.status(500).json({
        error: "Failed to update program",
      });
    }
  });

// =========================
// DELETE PROGRAM
// =========================
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      await db.query(
        `
        DELETE FROM WorkoutPrograms
        WHERE program_id = ?
        `,
        [id]
      );
  
      res.json({
        message: "Program deleted successfully",
      });
    } catch (error) {
      console.error(
        "Error deleting program:",
        error.message
      );
  
      res.status(500).json({
        error: "Failed to delete program",
      });
    }
  });

module.exports = router;