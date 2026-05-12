type FormButtonsProps = {
  editingId: string | null;
  resetForm: () => void;
};

export default function FormButtons({
  editingId,
  resetForm,
}: FormButtonsProps) {
  return (
    <div className="col-12 d-flex gap-2">
      <button className="btn btn-primary" type="submit">
        {editingId ? "Save Changes" : "Add Record"}
      </button>

      {editingId && (
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={resetForm}
        >
          Cancel Edit
        </button>
      )}
    </div>
  );
}
