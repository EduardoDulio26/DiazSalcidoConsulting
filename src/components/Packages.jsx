// src/components/Packages.jsx
export default function Packages() {
  const planes = [
    {
      nombre: "Emprendedor",
      precio: "Desde $X/mes",
      puntos: [
        "Facturación",
        "Declaraciones",
        "Asesoría básica",
      ],
    },
    {
      nombre: "PyME",
      precio: "Desde $Y/mes",
      puntos: [
        "Nóminas",
        "Estrategia fiscal",
        "Acompañamiento mensual",
      ],
      destacado: true, // mostrará el chip "Recomendado"
    },
    {
      nombre: "Corporativo",
      precio: "A medida",
      puntos: [
        "Auditorías",
        "Asesoría integral",
        "Defensa fiscal",
      ],
    },
  ];

  return (
    <section id="paquetes" className="section">
      <div className="container">
        <h2>Paquetes</h2>

        <div className="grid">
          {planes.map((p) => (
            <article key={p.nombre} className="card plan-card">
              <header className="plan-head">
                <div className="plan-title">
                  <h3>{p.nombre}</h3>
                  {p.destacado && <span className="chip">Recomendado</span>}
                </div>
                <div className="price">{p.precio}</div>
              </header>

              <ul>
                {p.puntos.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>

              <div className="card-actions">
                <a
                  href="#contacto"
                  className="btn btn-secondary"
                  aria-label={`Solicitar paquete ${p.nombre}`}
                >
                  Solicitar
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
