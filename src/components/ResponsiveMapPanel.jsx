/*
Future ArcGIS Maps SDK for JavaScript wiring:
1. Install @arcgis/core.
2. Replace the placeholder stage with a MapView.
3. Add FeatureLayer instances for:
   - Traffic Analysis District layer
   - Intersection points layer
   - Interchange points layer
   - Traffic flow/AADT layer
   - Heat map layer
4. Keep this component API so report data can remain visible while hosted web maps load.

Example:
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
*/

export default function ResponsiveMapPanel({
  title,
  eyebrow = "",
  description,
  items = [],
  selectedId,
  onSelect,
  staticFigure,
  context = [],
}) {
  const markers = items.slice(0, 42);

  return (
    <article className="map-panel">
      <div className="map-copy">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>

      <div className={`map-stage web-map-slot ${staticFigure ? "has-static-figure" : ""}`} role="img" aria-label={`${title} future interactive web map slot`}>
        {staticFigure ? (
          <img className="static-map-image" src={staticFigure.src} alt={staticFigure.alt} />
        ) : (
          <>
            <div className="map-river" aria-hidden="true" />
            <div className="map-route route-a" aria-hidden="true" />
            <div className="map-route route-b" aria-hidden="true" />
            <div className="map-route route-c" aria-hidden="true" />
            <div className="map-route route-d" aria-hidden="true" />
          </>
        )}

        {!staticFigure && markers.length === 0 ? (
          <div className="map-empty">
            <strong>No map points</strong>
            <span>Try a broader filter or add authoritative GIS layer data.</span>
          </div>
        ) : null}

        {!staticFigure && markers.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`map-marker ${item.id === selectedId ? "is-selected" : ""}`}
            style={{
              left: `${item.mapPosition?.x ?? 50}%`,
              top: `${item.mapPosition?.y ?? 50}%`,
            }}
            onClick={() => onSelect?.(item)}
            aria-label={`Select ${item.name}, rank ${item.regionalRank}`}
          >
            <span>{item.regionalRank}</span>
          </button>
        ))}
      </div>

      {context.length ? (
        <div className="map-context">
          {context.map((item) => (
            <section key={item.title}>
              <strong>{item.title}</strong>
              <p>{item.copy}</p>
            </section>
          ))}
        </div>
      ) : null}

    </article>
  );
}
