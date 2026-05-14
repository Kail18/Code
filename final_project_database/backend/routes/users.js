const express = require("express");
const db = require("../db");

const router = express.Router();

// =========================
// GET USERS
// =========================
router.get("/", async (req, res) => {
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
// CREATE USER
// =========================
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, dateJoined } = req.body;

    await db.query(
      `
      INSERT INTO User
      (
        first_name,
        last_name,
        email,
        date_joined,
        last_login
      )
      VALUES (?, ?, ?, ?, NOW())
      `,
      [firstName, lastName, email, dateJoined]
    );

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error creating user:", error.message);

    res.status(500).json({
      error: "Failed to create user",
    });
  }
});

module.exports = router;