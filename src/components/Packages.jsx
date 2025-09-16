import { prefillContact } from "../utils/prefill";

function Packages() {
  const solicitar = (nombrePaquete) => {
    prefillContact({ packageName: nombrePaquete });

    // Desplaza suavemente a la sección de contacto
    const seccion = document.getElementById("contacto");
    if (seccion) seccion.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="paquetes" className="section container">
      {/* ... tus cards ... */}
      <div className="card">
        <h3>Emprendedor</h3>
        {/* ... lista ... */}
        <button className="btn" onClick={() => solicitar("Emprendedor")}>
          Solicitar
        </button>
      </div>

      <div className="card">
        <h3>PyME</h3>
        {/* ... lista ... */}
        <button className="btn" onClick={() => solicitar("PyME")}>
          Solicitar
        </button>
      </div>

      <div className="card">
        <h3>Corporativo</h3>
        {/* ... lista ... */}
        <button className="btn" onClick={() => solicitar("Corporativo")}>
          Solicitar
        </button>
      </div>
    </section>
  );
}

export default Packages;
