import { Icon } from "./Icons";

const sections = [
  { label: "Dashboard", icon: "home", active: true },
  { heading: "Jobs" },
  { label: "Job postings", icon: "job" },
  { label: "Candidates", icon: "people" },
  { label: "Pipeline", icon: "pipeline" },
  { label: "Interview plan", icon: "calendar" },
  { label: "Approvals", icon: "check" },
  { heading: "AI & automation" },
  { label: "AI Copilot", icon: "spark" },
  { label: "Templates", icon: "doc" },
  { label: "Workflows", icon: "flow" },
  { label: "Scorecards", icon: "check" },
  { heading: "Data" },
  { label: "Reports", icon: "chart" },
  { label: "Analytics", icon: "chart" },
  { label: "Audit trail", icon: "doc" },
  { heading: "Settings" },
  { label: "Team", icon: "people" },
  { label: "Integrations", icon: "flow" },
  { label: "Preferences", icon: "gear" }
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brandMark">◎</div>
        <span>RecruitOps AI</span>
      </div>
      <nav className="nav">
        {sections.map((item, index) =>
          "heading" in item ? (
            <div className="navHeading" key={`${item.heading}-${index}`}>{item.heading}</div>
          ) : (
            <button className={`navItem ${item.active ? "active" : ""}`} key={item.label}>
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </button>
          )
        )}
      </nav>
      <button className="collapseButton">← Collapse</button>
    </aside>
  );
}
