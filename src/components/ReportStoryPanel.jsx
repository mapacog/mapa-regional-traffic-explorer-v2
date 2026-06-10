export default function ReportStoryPanel({ title, eyebrow, items }) {
  return (
    <article className="story-panel">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h3>{title}</h3>
      <div className="story-list">
        {items.map((item) => (
          <section key={item.title}>
            <strong>{item.title}</strong>
            <p>{item.copy}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
