import { formatNumber, formatPercent } from "../utils/format";

export function BarChartCard({ title, eyebrow, data, valueSuffix = "%", description }) {
  const max = Math.max(...data.map((item) => Math.abs(item.value)), 1);

  return (
    <article className="chart-card">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
      <div className="bar-chart">
        {data.map((item) => {
          const isNegative = item.value < 0;
          return (
            <div className="bar-row" key={item.label}>
              <span>{item.label}</span>
              <div className="bar-track">
                <i
                  className={isNegative ? "is-negative" : ""}
                  style={{ width: `${Math.max(5, (Math.abs(item.value) / max) * 100)}%` }}
                />
              </div>
              <strong>{valueSuffix === "%" ? formatPercent(item.value) : `${formatNumber(item.value)}${valueSuffix}`}</strong>
            </div>
          );
        })}
      </div>
    </article>
  );
}

export function SparklineCard({ title, value, label, series, tone = "blue" }) {
  const max = Math.max(...series);
  const min = Math.min(...series);
  const points = series
    .map((point, index) => {
      const x = (index / Math.max(1, series.length - 1)) * 100;
      const y = 34 - ((point - min) / Math.max(1, max - min)) * 28;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <article className={`spark-card tone-${tone}`}>
      <p>{label}</p>
      <strong>{value}</strong>
      <h3>{title}</h3>
      <svg viewBox="0 0 100 38" aria-hidden="true" focusable="false">
        <polyline points={points} />
      </svg>
    </article>
  );
}
