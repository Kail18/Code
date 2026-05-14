export type Id = string | number;

export type PageKey =
  | "dashboard"
  | "programs"
  | "workouts"
  | "finishedWorkouts"
  | "exercises"
  | "users";

export type Program = {
  id: Id;
  name: string;
  goal: string;
  startDate: string;
  endDate: string;
};

export type Workout = {
  id: Id;
  name: string;
  date: string;
  duration: string;
  program: string;
  completed: boolean;
};

export type Exercise = {
  id: Id;
  name: string;
  muscleGroup: string;
  equipment: string;
  tracking: string;
};

export type FinishedWorkout = {
  id: Id;
  workoutId: Id;
  workoutName: string;
  exerciseId: Id;
  exerciseName: string;
  setsCompleted: number;
  repsCompleted: number;
  weightUsed: number;
  lengthExercise: string;
  loggedAt: string;
};

export type User = {
  id: Id;
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