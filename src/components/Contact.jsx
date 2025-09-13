import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [msg, setMsg] = useState("");
  const formRef = useRef(null);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setMsg("");
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.message || "Error al enviar");

      // ÉXITO
      setStatus("success");
      setMsg("¡Gracias! Hemos recibido tu mensaje.");
      formRef.current?.reset();
    } catch (err) {
      setStatus("error");
      setMsg(err.message || "No fue posible enviar tu mensaje. Intenta más tarde.");
    }
  }

  // Volver a 'idle' tras la animación de éxito/error
  useEffect(() => {
    if (status === "success" || status === "error") {
      const t = setTimeout(() => setStatus("idle"), 2200);
      return () => clearTimeout(t);
    }
  }, [status]);

  return (
    <section id="contacto" className="section contact-hero">
      <div className="container contact-grid center">
        {/* Lado izquierdo modernizado */}
        <div className="contact-copy modern-left">
          <h2>¿Tienes dudas sobre nuestros servicios?</h2>
          <p className="lead">
            Brindamos información clara para que tu empresa encuentre soluciones a la medida.
          </p>
          <ul className="contact-lines">
            <li><span className="dot phone" /> (351) 375 3191</li>
            <li><span className="dot wa" /> WhatsApp: +52 351 375 3191</li>
            <li><span className="dot mail" /> joseadriandiazsalcido6484@gmail.com</li>
          </ul>
        </div>

        {/* Formulario con micro-animaciones */}
        <div className="panel form-card glass">
          <div className="form-head">
            <span className="chip">Escríbenos</span>
            <h2>Contáctanos</h2>
            <p className="sub">Te respondemos en menos de 24 h hábiles.</p>
          </div>

          <form ref={formRef} className="form form-styled modern" onSubmit={onSubmit}>
            <input name="hp" style={{display:"none"}} tabIndex={-1} autoComplete="off" />

            <input className="control" name="nombre" placeholder="Tu nombre" required />
            <input className="control" name="correo" type="email" placeholder="Tu correo electrónico" required />
            <textarea className="control col-2" name="mensaje" placeholder="Mensaje" rows="6" />

            <label className="check col-2">
              <input type="checkbox" required /> Acepto el{" "}
              <a href="/aviso-de-privacidad.pdf" target="_blank" rel="noopener noreferrer">aviso de privacidad</a>
            </label>

            <div className="form-actions col-2">
              <button
                className={`btn btn-gradient btn-lg submit-btn ${status}`}
                type="submit"
                disabled={status !== "idle"}
                aria-live="polite"
              >
                <span className="btn-label">
                  {status === "loading" ? "Enviando..." : status === "success" ? "¡Listo!" : status === "error" ? "Error" : "Enviar"}
                </span>

                {/* Spinner (loading) */}
                <span className="btn-spinner" aria-hidden />

                {/* Check (success) */}
                <svg className="btn-check" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 12.5l5 5 11-11" />
                </svg>

                {/* Cruz (error) */}
                <svg className="btn-cross" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          </form>

          {status !== "idle" && (
            <p aria-live="polite" style={{marginTop:12}}>{msg}</p>
          )}
        </div>
      </div>
    </section>
  );
}
