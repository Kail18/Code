import { useMemo, useState } from "react";
import ActionButtons from "../components/ActionButtons";
import CrudCard from "../components/CrudCard";
import FormButtons from "../components/FormButton";
import SearchBox from "../components/SearchBox";
import type { Exercise, ExerciseForm } from "../types";

type ExercisePageProps = {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
};

function createId(prefix: string, currentLength: number): string {
  return `${prefix}${String(currentLength + 1).padStart(3, "0")}`;
}

export default function ExercisePage({
  exercises,
  setExercises,
}: ExercisePageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<ExerciseForm>({
    name: "",
    muscleGroup: "",
    equipment: "",
    tracking: "",
  });

  const filteredExercises = useMemo(
    () =>
      exercises.filter((exercise) =>
        Object.values(exercise).some((value) =>
          value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ),
    [exercises, searchTerm]
  );

  function resetForm() {
    setEditingId(null);
    setForm({
      name: "",
      muscleGroup: "",
      equipment: "",
      tracking: "",
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim() || !form.muscleGroup.trim()) return;

    if (editingId) {
      setExercises(
        exercises.map((exercise) =>
          exercise.id === editingId ? { ...exercise, ...form } : exercise
        )
      );
    } else {
      setExercises([
        ...exercises,
        {
          id: createId("E", exercises.length),
          ...form,
        },
      ]);
    }

    resetForm();
  }

  function handleEdit(exercise: Exercise) {
    setEditingId(exercise.id);
    setForm({
      name: exercise.name,
      muscleGroup: exercise.muscleGroup,
      equipment: exercise.equipment,
      tracking: exercise.tracking,
    });
  }

  function handleDelete(id: string) {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
  }

  return (
    <CrudCard title="Exercises" description="Maintain the exercise library.">
      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Exercise name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            required
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Muscle group"
            value={form.muscleGroup}
            onChange={(event) =>
              setForm({ ...form, muscleGroup: event.target.value })
            }
            required
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Equipment"
            value={form.equipment}
            onChange={(event) =>
              setForm({ ...form, equipment: event.target.value })
            }
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Tracking type"
            value={form.tracking}
            onChange={(event) =>
              setForm({ ...form, tracking: event.target.value })
            }
          />
        </div>

        <FormButtons editingId={editingId} resetForm={resetForm} />
      </form>

      <SearchBox
        value={searchTerm}
        onChange={setSearchTerm}
        label="Search exercises..."
      />

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Muscle Group</th>
              <th>Equipment</th>
              <th>Tracking</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredExercises.map((exercise) => (
              <tr key={exercise.id}>
                <td>{exercise.id}</td>
                <td>{exercise.name}</td>
                <td>{exercise.muscleGroup}</td>
                <td>{exercise.equipment}</td>
                <td>{exercise.tracking}</td>
                <td>
                  <ActionButtons
                    onEdit={() => handleEdit(exercise)}
                    onDelete={() => handleDelete(exercise.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CrudCard>
  );
}
