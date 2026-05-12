import { useMemo, useState } from "react";
import ActionButtons from "../components/ActionButtons";
import CrudCard from "../components/CrudCard";
import FormButtons from "../components/FormButton";
import SearchBox from "../components/SearchBox";
import type { User, UserForm } from "../types";

type UsersPageProps = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

function createId(prefix: string, currentLength: number): string {
  return `${prefix}${String(currentLength + 1).padStart(3, "0")}`;
}

export default function UsersPage({ users, setUsers }: UsersPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<UserForm>({
    firstName: "",
    lastName: "",
    email: "",
    dateJoined: "",
  });

  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        Object.values(user).some((value) =>
          value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ),
    [users, searchTerm]
  );

  function resetForm() {
    setEditingId(null);
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      dateJoined: "",
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
      return;
    }

    if (editingId) {
      setUsers(
        users.map((user) =>
          user.id === editingId ? { ...user, ...form } : user
        )
      );
    } else {
      setUsers([
        ...users,
        {
          id: createId("U", users.length),
          ...form,
        },
      ]);
    }

    resetForm();
  }

  function handleEdit(user: User) {
    setEditingId(user.id);

    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dateJoined: user.dateJoined,
    });
  }

  function handleDelete(id: string) {
    setUsers(users.filter((user) => user.id !== id));
  }

  return (
    <CrudCard title="Users" description="Manage application users.">
      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-3">
          <label className="form-label">First Name</label>
          <input
            className="form-control"
            placeholder="First name"
            value={form.firstName}
            onChange={(event) =>
              setForm({ ...form, firstName: event.target.value })
            }
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Last Name</label>
          <input
            className="form-control"
            placeholder="Last name"
            value={form.lastName}
            onChange={(event) =>
              setForm({ ...form, lastName: event.target.value })
            }
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={form.email}
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Date Joined</label>
          <input
            type="date"
            className="form-control"
            value={form.dateJoined}
            onChange={(event) =>
              setForm({ ...form, dateJoined: event.target.value })
            }
          />
        </div>

        <FormButtons editingId={editingId} resetForm={resetForm} />
      </form>

      <SearchBox
        value={searchTerm}
        onChange={setSearchTerm}
        label="Search users..."
      />

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Date Joined</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.dateJoined}</td>
                  <td>
                    <ActionButtons
                      onEdit={() => handleEdit(user)}
                      onDelete={() => handleDelete(user.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-muted py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </CrudCard>
  );
}
