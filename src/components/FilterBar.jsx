export default function FilterBar({ filters }) {
  return (
    <div className="filter-bar" aria-label="Data filters">
      {filters.map((filter) => (
        <label className="field" key={filter.id}>
          <span>{filter.label}</span>
          <select value={filter.value} onChange={(event) => filter.onChange(event.target.value)}>
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  );
}
