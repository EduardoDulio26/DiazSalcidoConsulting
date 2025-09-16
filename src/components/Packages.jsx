// src/components/Packages.jsx
import Icon from "./Icon";

const PACKS = [
  {
    slug: "emprendedor",
    title: "Emprendedor",
    icon: "entrepreneur", // public/icons/entrepreneur.png
    price: "Desde $X/mes",
    items: ["Facturación", "Declaraciones", "Asesoría básica"],
  },
  {
    slug: "pyme",
    title: "PyME",
    icon: "company", // public/icons/company.png
    price: "Desde $Y/mes",
    items: ["Nóminas", "Estrategia fiscal", "Acompañamiento mensual"],
  },
  {
    slug: "corporativo",
    title: "Corporativo",
    icon: "corporate", // public/icons/corporate.png
    price: "A medida",
    items: ["Auditorías", "Asesoría integral", "Defensa fiscal"],
  },
];

export default function Packages() {
  const solicitar = (pack) => {
  const text = `Hola, me gustaría solicitar más información sobre el paquete de ${pack.title}.`;

  try {
    localStorage.setItem("contact_prefill", text);
  } catch (err) {
    // En Safari Private/ambientes restringidos puede fallar localStorage:
    if (import.meta.env.DEV) console.debug("localStorage no disponible:", err);
  }

  // avisar en vivo al formulario
  window.dispatchEvent(new CustomEvent("contact:prefill", { detail: text }));

  // llevar a la sección de contacto
  const el = document.getElementById("contacto");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  else window.location.hash = "#contacto";
};


  return (
    <section id="paquetes" className="section">
      <div className="container">
        <h2>Paquetes</h2>

        <div className="packages-grid">
          {PACKS.map((p) => (
            <article key={p.slug} className="pkg-card">
              <div className="pkg-icon">
                <Icon
                  name={p.icon}
                  ext="png"
                  size={22}
                  className="ic"
                  title={p.title}
                />
              </div>

              <header className="pkg-head">
                <h3>{p.title}</h3>
                <p className="pkg-price">{p.price}</p>
              </header>

              <ul className="pkg-list">
                {p.items.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>

              <button className="btn" onClick={() => solicitar(p)}>
                Solicitar
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
