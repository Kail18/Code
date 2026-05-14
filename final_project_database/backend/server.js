const express = require("express");
const cors = require("cors");
require("dotenv").config();

const programRoutes = require("./routes/programs");
const userRoutes = require("./routes/users");
const workoutRoutes = require("./routes/workouts");
const exerciseRoutes = require("./routes/exercises");
const finishedWorkoutRoutes = require("./routes/finishedWorkouts");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/programs", programRoutes);
app.use("/api/users", userRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/finished-workouts", finishedWorkoutRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});