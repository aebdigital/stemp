/**
 * Netlify Function: /.netlify/functions/contact
 * Sends contact form submissions via SMTP2GO REST API.
 *
 * Required env vars (set in the Netlify dashboard):
 *   SMTP2GO_API_KEY        - your SMTP2GO API key
 *   SMTP2GO_SENDER         - verified "from" address (e.g. no-reply@stemp.sk)
 *   CONTACT_FORM_RECIPIENT - inbox that receives submissions (e.g. stemp@stemp.sk)
 */

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

function escapeHtml(str = "") {
  return String(str).replace(/[&<>"']/g, (ch) => {
    switch (ch) {
      case "&": return "&amp;";
      case "<": return "&lt;";
      case ">": return "&gt;";
      case '"': return "&quot;";
      default:  return "&#39;";
    }
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email || "").trim());
}

function bad(status, message) {
  return {
    statusCode: status,
    headers: JSON_HEADERS,
    body: JSON.stringify({ ok: false, error: message }),
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return bad(405, "Method not allowed");
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return bad(400, "Invalid JSON payload.");
  }

  const name = (payload.name || "").toString().trim();
  const email = (payload.email || "").toString().trim();
  const phone = (payload.phone || "").toString().trim();
  const message = (payload.message || "").toString().trim();
  const honeypot = (payload.company || "").toString().trim();

  if (honeypot) {
    // bot — pretend success
    return {
      statusCode: 200,
      headers: JSON_HEADERS,
      body: JSON.stringify({ ok: true }),
    };
  }

  if (!name || name.length < 2) return bad(400, "Zadajte vaše meno.");
  if (!isValidEmail(email)) return bad(400, "Zadajte platný e-mail.");
  if (!message || message.length < 5)
    return bad(400, "Správa je príliš krátka.");
  if (name.length > 200 || message.length > 5000)
    return bad(400, "Príliš dlhý vstup.");

  const apiKey = process.env.SMTP2GO_API_KEY;
  const sender = process.env.SMTP2GO_SENDER;
  const recipient = process.env.CONTACT_FORM_RECIPIENT;

  if (!apiKey || !sender || !recipient) {
    console.error("Missing SMTP2GO env vars");
    return bad(500, "Server e-mail nie je nakonfigurovaný.");
  }

  const subject = `Nová správa zo stránky — ${name}`;
  const textBody =
    `Meno: ${name}\n` +
    `E-mail: ${email}\n` +
    `Telefón: ${phone || "—"}\n\n` +
    `Správa:\n${message}\n`;

  const htmlBody = `
    <h2 style="font-family:Montserrat,system-ui,sans-serif;color:#110703">Nová správa zo stránky</h2>
    <table style="font-family:Montserrat,system-ui,sans-serif;font-size:14px;color:#212121">
      <tr><td><strong>Meno</strong></td><td>${escapeHtml(name)}</td></tr>
      <tr><td><strong>E-mail</strong></td><td>${escapeHtml(email)}</td></tr>
      <tr><td><strong>Telefón</strong></td><td>${escapeHtml(phone || "—")}</td></tr>
    </table>
    <hr/>
    <p style="font-family:Montserrat,system-ui,sans-serif;white-space:pre-wrap;color:#212121">${escapeHtml(message)}</p>
  `;

  try {
    const res = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Smtp2go-Api-Key": apiKey,
      },
      body: JSON.stringify({
        sender,
        to: [recipient],
        reply_to: [`${name} <${email}>`],
        subject,
        text_body: textBody,
        html_body: htmlBody,
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok || data?.data?.failed) {
      console.error("SMTP2GO error", res.status, data);
      return bad(502, "E-mail sa nepodarilo odoslať. Skúste neskôr.");
    }

    return {
      statusCode: 200,
      headers: JSON_HEADERS,
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error(err);
    return bad(500, "Neočakávaná chyba na serveri.");
  }
};
