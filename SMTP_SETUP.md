# SMTP2GO + Netlify Functions setup

The contact form posts to `/.netlify/functions/contact`, which calls the
SMTP2GO REST API. No SMTP library, no nodemailer.

## 1. Create an SMTP2GO API key

1. Sign in at <https://app.smtp2go.com/>.
2. Go to **Settings → API Keys**.
3. Create a key with the `Email: Send` scope.
4. Verify the sender domain (or a single sender address) under
   **Settings → Sender Domains** so SMTP2GO will accept your "from" address.

## 2. Set Netlify environment variables

In the Netlify dashboard for the site:

**Site settings → Environment variables → Add a variable**

| Key                       | Value                                       |
| ------------------------- | ------------------------------------------- |
| `SMTP2GO_API_KEY`         | the API key from step 1                     |
| `SMTP2GO_SENDER`          | a verified sender, e.g. `no-reply@stemp.sk` |
| `CONTACT_FORM_RECIPIENT`  | the inbox that receives messages, e.g. `stemp@stemp.sk` |

After saving, redeploy the site (or trigger a new deploy) so functions pick
up the new env values.

## 3. Local development

```bash
cp .env.example .env.local
# fill in the three values
npm install
npx netlify dev          # runs Next.js + functions on http://localhost:8888
```

`netlify dev` serves both the Next app and `/.netlify/functions/*` at the
same origin, so the contact form just works.

You can also run plain `npm run dev` (Next on `:3000`) — the form will still
submit but you'll need a running function emulator on the same origin to get
a real send. For pure UI work this is fine; you'll just get a network error
from the form, which is expected without the function running.

## 4. How the form flows

1. User fills the form at `/kontakt`.
2. `components/ContactForm.tsx` POSTs JSON to `/.netlify/functions/contact`.
3. `netlify/functions/contact.js` validates input (with a hidden honeypot
   field for bots), then calls `https://api.smtp2go.com/v3/email/send`.
4. The function returns `{ ok: true }` on success or
   `{ ok: false, error: "…" }` with a 4xx/5xx status on failure.
5. The form shows the corresponding success/error message inline.

## 5. Troubleshooting

- **`Server e-mail nie je nakonfigurovaný.`** — one of the three env vars is
  missing in Netlify.
- **`E-mail sa nepodarilo odoslať.`** — check the function log in Netlify
  (`Site → Logs → Functions → contact`); the SMTP2GO response is logged on
  failure. Common causes: unverified sender domain, expired API key.
- **CORS errors locally** — make sure you're hitting the function via
  `netlify dev` (port 8888), not by opening Next directly on port 3000.
