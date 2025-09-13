export default function Topbar() {
  const PHONE_E164 = "+523513753191";      // para el enlace tel:
  const WHATSAPP = "523513753191";         // para wa.me

  return (
    <div className="topbar" role="region" aria-label="Información de contacto">
      <div className="container">
        <span className="topbar-left">Atención contable y fiscal para PYMES</span>

        <div className="topbar-right">
          <a className="item" href={`tel:${PHONE_E164}`} aria-label="Llamar">
            {/* Tel icon */}
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1v3.5a1 1 0 01-1 1C12.3 22.82 1.18 11.7 1.18 3a1 1 0 011-1H5.7a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.4 2.2z"/></svg>
            <span>(351) 375 3191</span>
          </a>

          <a
            className="item wa"
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hola, me gustaría agendar una consulta.")}`}
            target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
          >
            {/* WhatsApp icon */}
            <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M19.11 17.28c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.74.91-.9 1.1-.17.19-.33.21-.61.07-.28-.14-1.19-.44-2.27-1.41-.84-.75-1.41-1.68-1.58-1.96-.17-.28-.02-.43.12-.57.12-.12.28-.33.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.47-.64-.48l-.55-.01c-.19 0-.49.07-.75.35-.26.28-1 1-1 2.44 0 1.44 1.02 2.84 1.16 3.03.14.19 2 3.04 4.86 4.27.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.11.55-.08 1.66-.68 1.89-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33zM16.02 3.2C9.88 3.2 4.9 8.18 4.9 14.32c0 2.05.54 3.97 1.49 5.64L4 28.8l9-2.35c1.62.89 3.49 1.4 5.47 1.4 6.14 0 11.12-4.98 11.12-11.12S22.16 3.2 16.02 3.2z"/></svg>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
