// src/components/Navbar.jsx
export default function Navbar() {
  const WHATSAPP = "523513753191"; // +52 351 375 3191

  return (
    <header className="nav">
      <div className="container">
        <a className="brand" href="#top">
          <img src="/logo.jpg" alt="Logo Díaz Salcido Consulting" className="logo" />
          <span>Díaz Salcido Consulting</span>
        </a>

        <nav className="links">
          <a href="#servicios">Servicios</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#paquetes">Paquetes</a>
          <a href="#contacto" className="btn">Contacto</a>

          {/* Botón de WhatsApp (verde) dentro del menú */}
          <a
            className="btn wa-btn btn-icon"
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hola, me gustaría agendar una consulta.")}`}
            target="_blank" rel="noopener noreferrer"
          >
            <svg viewBox="0 0 32 32" className="icon" aria-hidden="true">
              <path d="M19.11 17.28c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.74.91-.9 1.1-.17.19-.33.21-.61.07-.28-.14-1.19-.44-2.27-1.41-.84-.75-1.41-1.68-1.58-1.96-.17-.28-.02-.43.12-.57.12-.12.28-.33.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.47-.64-.48l-.55-.01c-.19 0-.49.07-.75.35-.26.28-1 1-1 2.44 0 1.44 1.02 2.84 1.16 3.03.14.19 2 3.04 4.86 4.27.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.11.55-.08 1.66-.68 1.89-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33zM16.02 3.2C9.88 3.2 4.9 8.18 4.9 14.32c0 2.05.54 3.97 1.49 5.64L4 28.8l9-2.35c1.62.89 3.49 1.4 5.47 1.4 6.14 0 11.12-4.98 11.12-11.12S22.16 3.2 16.02 3.2z"/>
            </svg>
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
