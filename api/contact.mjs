/* eslint-env node */
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Solo POST
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  // Asegura body JSON
  let body = req.body || {};
  if (typeof body === "string") {
    try { body = JSON.parse(body || "{}"); } catch { body = {}; }
  }
  const { nombre, correo, telefono, mensaje, hp } = body;

  // Honeypot (bot)
  if (hp) return res.status(200).json({ ok: true });

  if (!nombre || !correo || !mensaje) {
    return res.status(400).json({ ok: false, message: "Faltan campos requeridos." });
  }

  try {
    // Transport con Gmail (requiere App Password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
    });

    const to = process.env.RECEIVER_EMAIL || process.env.GMAIL_USER;
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

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: "No se pudo enviar el correo." });
  }
}
