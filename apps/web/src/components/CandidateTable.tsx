import type { CandidateRow, Stage } from "../data/sample";

interface Props {
  candidates: CandidateRow[];
  selectedId: string;
  onSelect: (id: string) => void;
  onStageChange: (id: string, stage: Stage) => void;
}

const scoreClass = (score: number) => (score >= 80 ? "high" : score >= 65 ? "medium" : "low");

export function CandidateTable({ candidates, selectedId, onSelect, onStageChange }: Props) {
  return (
    <section className="tablePanel">
      <div className="tableHeader">
        <span className="checkbox" />
        <span>Candidate</span>
        <span>Match ↕</span>
        <span>Stage</span>
        <span>Source</span>
        <span>Applied</span>
        <span>Tags</span>
        <span />
      </div>
      {candidates.map((candidate) => (
        <button
          className={`candidateRow ${candidate.id === selectedId ? "selected" : ""}`}
          key={candidate.id}
          onClick={() => onSelect(candidate.id)}
        >
          <span className={`checkbox ${candidate.id === selectedId ? "checked" : ""}`}>{candidate.id === selectedId ? "✓" : ""}</span>
          <span className="candidateCell">
            <span className="avatar">{candidate.initials}</span>
            <span>
              <strong>{candidate.name}</strong>
              <small>{candidate.role}</small>
            </span>
          </span>
          <span className={`scoreRing ${scoreClass(candidate.match)}`} style={{ "--score": `${candidate.match * 3.6}deg` } as React.CSSProperties}>
            {candidate.match}
          </span>
          <span>
            <select
              value={candidate.stage}
              className={`stage ${candidate.stage.toLowerCase().replace(/\s/g, "-")}`}
              onClick={(event) => event.stopPropagation()}
              onChange={(event) => onStageChange(candidate.id, event.target.value as Stage)}
            >
              {["Applied", "Screen", "In review", "Shortlisted", "Interview", "Offer", "Rejected"].map((stage) => (
                <option key={stage}>{stage}</option>
              ))}
            </select>
          </span>
          <span>{candidate.source}</span>
          <span>{candidate.applied}</span>
          <span className="tags">{candidate.tags.map((tag) => <em key={tag}>{tag}</em>)}</span>
          <span className="rowMenu">⋮</span>
        </button>
      ))}
      <div className="pagination">
        <span>1-{candidates.length} of 34</span>
        <span>Rows per page: <strong>25</strong></span>
        <button>‹</button>
        <button className="activePage">1</button>
        <button>2</button>
        <button>›</button>
      </div>
    </section>
  );
}
