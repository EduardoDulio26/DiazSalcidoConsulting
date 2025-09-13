export default function Hero() {
  return (
    <section className="hero parallax" id="top" aria-label="Portada con imagen fija del escritorio">
      <div className="container hero-inner">
        <h1>Contabilidad y estrategia fiscal para hacer crecer tu negocio</h1>
        <p>Servicios contables, fiscales y financieros precisos, oportunos y confiables para PYMES.</p>
        <a href="#contacto" className="btn btn-primary">Agenda una consulta</a>
      </div>

      {/* Ondas decorativas (únicas) */}
      <div className="hero-waves" aria-hidden="true">
        <svg className="wave wave-top" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,60 C240,100 480,12 720,42 C960,72 1200,132 1440,96 L1440,120 L0,120 Z"></path>
        </svg>
        <svg className="wave wave-mid" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,80 C200,110 520,40 720,62 C920,84 1200,120 1440,92 L1440,120 L0,120 Z"></path>
        </svg>
        <svg className="wave wave-bot" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,96 C180,116 480,70 720,86 C960,102 1200,120 1440,108 L1440,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
}
