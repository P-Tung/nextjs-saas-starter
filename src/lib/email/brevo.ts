import { env } from "@/lib/env";

const BREVO_TRANSACTIONAL_EMAIL_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

type BrevoAddress = {
  email: string;
  name?: string;
};

export interface SendBrevoEmailInput {
  to: BrevoAddress;
  subject: string;
  htmlContent: string;
  textContent?: string;
  replyTo?: BrevoAddress;
}

export interface SendBrevoEmailResult {
  success: boolean;
  errorCode?: string;
  errorMessage?: string;
}

function getSenderAddress(): BrevoAddress | null {
  if (!env.optional.brevoSenderEmail) {
    return null;
  }

  return {
    email: env.optional.brevoSenderEmail,
    ...(env.optional.brevoSenderName ? { name: env.optional.brevoSenderName } : {}),
  };
}

function getReplyToAddress(): BrevoAddress | undefined {
  if (!env.optional.brevoReplyToEmail) {
    return undefined;
  }

  return {
    email: env.optional.brevoReplyToEmail,
    ...(env.optional.brevoSenderName ? { name: env.optional.brevoSenderName } : {}),
  };
}

export async function sendBrevoEmail(
  input: SendBrevoEmailInput,
): Promise<SendBrevoEmailResult> {
  const apiKey = env.optional.brevoApiKey;
  const sender = getSenderAddress();

  if (!apiKey) {
    return {
      success: false,
      errorCode: "BREVO_NOT_CONFIGURED",
      errorMessage: "BREVO_API_KEY is missing",
    };
  }

  if (!sender) {
    return {
      success: false,
      errorCode: "BREVO_SENDER_NOT_CONFIGURED",
      errorMessage: "BREVO_SENDER_EMAIL is missing",
    };
  }

  try {
    const response = await fetch(BREVO_TRANSACTIONAL_EMAIL_ENDPOINT, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender,
        to: [input.to],
        subject: input.subject,
        htmlContent: input.htmlContent,
        textContent: input.textContent,
        replyTo: input.replyTo ?? getReplyToAddress(),
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorBody = (await response.text()).slice(0, 500);
      return {
        success: false,
        errorCode: "BREVO_HTTP_ERROR",
        errorMessage: `Brevo responded with ${response.status}: ${errorBody}`,
      };
    }

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Brevo error";
    return {
      success: false,
      errorCode: "BREVO_REQUEST_FAILED",
      errorMessage: message,
    };
  }
}
