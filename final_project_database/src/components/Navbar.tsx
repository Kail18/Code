import type { PageKey } from "../types";

type NavbarProps = {
  activePage: PageKey;
  setActivePage: React.Dispatch<React.SetStateAction<PageKey>>;
};

export default function Navbar({ activePage, setActivePage }: NavbarProps) {
  const pageTitle: Record<PageKey, string> = {
    dashboard: "Dashboard",
    programs: "Workout Programs",
    workouts: "Workouts",
    finishedWorkouts: "Finished Workouts",
    exercises: "Exercise Library",
    users: "Users",
  };

  const pages: PageKey[] = [
    "dashboard",
    "programs",
    "workouts",
    "finishedWorkouts",
    "exercises",
    "users",
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold">FitLog</span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {pages.map((page) => (
              <li className="nav-item" key={page}>
                <button
                  type="button"
                  className={`nav-link btn btn-link ${
                    activePage === page ? "active" : ""
                  }`}
                  onClick={() => setActivePage(page)}
                >
                  {pageTitle[page]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
