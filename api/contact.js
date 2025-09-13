// api/contact.js  (Vercel Serverless Function)
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  // Solo POST
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, message: "Method not allowed" });
    return;
  }

  // Asegura body JSON
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
  const { nombre, correo, telefono, mensaje, hp } = body;

  // Honeypot (bot)
  if (hp) {
    res.status(200).json({ ok: true });
    return;
  }

  if (!nombre || !correo || !mensaje) {
    res.status(400).json({ ok: false, message: "Faltan campos requeridos." });
    return;
  }

  try {
    // Transport con Gmail (requiere App Password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
    });

    const to = process.env.RECEIVER_EMAIL || process.env.GMAIL_USER || "joseadriandiazsalcido6484@gmail.com";
    const html = `
      <h2>Nuevo mensaje desde la web</h2>
      <p><b>Nombre:</b> ${nombre}</p>
      <p><b>Correo:</b> ${correo}</p>
      ${telefono ? `<p><b>Teléfono:</b> ${telefono}</p>` : ""}
      <p><b>Mensaje:</b></p>
      <p style="white-space:pre-wrap">${mensaje}</p>
    `;

    await transporter.sendMail({
      from: `Web Díaz Salcido <${process.env.GMAIL_USER}>`,
      to,
      replyTo: correo,
      subject: `Nuevo contacto — ${nombre}`,
      text: `Nombre: ${nombre}\nCorreo: ${correo}\n${telefono ? `Teléfono: ${telefono}\n` : ""}\nMensaje:\n${mensaje}`,
      html,
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: "No se pudo enviar el correo." });
  }
};
