import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  ["Overview", "overview"],
  ["Regional Patterns", "regional-patterns"],
  ["Intersections", "intersections"],
  ["Interchanges", "interchanges"],
  ["Multimodal & Freight", "multimodal"],
];

export default function BrandHeader() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="brand-header">
      <a className="brand-lockup" href="#overview" aria-label="Regional Traffic Explorer home" onClick={close}>
        <img src="./assets/mapa-logo-tag-blue-grey.png" alt="MAPA logo" />
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map(([label, id]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </nav>

      <button
        className="menu-button"
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <div className={`mobile-nav ${open ? "is-open" : ""}`}>
        <nav aria-label="Mobile navigation">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={close}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
