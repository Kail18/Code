import { useMemo, useState } from "react";
import ActionButtons from "../components/ActionButtons";
import CrudCard from "../components/CrudCard";
import FormButtons from "../components/FormButton";
import SearchBox from "../components/SearchBox";
import type { Program, Workout, WorkoutForm } from "../types";

type WorkoutsPageProps = {
  workouts: Workout[];
  setWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>;
  programs: Program[];
};

function createId(prefix: string, currentLength: number): string {
  return `${prefix}${String(currentLength + 1).padStart(3, "0")}`;
}

export default function WorkoutsPage({
  workouts,
  setWorkouts,
  programs,
}: WorkoutsPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<WorkoutForm>({
    name: "",
    date: "",
    duration: "",
    program: "",
    completed: false,
  });

  const filteredWorkouts = useMemo(
    () =>
      workouts.filter((workout) =>
        Object.values(workout).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      ),
    [workouts, searchTerm]
  );

  function resetForm() {
    setEditingId(null);
    setForm({
      name: "",
      date: "",
      duration: "",
      program: "",
      completed: false,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim() || !form.program.trim()) return;

    if (editingId) {
      setWorkouts(
        workouts.map((workout) =>
          workout.id === editingId ? { ...workout, ...form } : workout
        )
      );
    } else {
      setWorkouts([
        ...workouts,
        {
          id: createId("W", workouts.length),
          ...form,
        },
      ]);
    }

    resetForm();
  }

  function handleEdit(workout: Workout) {
    setEditingId(workout.id);

    setForm({
      name: workout.name,
      date: workout.date,
      duration: workout.duration,
      program: workout.program,
      completed: workout.completed,
    });
  }

  function handleDelete(id: string) {
    setWorkouts(workouts.filter((workout) => workout.id !== id));
  }

  return (
    <CrudCard
      title="Workouts"
      description="Create, update, delete, and search workouts connected to a program."
    >
      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-4">
          <label className="form-label">Workout Name</label>
          <input
            className="form-control"
            placeholder="Workout name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Workout Date</label>
          <input
            type="date"
            className="form-control"
            value={form.date}
            onChange={(event) => setForm({ ...form, date: event.target.value })}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Duration</label>
          <input
            className="form-control"
            placeholder="01:00:00"
            value={form.duration}
            onChange={(event) =>
              setForm({ ...form, duration: event.target.value })
            }
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Program</label>
          <select
            className="form-select"
            value={form.program}
            onChange={(event) =>
              setForm({ ...form, program: event.target.value })
            }
            required
          >
            <option value="">Select program</option>
            {programs.map((program) => (
              <option key={program.id} value={program.name}>
                {program.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6 d-flex align-items-end">
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              checked={form.completed}
              onChange={(event) =>
                setForm({ ...form, completed: event.target.checked })
              }
              id="completedCheck"
            />

            <label className="form-check-label" htmlFor="completedCheck">
              Workout completed
            </label>
          </div>
        </div>

        <FormButtons editingId={editingId} resetForm={resetForm} />
      </form>

      <SearchBox
        value={searchTerm}
        onChange={setSearchTerm}
        label="Search workouts..."
      />

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Program</th>
              <th>Date</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredWorkouts.length > 0 ? (
              filteredWorkouts.map((workout) => (
                <tr key={workout.id}>
                  <td>{workout.id}</td>
                  <td>{workout.name}</td>
                  <td>{workout.program}</td>
                  <td>{workout.date}</td>
                  <td>{workout.duration}</td>
                  <td>
                    <span
                      className={`badge ${
                        workout.completed ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {workout.completed ? "Completed" : "Planned"}
                    </span>
                  </td>
                  <td>
                    <ActionButtons
                      onEdit={() => handleEdit(workout)}
                      onDelete={() => handleDelete(workout.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center text-muted py-4">
                  No workouts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </CrudCard>
  );
}
