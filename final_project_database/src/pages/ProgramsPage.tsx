import { useMemo, useState } from "react";
import ActionButtons from "../components/ActionButtons";
import CrudCard from "../components/CrudCard";
import FormButtons from "../components/FormButton";
import SearchBox from "../components/SearchBox";
import type { Id, Program, ProgramForm } from "../types";

type ProgramsPageProps = {
  programs: Program[];
  setPrograms: React.Dispatch<React.SetStateAction<Program[]>>;
};

export default function ProgramsPage({
  programs,
  setPrograms,
}: ProgramsPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<Id | null>(null);

  const [form, setForm] = useState<ProgramForm>({
    name: "",
    goal: "",
    startDate: "",
    endDate: "",
  });

  const filteredPrograms = useMemo(
    () =>
      programs.filter((program) =>
        Object.values(program).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      ),
    [programs, searchTerm]
  );

  function resetForm() {
    setEditingId(null);
    setForm({
      name: "",
      goal: "",
      startDate: "",
      endDate: "",
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim() || !form.goal.trim()) return;

    if (editingId) {
      // PUT route will be added later
      setPrograms(
        programs.map((program) =>
          program.id === editingId ? { ...program, ...form } : program
        )
      );
    } else {
      await fetch("http://localhost:5001/api/programs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1,
          name: form.name,
          goal: form.goal,
          startDate: form.startDate,
          endDate: form.endDate,
          createdBy: "Kail",
        }),
      });

      const response = await fetch("http://localhost:5001/api/programs");
      const data = await response.json();

      setPrograms(data);
    }

    resetForm();
  }

  function handleEdit(program: Program) {
    setEditingId(program.id);

    setForm({
      name: program.name,
      goal: program.goal,
      startDate: program.startDate,
      endDate: program.endDate,
    });
  }

  function handleDelete(id: Id) {
    setPrograms(programs.filter((program) => program.id !== id));
  }

  return (
    <CrudCard
      title="Programs"
      description="Create, update, delete, and search workout programs."
    >
      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-6">
          <label className="form-label">Program Name</label>
          <input
            className="form-control"
            placeholder="Program name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Goal</label>
          <input
            className="form-control"
            placeholder="Goal"
            value={form.goal}
            onChange={(event) => setForm({ ...form, goal: event.target.value })}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            value={form.startDate}
            onChange={(event) =>
              setForm({ ...form, startDate: event.target.value })
            }
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">End Date</label>
          <input
            type="date"
            className="form-control"
            value={form.endDate}
            onChange={(event) =>
              setForm({ ...form, endDate: event.target.value })
            }
          />
        </div>

        <FormButtons editingId={editingId} resetForm={resetForm} />
      </form>

      <SearchBox
        value={searchTerm}
        onChange={setSearchTerm}
        label="Search programs..."
      />

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Goal</th>
              <th>Start</th>
              <th>End</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((program) => (
                <tr key={program.id}>
                  <td>{program.id}</td>
                  <td>{program.name}</td>
                  <td>{program.goal}</td>
                  <td>{program.startDate}</td>
                  <td>{program.endDate}</td>
                  <td>
                    <ActionButtons
                      onEdit={() => handleEdit(program)}
                      onDelete={() => handleDelete(program.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-muted py-4">
                  No programs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </CrudCard>
  );
}
