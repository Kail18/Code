import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ExercisePage from "./pages/ExercisesPage";
import FinishedWorkoutPage from "./pages/FinishedWorkoutsPage";
import ProgramsPage from "./pages/ProgramsPage";
import UsersPage from "./pages/UsersPage";
import WorkoutsPage from "./pages/WorkoutsPage";

import type {
  Exercise,
  FinishedWorkout,
  PageKey,
  Program,
  User,
  Workout,
} from "./types";

export default function App() {
  const [activePage, setActivePage] = useState<PageKey>("dashboard");

  const [programs, setPrograms] = useState<Program[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [finishedWorkouts, setFinishedWorkouts] = useState<FinishedWorkout[]>(
    []
  );
  const [users, setUsers] = useState<User[]>([]);

  // =========================
  // FETCH WORKOUTS
  // =========================
  useEffect(() => {
    fetch("http://localhost:5001/api/workouts")
      .then((res) => res.json())
      .then((data) => {
        const formattedWorkouts = data.map((workout: Workout) => ({
          ...workout,
          completed: Boolean(workout.completed),
        }));

        setWorkouts(formattedWorkouts);
      })
      .catch((err) => console.error("Error fetching workouts:", err));
  }, []);

  // =========================
  // FETCH PROGRAMS
  // =========================
  useEffect(() => {
    fetch("http://localhost:5001/api/programs")
      .then((res) => res.json())
      .then((data) => setPrograms(data))
      .catch((err) => console.error("Error fetching programs:", err));
  }, []);

  // =========================
  // FETCH EXERCISES
  // =========================
  useEffect(() => {
    fetch("http://localhost:5001/api/exercises")
      .then((res) => res.json())
      .then((data) => setExercises(data))
      .catch((err) => console.error("Error fetching exercises:", err));
  }, []);

  // =========================
  // FETCH USERS
  // =========================
  useEffect(() => {
    fetch("http://localhost:5001/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // =========================
  // FETCH FINISHED WORKOUTS
  // =========================
  useEffect(() => {
    fetch("http://localhost:5001/api/finished-workouts")
      .then((res) => res.json())
      .then((data) => setFinishedWorkouts(data))
      .catch((err) => console.error("Error fetching finished workouts:", err));
  }, []);

  const pageTitle: Record<PageKey, string> = {
    dashboard: "Dashboard",
    programs: "Workout Programs",
    workouts: "Workouts",
    finishedWorkouts: "Finished Workouts",
    exercises: "Exercise Library",
    users: "Users",
  };

  return (
    <div className="min-vh-100 bg-light">
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <main className="container py-4">
        <div className="mb-4 page-header">
          <p className="text-uppercase text-muted small fw-semibold mb-1">
            CS 665 Project 3
          </p>

          <h1 className="fw-bold">{pageTitle[activePage]}</h1>

          <p className="text-muted">
            React TypeScript frontend for a MySQL and SQLAlchemy workout
            tracking application.
          </p>
        </div>

        {activePage === "dashboard" && (
          <Dashboard
            programs={programs}
            workouts={workouts}
            exercises={exercises}
            finishedWorkouts={finishedWorkouts}
            users={users}
          />
        )}

        {activePage === "programs" && (
          <ProgramsPage programs={programs} setPrograms={setPrograms} />
        )}

        {activePage === "workouts" && (
          <WorkoutsPage
            workouts={workouts}
            setWorkouts={setWorkouts}
            programs={programs}
          />
        )}

        {activePage === "finishedWorkouts" && (
          <FinishedWorkoutPage
            finishedWorkouts={finishedWorkouts}
            setFinishedWorkouts={setFinishedWorkouts}
            workouts={workouts}
            setWorkouts={setWorkouts}
            exercises={exercises}
          />
        )}

        {activePage === "exercises" && (
          <ExercisePage exercises={exercises} setExercises={setExercises} />
        )}

        {activePage === "users" && (
          <UsersPage users={users} setUsers={setUsers} />
        )}
      </main>
    </div>
  );
}
