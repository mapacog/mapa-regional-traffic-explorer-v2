export default function MetricCard({ icon: Icon, label, value, detail, tone = "blue" }) {
  return (
    <article className={`metric-card tone-${tone}`}>
      <div className="metric-icon" aria-hidden="true">
        {Icon ? <Icon size={21} strokeWidth={2.2} /> : null}
      </div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <span>{detail}</span>
      </div>
    </article>
  );
}
