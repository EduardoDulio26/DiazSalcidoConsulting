import Icon from "./Icon";
import { useEffect, useState } from "react";
import { readAndClearPrefill } from "../utils/prefill";

export default function Contact() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fromStorage = readAndClearPrefill();
    if (fromStorage && !mensaje) setMensaje(fromStorage);

    const onPrefill = (e) => setMensaje(e.detail);
    window.addEventListener("contact:prefill", onPrefill);
    return () => window.removeEventListener("contact:prefill", onPrefill);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    // tu lógica existente de fetch('/api/contact', { ... })
  };

  return (
    <section id="contacto" className="section contact-wrap">
      <div className="container">

        {/* DATOS DE CONTACTO CON ICONOS */}
        <div className="contact-info">
          <p>Brindamos información clara para que tu empresa encuentre soluciones a la medida.</p>
          <ul className="contact-list">
            <li>
              <Icon name="phone-call" ext="png" className="li-ic icon-primary" />
              (351) 375 3191
            </li>
            <li>
              <Icon name="whatsapp" ext="png" className="li-ic icon-success" />
              +52 351 375 3191
            </li>
            <li>
              <Icon name="email" ext="png" className="li-ic icon-primary" />
              joseadriandiazsalcido6484@gmail.com
            </li>
          </ul>
        </div>

        {/* FORMULARIO */}
        <form className="form-styled" onSubmit={onSubmit}>
          <div className="grid">
            <input
              className="control"
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              className="control"
              type="email"
              placeholder="Tu correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <input
            className="control"
            type="tel"
            placeholder="Teléfono (opcional)"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />

          <textarea
            className="control"
            placeholder="Cuéntanos qué necesitas…"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            rows={5}
          />

          <button type="submit" className="btn primary">
            Enviar <Icon name="send" ext="png" className="btn-ic" /> {/* ⬅️ icono en el botón */}
          </button>
        </form>
      </div>
    </section>
  );
}
