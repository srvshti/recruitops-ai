import { useMemo, useState } from "react";
import { AuditTrail } from "./components/AuditTrail";
import { CandidateDetail } from "./components/CandidateDetail";
import { CandidateTable } from "./components/CandidateTable";
import { Icon } from "./components/Icons";
import { Sidebar } from "./components/Sidebar";
import { candidates as initialCandidates, type CandidateRow, type Stage } from "./data/sample";

const stageCounts = (rows: CandidateRow[]) => ({
  Applicants: 34,
  "In review": rows.filter((row) => row.stage === "In review").length,
  Shortlisted: rows.filter((row) => row.stage === "Shortlisted").length,
  Interview: rows.filter((row) => row.stage === "Interview").length,
  Offer: rows.filter((row) => row.stage === "Offer").length
});

export function App() {
  const [rows, setRows] = useState(initialCandidates);
  const [selectedId, setSelectedId] = useState("jessica");
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState("All");
  const [source, setSource] = useState("All");

  const filtered = useMemo(() => {
    return rows.filter((candidate) => {
      const matchesQuery = [candidate.name, candidate.email, candidate.role, candidate.skills.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesStage = stage === "All" || candidate.stage === stage;
      const matchesSource = source === "All" || candidate.source === source;
      return matchesQuery && matchesStage && matchesSource;
    });
  }, [query, rows, source, stage]);

  const selected = rows.find((candidate) => candidate.id === selectedId) ?? rows[0]!;
  const counts = stageCounts(rows);

  const updateStage = (id: string, nextStage: Stage) => {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, stage: nextStage } : row)));
  };

  return (
    <div className="appShell">
      <Sidebar />
      <main className="workspace">
        <header className="topbar">
          <div className="jobTitle">
            <h1>Senior Frontend Engineer</h1>
            <span className="statusDot" />
            <span>Open</span>
          </div>
          <div className="counts">
            {Object.entries(counts).map(([label, value]) => (
              <span key={label}><strong>{value}</strong>{label}</span>
            ))}
          </div>
          <div className="topActions">
            <label className="globalSearch">
              <Icon name="search" />
              <input placeholder="Search candidates" value={query} onChange={(event) => setQuery(event.target.value)} />
              <kbd>⌘K</kbd>
            </label>
            <button className="createButton"><Icon name="plus" /></button>
            <button className="iconButton"><Icon name="bell" /></button>
            <div className="profile">A</div>
          </div>
        </header>

        <div className="tabs mainTabs">
          {["Candidates", "Pipeline", "Job details", "Team", "Activity"].map((tab, index) => (
            <button className={index === 0 ? "tabActive" : ""} key={tab}>{tab}</button>
          ))}
        </div>

        <section className="filters">
          <label className="fieldSearch">
            <Icon name="search" />
            <input placeholder="Search by name, email, skills..." value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
          <select value={stage} onChange={(event) => setStage(event.target.value)}>
            <option>All</option>
            <option>Applied</option>
            <option>Screen</option>
            <option>In review</option>
            <option>Shortlisted</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          <select value={source} onChange={(event) => setSource(event.target.value)}>
            <option>All</option>
            <option>LinkedIn</option>
            <option>Referral</option>
            <option>Indeed</option>
            <option>Company site</option>
          </select>
          <select>
            <option>Location: All</option>
            <option>Remote</option>
            <option>United States</option>
          </select>
          <button className="filterButton">More filters ▽</button>
          <button className="saveView">Save view</button>
        </section>

        <div className="contentGrid">
          <div className="leftColumn">
            <CandidateTable candidates={filtered} selectedId={selected.id} onSelect={setSelectedId} onStageChange={updateStage} />
            <AuditTrail />
          </div>
          <CandidateDetail
            candidate={selected}
            onShortlist={() => updateStage(selected.id, "Shortlisted")}
            onReject={() => updateStage(selected.id, "Rejected")}
          />
        </div>
      </main>
    </div>
  );
}
