import type { ReactNode } from "react";

type CrudCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function CrudCard({
  title,
  description,
  children,
}: CrudCardProps) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h4 className="fw-bold mb-1">{title}</h4>
        <p className="text-muted mb-4">{description}</p>
        {children}
      </div>
    </div>
  );
}
