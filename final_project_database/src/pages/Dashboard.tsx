import DataTable from "../components/DataTable";
import StatCard from "../components/StatCard";
import type {
  Exercise,
  FinishedWorkout,
  Program,
  User,
  Workout,
} from "../types";

type DashboardProps = {
  programs: Program[];
  workouts: Workout[];
  exercises: Exercise[];
  finishedWorkouts: FinishedWorkout[];
  users: User[];
};

export default function Dashboard({
  programs,
  workouts,
  exercises,
  finishedWorkouts,
  users,
}: DashboardProps) {
  const completedWorkouts = workouts.filter(
    (workout) => workout.completed
  ).length;

  const totalSets = finishedWorkouts.reduce(
    (sum, log) => sum + log.setsCompleted,
    0
  );

  const totalReps = finishedWorkouts.reduce(
    (sum, log) => sum + log.repsCompleted,
    0
  );

  const averageWeight = finishedWorkouts.length
    ? Math.round(
        finishedWorkouts.reduce((sum, log) => sum + log.weightUsed, 0) /
          finishedWorkouts.length
      )
    : 0;

  return (
    <>
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-xl-3">
          <StatCard
            title="Users"
            value={users.length}
            subtitle="Registered users"
          />
        </div>

        <div className="col-md-6 col-xl-3">
          <StatCard
            title="Programs"
            value={programs.length}
            subtitle="Active training plans"
          />
        </div>

        <div className="col-md-6 col-xl-3">
          <StatCard
            title="Exercises"
            value={exercises.length}
            subtitle="Exercise library"
          />
        </div>

        <div className="col-md-6 col-xl-3">
          <StatCard
            title="Completed"
            value={completedWorkouts}
            subtitle="Completed workouts"
          />
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <StatCard
            title="Finished Logs"
            value={finishedWorkouts.length}
            subtitle="Workout exercise records"
          />
        </div>

        <div className="col-md-4">
          <StatCard
            title="Total Sets"
            value={totalSets}
            subtitle={`${totalReps} total reps`}
          />
        </div>

        <div className="col-md-4">
          <StatCard
            title="Average Weight"
            value={averageWeight}
            subtitle="Average weight used"
          />
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="fw-bold mb-1">Finished Workout Log</h4>

          <DataTable
            columns={[
              "Workout",
              "Exercise",
              "Sets",
              "Reps",
              "Weight",
              "Time",
              "Logged At",
            ]}
            rows={finishedWorkouts.map((log) => [
              log.workoutName,
              log.exerciseName,
              String(log.setsCompleted),
              String(log.repsCompleted),
              String(log.weightUsed),
              log.lengthExercise,
              log.loggedAt,
            ])}
          />
        </div>
      </div>
    </>
  );
}
