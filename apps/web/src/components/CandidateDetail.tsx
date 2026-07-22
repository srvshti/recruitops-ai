import type { CandidateRow } from "../data/sample";

export function CandidateDetail({ candidate, onShortlist, onReject }: { candidate: CandidateRow; onShortlist: () => void; onReject: () => void }) {
  return (
    <aside className="detailPanel">
      <div className="detailTop">
        <div>
          <h2>{candidate.name}</h2>
          <p>{candidate.role}</p>
        </div>
        <button className="iconButton">×</button>
      </div>

      <div className="contactLines">
        <span>✉ {candidate.email}</span>
        <span>☎ {candidate.phone}</span>
        <span>⌖ {candidate.location}</span>
        <span>↗ LinkedIn</span>
      </div>

      <div className="matchCard">
        <div className="largeScore" style={{ "--selected-score": candidate.match } as React.CSSProperties}>{candidate.match}</div>
        <div>
          <strong>{candidate.match >= 80 ? "Strong match" : candidate.match >= 65 ? "Potential match" : "Needs review"}</strong>
          <p>{candidate.summary}</p>
        </div>
        <div className="actionStack">
          <button className="primaryAction" onClick={onShortlist}>☆ Shortlist</button>
          <button className="secondaryAction" onClick={onReject}>Reject</button>
        </div>
      </div>

      <div className="tabs">
        {["Overview", "Resume", "Parsed data", "Score details", "Notes", "Activity"].map((tab, index) => (
          <button className={index === 0 ? "tabActive" : ""} key={tab}>{tab}</button>
        ))}
      </div>

      <section className="detailSection">
        <div className="sectionHeader">
          <h3>AI match explanation</h3>
          <button>View full analysis</button>
        </div>
        <ul className="explainList">
          {candidate.strengths.map((item) => <li className="positive" key={item}>{item}</li>)}
          {candidate.risks.map((item) => <li className="warning" key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="detailSection">
        <div className="sectionHeader">
          <h3>Parsed skills</h3>
          <span>{candidate.skills.length} total</span>
        </div>
        <div className="skillCloud">
          {candidate.skills.map((skill) => <span key={skill}>{skill}</span>)}
        </div>
      </section>

      <section className="detailSection">
        <h3>Experience</h3>
        {candidate.experience.map((item) => (
          <div className="experience" key={`${item.company}-${item.title}`}>
            <strong>{item.title}</strong>
            <span>{item.company}</span>
            <small>{item.dates}</small>
          </div>
        ))}
      </section>
    </aside>
  );
}
