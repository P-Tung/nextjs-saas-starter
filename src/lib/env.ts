function readString(value: string | undefined, fallback: string) {
  const normalizedValue = value?.trim();

  return normalizedValue ? normalizedValue : fallback;
}

function readOptionalString(value: string | undefined) {
  const trimmed = value?.trim();

  return trimmed ? trimmed : undefined;
}

function readUrl(value: string | undefined, fallback: string) {
  const candidate = readString(value, fallback);

  try {
    return new URL(candidate).toString().replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

function normalizeAbsoluteUrl(value: string | undefined) {
  const trimmed = value?.trim();

  if (!trimmed) {
    return undefined;
  }

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    return new URL(withProtocol).toString().replace(/\/$/, "");
  } catch {
    return undefined;
  }
}

function getDefaultAppUrl() {
  return (
    normalizeAbsoluteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    normalizeAbsoluteUrl(process.env.VERCEL_URL) ??
    "http://localhost:3000"
  );
}

export const env = {
  appName: readString(process.env.NEXT_PUBLIC_APP_NAME, "SaaS Template"),
  appUrl: readUrl(process.env.NEXT_PUBLIC_APP_URL, getDefaultAppUrl()),
  supportEmail: readString(
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
    "support@example.com",
  ),
  optional: {
    firebaseApiKey: readOptionalString(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
    firebaseAuthDomain: readOptionalString(
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    ),
    firebaseProjectId: readOptionalString(
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    ),
    firebaseStorageBucket: readOptionalString(
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    ),
    firebaseMessagingSenderId: readOptionalString(
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    ),
    firebaseAppId: readOptionalString(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
    firebaseMeasurementId: readOptionalString(
      process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    ),
    googleClientId: readOptionalString(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID),
    firebaseServiceAccountJson: readOptionalString(
      process.env.FIREBASE_SERVICE_ACCOUNT_JSON,
    ),
    firebaseAdminStorageBucket: readOptionalString(
      process.env.FIREBASE_STORAGE_BUCKET,
    ),
    googleSiteVerification: readOptionalString(
      process.env.GOOGLE_SITE_VERIFICATION,
    ),
    githubRepoUrl: normalizeAbsoluteUrl(process.env.NEXT_PUBLIC_GITHUB_REPO_URL),
    cmsApiUrl: readOptionalString(process.env.CMS_API_URL),
    cmsApiKey: readOptionalString(process.env.CMS_API_KEY),
    cmsProjectId: readOptionalString(process.env.NEXT_PUBLIC_CMS_PROJECT_ID),
    polarAccessToken: readOptionalString(process.env.POLAR_ACCESS_TOKEN),
    polarWebhookSecret: readOptionalString(process.env.POLAR_WEBHOOK_SECRET),
    polarProductLiteTemplate: readOptionalString(
      process.env.NEXT_PUBLIC_POLAR_PRODUCT_LITE_TEMPLATE,
    ),
    polarProductHostedCms: readOptionalString(
      process.env.NEXT_PUBLIC_POLAR_PRODUCT_HOSTED_CMS,
    ),
    polarProductSelfHostedCms: readOptionalString(
      process.env.NEXT_PUBLIC_POLAR_PRODUCT_SELF_HOSTED_CMS,
    ),
    brevoApiKey: readOptionalString(process.env.BREVO_API_KEY),
    brevoSenderEmail: readOptionalString(process.env.BREVO_SENDER_EMAIL),
    brevoSenderName: readOptionalString(process.env.BREVO_SENDER_NAME),
    brevoReplyToEmail: readOptionalString(process.env.BREVO_REPLY_TO_EMAIL),
  },
} as const;
