import { emailConfig, type EmailTemplate } from "@/config/email";
import { siteConfig } from "@/config/site";
import { sendBrevoEmail } from "@/lib/email/brevo";

interface TransactionalEmailInput {
  toEmail: string;
  template: EmailTemplate;
}

function buildHtmlEmail(template: EmailTemplate) {
  const paragraphMarkup = template.bodyParagraphs
    .map(
      (paragraph) =>
        `<p style=\"margin:0 0 16px 0;color:#1f2937;line-height:1.6;font-size:16px;\">${paragraph}</p>`,
    )
    .join("");

  const ctaMarkup = template.cta
    ? `<p style=\"margin:24px 0 0 0;\"><a href=\"${template.cta.href}\" style=\"display:inline-block;padding:10px 16px;background:#111827;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;\">${template.cta.label}</a></p>`
    : "";

  const previewTextMarkup = template.previewText
    ? `<div style=\"display:none;max-height:0;overflow:hidden;opacity:0;\">${template.previewText}</div>`
    : "";

  return `
    <html>
      <body style="margin:0;padding:24px;background:#f8fafc;font-family:Arial,sans-serif;">
        ${previewTextMarkup}
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:24px;">
              <h1 style="margin:0 0 16px 0;font-size:24px;line-height:1.3;color:#0f172a;">${template.heading}</h1>
              ${paragraphMarkup}
              ${ctaMarkup}
              <hr style="border:0;border-top:1px solid #e5e7eb;margin:24px 0;" />
              <p style="margin:0;color:#6b7280;font-size:12px;line-height:1.6;">${siteConfig.name}, ${siteConfig.url}</p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `.trim();
}

function buildTextEmail(template: EmailTemplate) {
  const lines = [template.heading, "", ...template.bodyParagraphs];

  if (template.cta) {
    lines.push("", `${template.cta.label}: ${template.cta.href}`);
  }

  lines.push("", `${siteConfig.name} - ${siteConfig.url}`);

  return lines.join("\n");
}

async function sendTransactionalEmail(input: TransactionalEmailInput) {
  return sendBrevoEmail({
    to: { email: input.toEmail },
    subject: input.template.subject,
    htmlContent: buildHtmlEmail(input.template),
    textContent: buildTextEmail(input.template),
  });
}

export async function sendSignupWelcomeEmail(email: string) {
  const template = emailConfig.templates.signupWelcome;
  return sendTransactionalEmail({ toEmail: email, template });
}

export async function sendWaitlistOptInEmail(email: string) {
  const template = emailConfig.templates.waitlistOptIn;
  return sendTransactionalEmail({ toEmail: email, template });
}
