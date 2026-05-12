type ActionButtonsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function ActionButtons({
  onEdit,
  onDelete,
}: ActionButtonsProps) {
  return (
    <div className="d-flex gap-2">
      <button
        type="button"
        className="btn btn-sm btn-outline-primary"
        onClick={onEdit}
      >
        Edit
      </button>

      <button
        type="button"
        className="btn btn-sm btn-outline-danger"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
}
