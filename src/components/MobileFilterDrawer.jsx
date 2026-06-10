import { SlidersHorizontal, X } from "lucide-react";

export function MobileFilterButton({ onClick, label = "Filters" }) {
  return (
    <button className="mobile-filter-button" type="button" onClick={onClick}>
      <SlidersHorizontal size={18} />
      {label}
    </button>
  );
}

export default function MobileFilterDrawer({ open, title, onClose, children }) {
  return (
    <div className={`drawer-shell ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <button className="drawer-backdrop" type="button" aria-label="Close filters" onClick={onClose} />
      <aside className="filter-drawer" role="dialog" aria-modal="true" aria-label={title}>
        <div className="drawer-title">
          <h3>{title}</h3>
          <button type="button" aria-label="Close filters" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        {children}
      </aside>
    </div>
  );
}
