type StatCardProps = {
  title: string;
  value: number;
  subtitle: string;
};

export default function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <div className="card shadow-sm h-100 dashboard-stat-card">
      <div className="card-body">
        <p className="text-muted mb-1">{title}</p>
        <h2 className="fw-bold mb-1">{value}</h2>
        <p className="text-muted mb-0 small">{subtitle}</p>
      </div>
    </div>
  );
}
