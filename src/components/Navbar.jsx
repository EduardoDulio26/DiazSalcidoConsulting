import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  const items = [
    { href: "#servicios", label: "Servicios" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#paquetes", label: "Paquetes" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <header className={`navbar ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="nav-inner container">
        <a className="brand" href="#top" onClick={close}>
          <img src="/logo.jpg" alt="" />
          <span>Díaz Salcido Consulting</span>
        </a>

        <button
          className={`menu-toggle ${open ? "is-open" : ""}`}
          aria-label="Abrir menú"
          onClick={() => setOpen(v => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`nav-list ${open ? "is-open" : ""}`}>
          {items.map((it) => (
            <li key={it.href}>
              <a href={it.href} onClick={close}>{it.label}</a>
            </li>
          ))}
          {/* Botón WA: visible en desktop; en móvil lo mostramos como FAB */}
          <li className="hide-on-mobile">
            <a
              className="btn wa-btn"
              href="https://wa.me/523513753191"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </li>
        </ul>
      </nav>

      {/* FAB de WhatsApp para móvil */}
      <a
        className="wa-fab show-on-mobile"
        href="https://wa.me/523513753191"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear por WhatsApp"
      >
        <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
          <path fill="currentColor"
                d="M19.1 17.6c-.3-.2-1.9-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.1-.4.1-.7 0c-.3-.2-1.3-.5-2.5-1.6-1-1-1.6-2.2-1.8-2.5s0-.6.2-.7c.2-.2.5-.6.6-.8.2-.3.1-.5 0-.7l-.7-1.8c-.2-.4-.4-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1 1-1 2.4s1 2.7 1.1 2.9 2 3.1 4.8 4.3c.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.9-.8 2.1-1.6.2-.7.2-1.3.2-1.4 0-.1-.2-.2-.5-.4z"/>
          <path fill="currentColor"
                d="M26.5 5.5C23.7 2.7 20 1 16 1 8.8 1 3 6.8 3 14c0 2.4.6 4.6 1.8 6.6L3 31l10.6-1.8c2 .9 4.2 1.4 6.4 1.4 7.2 0 13-5.8 13-13 0-3.5-1.4-6.9-3.5-9.1zm-10.5 21c-2 0-3.9-.5-5.6-1.3l-.4-.2-6.5 1.1 1.1-6.3-.3-.5C3.7 18 3 16 3 14 3 7.9 7.9 3 14 3c3.2 0 6.2 1.2 8.5 3.5C25 9 26 11.5 26 14c0 6.1-4.9 11-11 11z"/>
        </svg>
      </a>
    </header>
  );
}
