/**
 * RizzSites — Contact form endpoint (stub)
 *
 * This is not wired to a real email/CRM service. It exists so the form in
 * /contact/ has a real, configurable target instead of pretending to work.
 *
 * To make it live:
 *   1. Deploy this as a serverless function (Vercel, Netlify Functions,
 *      Cloudflare Workers, or a small Express route all work with minor
 *      adjustments to the export below).
 *   2. Plug in a real email service (e.g. Resend, Postmark, SendGrid) using
 *      that provider's API key as an environment variable — never hardcode
 *      a key in this file.
 *   3. In js/forms.js, set CONTACT_ENDPOINT to this function's deployed URL.
 *
 * Until steps 1-3 are done, js/forms.js will show a clear, honest message
 * telling the visitor to email hello@rizzsites.com directly instead of
 * silently failing or faking a success state.
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email, business, website, phone, need, budget, details } = req.body || {};

  if (!name || !email || !need || !budget) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  // TODO: send this payload via your email provider of choice, e.g.:
  //
  // await fetch('https://api.resend.com/emails', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     from: 'RizzSites <noreply@rizzsites.com>',
  //     to: 'hello@rizzsites.com',
  //     subject: `New project inquiry from ${name}`,
  //     text: `${name} (${email})\nBusiness: ${business}\nWebsite: ${website}\nPhone: ${phone}\nNeed: ${need}\nBudget: ${budget}\n\n${details}`,
  //   }),
  // });

  res.status(501).json({
    error: 'This endpoint is a stub. Connect an email provider before going live.',
  });
}
