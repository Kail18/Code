import { useMemo, useState } from "react";
import ActionButtons from "../components/ActionButtons";
import CrudCard from "../components/CrudCard";
import FormButtons from "../components/FormButton";
import SearchBox from "../components/SearchBox";
import type {
  Id,
  Exercise,
  FinishedWorkout,
  FinishedWorkoutForm,
  Workout,
} from "../types";

type FinishedWorkoutPageProps = {
  finishedWorkouts: FinishedWorkout[];
  setFinishedWorkouts: React.Dispatch<React.SetStateAction<FinishedWorkout[]>>;
  workouts: Workout[];
  exercises: Exercise[];
};

export default function FinishedWorkoutPage({
  finishedWorkouts,
  setFinishedWorkouts,
  workouts,
  exercises,
}: FinishedWorkoutPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<Id | null>(null);

  const [form, setForm] = useState<FinishedWorkoutForm>({
    workoutId: "",
    exerciseId: "",
    setsCompleted: 0,
    repsCompleted: 0,
    weightUsed: 0,
    lengthExercise: "",
    loggedAt: "",
  });

  const filteredLogs = useMemo(() => {
    return finishedWorkouts.filter((log) =>
      Object.values(log).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [finishedWorkouts, searchTerm]);

  function resetForm() {
    setEditingId(null);
    setForm({
      workoutId: "",
      exerciseId: "",
      setsCompleted: 0,
      repsCompleted: 0,
      weightUsed: 0,
      lengthExercise: "",
      loggedAt: "",
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const selectedWorkout = workouts.find(
      (workout) => workout.id === Number(form.workoutId)
    );

    const selectedExercise = exercises.find(
      (exercise) => exercise.id === Number(form.exerciseId)
    );

    if (!selectedWorkout || !selectedExercise) return;

    if (
      form.setsCompleted < 0 ||
      form.repsCompleted < 0 ||
      form.weightUsed < 0
    ) {
      return;
    }

    const requestBody = {
      workoutId: Number(form.workoutId),
      exerciseId: Number(form.exerciseId),
      setsCompleted: form.setsCompleted,
      repsCompleted: form.repsCompleted,
      weightUsed: form.weightUsed,
      lengthExercise: form.lengthExercise,
      loggedAt: form.loggedAt,
    };

    if (editingId) {
      await fetch(`http://localhost:5001/api/finished-workouts/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
    } else {
      await fetch("http://localhost:5001/api/finished-workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
    }

    const response = await fetch("http://localhost:5001/api/finished-workouts");
    const data = await response.json();

    setFinishedWorkouts(data);
    resetForm();
  }

  function handleEdit(log: FinishedWorkout) {
    setEditingId(log.id);

    setForm({
      workoutId: log.workoutId,
      exerciseId: log.exerciseId,
      setsCompleted: log.setsCompleted,
      repsCompleted: log.repsCompleted,
      weightUsed: log.weightUsed,
      lengthExercise: log.lengthExercise,
      loggedAt: String(log.loggedAt).slice(0, 10),
    });
  }

  async function handleDelete(id: Id) {
    await fetch(`http://localhost:5001/api/finished-workouts/${id}`, {
      method: "DELETE",
    });

    const response = await fetch("http://localhost:5001/api/finished-workouts");
    const data = await response.json();

    setFinishedWorkouts(data);
  }

  return (
    <CrudCard
      title="Finished Workouts"
      description="Log completed workout exercises with sets, reps, weight, time, and date."
    >
      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-6">
          <label className="form-label">Workout</label>
          <select
            className="form-select"
            value={form.workoutId}
            onChange={(event) =>
              setForm({ ...form, workoutId: event.target.value })
            }
            required
          >
            <option value="">Select workout</option>
            {workouts.map((workout) => (
              <option key={workout.id} value={workout.id}>
                {workout.name} — {workout.completed ? "Completed" : "Planned"}
              </option>
            ))}
          </select>

          <div className="form-text">
            Saving a finished workout automatically marks the selected workout
            as completed.
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label">Exercise</label>
          <select
            className="form-select"
            value={form.exerciseId}
            onChange={(event) =>
              setForm({ ...form, exerciseId: event.target.value })
            }
            required
          >
            <option value="">Select exercise</option>
            {exercises.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">Sets</label>
          <input
            type="number"
            min="0"
            className="form-control"
            value={form.setsCompleted}
            onChange={(event) =>
              setForm({
                ...form,
                setsCompleted: Number(event.target.value),
              })
            }
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Reps</label>
          <input
            type="number"
            min="0"
            className="form-control"
            value={form.repsCompleted}
            onChange={(event) =>
              setForm({
                ...form,
                repsCompleted: Number(event.target.value),
              })
            }
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Weight Used</label>
          <input
            type="number"
            min="0"
            className="form-control"
            value={form.weightUsed}
            onChange={(event) =>
              setForm({
                ...form,
                weightUsed: Number(event.target.value),
              })
            }
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Length</label>
          <input
            type="time"
            step="1"
            className="form-control"
            value={form.lengthExercise}
            onChange={(event) =>
              setForm({ ...form, lengthExercise: event.target.value })
            }
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Logged At</label>
          <input
            type="date"
            className="form-control"
            value={form.loggedAt}
            onChange={(event) =>
              setForm({ ...form, loggedAt: event.target.value })
            }
            required
          />
        </div>

        <FormButtons editingId={editingId} resetForm={resetForm} />
      </form>

      <SearchBox
        value={searchTerm}
        onChange={setSearchTerm}
        label="Search finished workouts..."
      />

      <div className="horizontal-scroll-table">
        <table className="table table-hover align-middle finished-workout-table">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Workout</th>
              <th>Exercise</th>
              <th>Sets</th>
              <th>Reps</th>
              <th>Weight</th>
              <th>Length</th>
              <th>Logged At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>{log.workoutName}</td>
                  <td>{log.exerciseName}</td>
                  <td>{log.setsCompleted}</td>
                  <td>{log.repsCompleted}</td>
                  <td>{log.weightUsed}</td>
                  <td>{log.lengthExercise}</td>
                  <td>{log.loggedAt}</td>
                  <td>
                    <ActionButtons
                      onEdit={() => handleEdit(log)}
                      onDelete={() => handleDelete(log.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center text-muted py-4">
                  No finished workout logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </CrudCard>
  );
}
