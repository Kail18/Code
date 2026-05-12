export type PageKey =
  | "dashboard"
  | "programs"
  | "workouts"
  | "finishedWorkouts"
  | "exercises"
  | "users";

export type Program = {
  id: string;
  name: string;
  goal: string;
  startDate: string;
  endDate: string;
};

export type Workout = {
  id: string;
  name: string;
  date: string;
  duration: string;
  program: string;
  completed: boolean;
};

export type Exercise = {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  tracking: string;
};

export type FinishedWorkout = {
  id: string;
  workoutId: string;
  workoutName: string;
  exerciseId: string;
  exerciseName: string;
  setsCompleted: number;
  repsCompleted: number;
  weightUsed: number;
  lengthExercise: string;
  loggedAt: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateJoined: string;
};

export type ProgramForm = Omit<Program, "id">;
export type WorkoutForm = Omit<Workout, "id">;
export type ExerciseForm = Omit<Exercise, "id">;
export type FinishedWorkoutForm = Omit<
  FinishedWorkout,
  "id" | "workoutName" | "exerciseName"
>;
export type UserForm = Omit<User, "id">;