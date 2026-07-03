import "server-only";

import { Resend } from "resend";
import { getEnv, requireEnv } from "../env";

let resendClient: Resend | null = null;

function getResendClient() {
  if (!resendClient) {
    resendClient = new Resend(requireEnv("RESEND_API_KEY"));
  }

  return resendClient;
}

function getMvpWelcomeTemplate() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="dark">
    <title>Thank you for subscribing to test PaySplit</title>
  </head>
  <body style="margin:0;background:#061013;color:#f8fafc;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#061013;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;overflow:hidden;border-radius:24px;background:#0a171b;border:1px solid rgba(148,163,184,0.18);">
            <tr>
              <td style="padding:0;">
                <div style="height:8px;background:linear-gradient(90deg,#14b8a6,#22d3ee,#8b5cf6);"></div>
              </td>
            </tr>
            <tr>
              <td style="padding:40px 36px 28px;">
                <h1 style="margin:0 0 12px;color:#ffffff;font-size:34px;line-height:1.08;font-weight:800;letter-spacing:0;">
                  Thank you for subscribing to test PaySplit
                </h1>

                <p style="margin:0;color:#a8b7bd;font-size:16px;line-height:1.7;">
                  We'll let you know when MVP testing opens and send only product access updates related to early testing.
                </p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:30px 0;border-collapse:separate;border-spacing:0;">
                  <tr>
                    <td style="border-radius:18px;background:rgba(255,255,255,0.045);border:1px solid rgba(148,163,184,0.14);padding:22px;">
                      <p style="margin:0 0 10px;color:#5eead4;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">
                        What happens next
                      </p>
                      <p style="margin:0;color:#dbeafe;font-size:15px;line-height:1.65;">
                        We'll invite a small group first, collect feedback, and use it to shape the experience before public launch.
                      </p>
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding:0 0 8px;">
                      <div style="height:1px;background:linear-gradient(90deg,rgba(148,163,184,0),rgba(148,163,184,0.28),rgba(148,163,184,0));"></div>
                    </td>
                  </tr>
                </table>

                <p style="margin:22px 0 0;color:#819198;font-size:13px;line-height:1.7;">
                  You received this email because you subscribed to MVP notifications from PaySplit.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendMvpWelcomeEmail(email: string) {
  const from = requireEnv("RESEND_FROM_EMAIL");
  const notificationTo = getEnv("MVP_NOTIFICATION_TO");
  const resend = getResendClient();

  const welcomeEmail = await resend.emails.send({
    from,
    to: email,
    subject: "You're subscribed to PaySplit MVP notifications",
    html: getMvpWelcomeTemplate(),
  });

  if (notificationTo) {
    await resend.emails.send({
      from,
      to: notificationTo,
      subject: "New PaySplit MVP signup",
      html: `<p>${email} joined the MVP tester list.</p>`,
    });
  }

  return welcomeEmail;
}
