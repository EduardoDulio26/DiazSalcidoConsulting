import { useEffect, useState } from "react";
import Icon from "./Icon";
import { readAndClearPrefill } from "../utils/prefill";

const MAX_MSG = 250;

export default function Contact() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // {type:'ok'|'error', text:''}

  // Pre-relleno desde "Solicitar"
  useEffect(() => {
    const fromStorage = readAndClearPrefill();
    if (fromStorage) setMensaje(fromStorage);

    const onPrefill = (e) => setMensaje(e.detail);
    window.addEventListener("contact:prefill", onPrefill);
    return () => window.removeEventListener("contact:prefill", onPrefill);
  }, []);

  const onChangeMensaje = (e) => {
    const v = e.target.value.slice(0, MAX_MSG);
    setMensaje(v);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!accepted) {
      setStatus({ type: "error", text: "Por favor acepta el aviso de privacidad." });
      return;
    }

    setSending(true);
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, telefono, mensaje }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) throw new Error(data.message || "Error");

      setStatus({ type: "ok", text: "¡Gracias! Nos pondremos en contacto en breve." });
      setNombre(""); setCorreo(""); setTelefono("");
      // conservamos "mensaje" por si quieren editarlo
    } catch {
      setStatus({ type: "error", text: "No se pudo enviar. Inténtalo nuevamente." });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contacto" className="section contact-wrap">
      <div className="container">
        <div className="contact-layout">
          {/* Columna izquierda: info */}
          <div className="contact-info">
            <p>
              Brindamos información clara para que tu empresa encuentre soluciones a la medida.
            </p>
            <ul className="contact-list">
              <li>
                <Icon name="phone-call" ext="png" size={18} className="ic ic--light" />
                (351) 375 3191
              </li>
              <li>
                <Icon name="whatsapp" ext="png" size={18} className="ic" />
                +52 351 375 3191
              </li>
              <li>
                <Icon name="email" ext="png" size={18} className="ic ic--light" />
                joseadriandiazsalcido6484@gmail.com
              </li>
            </ul>
          </div>

          {/* Formulario (tarjeta a la derecha) */}
          <form className="form-styled" onSubmit={onSubmit}>
            <div className="form-head">
              <h3>Recibe más información</h3>
              <p>Déjanos tus datos y te contactaremos en breve.</p>
            </div>

            <div className="form-grid">
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

              <input
                className="control full"
                type="tel"
                placeholder="Teléfono (opcional)"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />

              <div className="full">
                <textarea
                  className="control"
                  placeholder="Cuéntanos qué necesitas…"
                  value={mensaje}
                  onChange={onChangeMensaje}
                  rows={5}
                />
                <div className="char-counter">{`${mensaje.length}/${MAX_MSG}`}</div>
              </div>
            </div>

            <label className="check center">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              <span>
                Acepto el{" "}
                <a href="/aviso-de-privacidad.pdf" target="_blank" rel="noopener noreferrer">
                  aviso de privacidad
                </a>
              </span>
            </label>

            <div className="actions center">
              <button type="submit" className="btn primary" disabled={sending}>
                {sending ? "Enviando…" : "Enviar"}
                <Icon name="send" ext="png" size={18} style={{ marginLeft: 8, opacity: sending ? .5 : 1 }} />
              </button>
            </div>

            {status && (
              <p className={`form-status ${status.type} center`}>{status.text}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
