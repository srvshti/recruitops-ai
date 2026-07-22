import { activity } from "../data/sample";

export function AuditTrail() {
  return (
    <section className="auditPanel">
      <div className="auditHeader">
        <h3>Audit trail & recommendations</h3>
        <div>
          <select><option>All events</option></select>
          <input placeholder="Search audit trail" />
        </div>
      </div>
      <div className="auditList">
        {activity.map((event) => (
          <div className="auditRow" key={event.id}>
            <span className={`auditIcon ${event.type}`}>{event.type === "ai" ? "✦" : event.type === "file" ? "▤" : event.type === "upload" ? "↥" : "♙"}</span>
            <span>
              <strong>{event.title}</strong>
              <small>{event.detail}</small>
            </span>
            <span>
              <time>{event.time}</time>
              <small>{event.actor}</small>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
