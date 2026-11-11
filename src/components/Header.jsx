
import { useState } from "react";

const links = [
  ["Work", "#work"],
  ["About", "#about"],
  ["Services", "#services"],
  ["Contact", "#contact"],
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mv-container flex items-center justify-between py-7">
        <a
          href="#home"
          className="font-display text-2xl font-semibold tracking-[0.18em]"
        >
          MEER<span className="text-brass">.</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="font-mono text-[10px] uppercase tracking-[0.15em] opacity-65 transition-opacity hover:opacity-100"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden border border-current/30 px-5 py-3 font-mono text-[10px] uppercase tracking-widest transition-colors hover:bg-brass hover:text-ink sm:block"
        >
          Let's talk ↗
        </a>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="border border-current/30 px-4 py-2 md:hidden"
        >
          {open ? "CLOSE ×" : "MENU +"}
        </button>
      </div>

      {open && (
        <nav className="mx-5 flex flex-col gap-6 border border-ink/10 bg-bone p-7 text-ink md:hidden">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="font-mono text-xs uppercase tracking-widest"
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
