import { formatNumber } from "../utils/format";

export default function RankingTable({ rows, selectedId, onSelect, title, showCounty = false }) {
  if (!rows.length) {
    return (
      <div className="ranking-shell">
        <article className="empty-state">
          <h3>No ranked locations</h3>
          <p>Try a broader rank group or county filter.</p>
        </article>
      </div>
    );
  }

  return (
    <div className="ranking-shell">
      <div className="table-wrap">
        <table className="ranking-table">
          <caption>{title}</caption>
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Location</th>
              {showCounty ? <th scope="col">County</th> : null}
              <th scope="col">Total AADT</th>
              <th scope="col">N</th>
              <th scope="col">E</th>
              <th scope="col">S</th>
              <th scope="col">W</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className={row.id === selectedId ? "is-selected" : ""}>
                <td>#{row.regionalRank}</td>
                <td>
                  <button type="button" onClick={() => onSelect(row)}>
                    {row.name}
                  </button>
                </td>
                {showCounty ? <td>{row.county}</td> : null}
                <td>{formatNumber(row.aadt)}</td>
                <td>{formatNumber(row.legs.north)}</td>
                <td>{formatNumber(row.legs.east)}</td>
                <td>{formatNumber(row.legs.south)}</td>
                <td>{formatNumber(row.legs.west)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ranking-cards" aria-label={`${title} cards`}>
        {rows.map((row) => (
          <button
            className={`ranking-card ${row.id === selectedId ? "is-selected" : ""}`}
            type="button"
            key={row.id}
            onClick={() => onSelect(row)}
          >
            <span>#{row.regionalRank}</span>
            <strong>{row.name}</strong>
            <em>{formatNumber(row.aadt)} AADT</em>
            {showCounty ? <small>{row.county} County</small> : null}
          </button>
        ))}
      </div>
    </div>
  );
}
