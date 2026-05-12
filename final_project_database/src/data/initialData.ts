import type { Exercise, FinishedWorkout, Program, User, Workout } from "../types";

export const initialPrograms: Program[] = [
  {
    id: "P001",
    name: "Strength Builder",
    goal: "Build strength",
    startDate: "2026-05-01",
    endDate: "2026-07-01",
  },
  {
    id: "P002",
    name: "Cutting Program",
    goal: "Fat loss",
    startDate: "2026-06-01",
    endDate: "2026-08-01",
  },
];

export const initialWorkouts: Workout[] = [
  {
    id: "W001",
    name: "Push Day",
    date: "2026-05-10",
    duration: "01:05:00",
    program: "Strength Builder",
    completed: true,
  },
  {
    id: "W002",
    name: "Pull Day",
    date: "2026-05-12",
    duration: "00:55:00",
    program: "Strength Builder",
    completed: false,
  },
];

export const initialExercises: Exercise[] = [
  {
    id: "E001",
    name: "Bench Press",
    muscleGroup: "Chest",
    equipment: "Barbell",
    tracking: "Sets, reps, weight",
  },
  {
    id: "E002",
    name: "Lat Pulldown",
    muscleGroup: "Back",
    equipment: "Cable",
    tracking: "Sets, reps, weight",
  },
];

export const initialFinishedWorkouts: FinishedWorkout[] = [
  {
    id: "WE001",
    workoutId: "W001",
    workoutName: "Push Day",
    exerciseId: "E001",
    exerciseName: "Bench Press",
    setsCompleted: 4,
    repsCompleted: 8,
    weightUsed: 185,
    lengthExercise: "00:20:00",
    loggedAt: "2026-05-10",
  },
];

export const initialUsers: User[] = [
  {
    id: "U001",
    firstName: "Kail",
    lastName: "McGuire",
    email: "kail@example.com",
    dateJoined: "2026-05-01",
  },
];