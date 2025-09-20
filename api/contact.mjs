// api/contact.mjs  (Vercel Serverless Function - ESM)
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Method not allowed' });
    return;
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const { nombre, correo, telefono, mensaje, hp } = body;

  // Honeypot
  if (hp) { res.status(200).json({ ok: true }); return; }

  if (!nombre || !correo || !mensaje) {
    res.status(400).json({ ok: false, message: 'Faltan campos requeridos.' });
    return;
  }

  try {
    // Preferimos SMTP_* (Outlook). Si no existen, cae a Gmail_*.
    let transporter;
    if (process.env.SMTP_HOST) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: String(process.env.SMTP_SECURE || 'false') === 'true', // 587 -> false
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
    } else if (process.env.GMAIL_USER) {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
      });
    } else {
      throw new Error('No hay credenciales SMTP configuradas.');
    }

    const toList = (process.env.TO_EMAIL ||
      process.env.SMTP_USER || process.env.GMAIL_USER || ''
    )
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const from = process.env.FROM_EMAIL ||
      process.env.SMTP_USER || process.env.GMAIL_USER;

    const html = `
      <h2>Nuevo mensaje desde la web</h2>
      <p><b>Nombre:</b> ${nombre}</p>
      <p><b>Correo:</b> ${correo}</p>
      ${telefono ? `<p><b>Teléfono:</b> ${telefono}</p>` : ''}
      <p><b>Mensaje:</b></p>
      <p style="white-space:pre-wrap">${mensaje}</p>
    `;

    await transporter.sendMail({
      from: `Web Díaz Salcido <${from}>`,
      to: toList,
      replyTo: correo,
      subject: `Nuevo contacto — ${nombre}`,
      text:
        `Nombre: ${nombre}\n` +
        `Correo: ${correo}\n` +
        (telefono ? `Teléfono: ${telefono}\n` : '') +
        `\nMensaje:\n${mensaje}`,
      html,
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('CONTACT_FN_ERROR', err);
    res.status(500).json({ ok: false, message: 'No se pudo enviar el correo.' });
  }
}
