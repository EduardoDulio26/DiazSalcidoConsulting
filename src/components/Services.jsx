import { accounting, tax, legalAudit } from "../data/services";

function ServiceCard({ title, items }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <ul>{items.map((it) => <li key={it}>{it}</li>)}</ul>
    </div>
  );
}

export default function Services() {
  return (
    <section id="servicios" className="section">
      <div className="container">
        <h2>Servicios</h2>
        <div className="grid">
          <ServiceCard title="Contables" items={accounting} />
          <ServiceCard title="Fiscales" items={tax} />
          <ServiceCard title="Jurídico-Corporativo / Auditorías" items={legalAudit} />
        </div>
      </div>
    </section>
  );
}
