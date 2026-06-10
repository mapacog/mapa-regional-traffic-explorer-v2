import { useMemo, useState } from "react";

const categoryOrder = [
  "All",
  "Regional Patterns",
  "Intersections",
  "Interchanges",
  "Freight",
  "Transit",
  "Multimodal",
];

function visualType(title) {
  const lower = title.toLowerCase();
  if (
    lower.includes("chart") ||
    lower.includes("traffic change") ||
    lower.includes("trips") ||
    lower.includes("volume") ||
    lower.includes("counts") ||
    lower.includes("rides")
  ) {
    return "interactive chart";
  }

  return "interactive web map";
}

export default function FigureGallery({
  figures,
  title = "Static map and chart placeholders",
  intro,
  eyebrow = "Future interactive views",
  showFilters = false,
  contextByFigure = {},
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = useMemo(() => {
    const present = new Set(figures.map((figure) => figure.category));
    return categoryOrder.filter((category) => category === "All" || present.has(category));
  }, [figures]);

  const visibleFigures =
    activeCategory === "All" ? figures : figures.filter((figure) => figure.category === activeCategory);

  return (
    <article className="figure-gallery">
      <div className={`figure-gallery-header ${showFilters ? "has-filters" : ""}`}>
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h3>{title}</h3>
          {intro ? <p>{intro}</p> : null}
        </div>
        {showFilters ? (
          <div className="category-tabs" role="tablist" aria-label="Figure categories">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? "is-active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="figure-grid">
        {visibleFigures.map((figure) => (
          <figure className="report-figure-card" key={figure.id}>
            <a href={figure.src} target="_blank" rel="noreferrer" aria-label={`Open ${figure.title}`}>
              <img src={figure.src} alt={figure.alt} loading="lazy" />
            </a>
            <figcaption>
              <span>Static placeholder | {figure.figure}</span>
              <strong>{figure.title}</strong>
              <em>Future {visualType(figure.title)}</em>
              {contextByFigure[figure.id] ? <p>{contextByFigure[figure.id]}</p> : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </article>
  );
}
