type DataTableProps = {
  columns: string[];
  rows: string[][];
};

export default function DataTable({ columns, rows }: DataTableProps) {
  return (
    <div className="horizontal-scroll-table">
      <table className="table table-hover align-middle dashboard-table">
        <thead className="table-light">
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center text-muted py-4"
              >
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
