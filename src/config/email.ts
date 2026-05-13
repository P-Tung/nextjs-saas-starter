import { siteConfig } from "@/config/site";

export interface EmailTemplateCta {
  label: string;
  href: string;
}

export interface EmailTemplate {
  subject: string;
  previewText?: string;
  heading: string;
  bodyParagraphs: readonly string[];
  cta?: EmailTemplateCta;
}

export const emailConfig = {
  templates: {
    signupWelcome: {
      subject: `Welcome to ${siteConfig.name}`,
      previewText: "Your account is ready, you can start building now.",
      heading: `Thanks for signing up for ${siteConfig.name}`,
      bodyParagraphs: [
        "Your account has been created successfully.",
        "You can now access your dashboard and start customizing the template for your product.",
      ],
      cta: {
        label: "Open Dashboard",
        href: `${siteConfig.url}/dashboard`,
      },
    },
    waitlistOptIn: {
      subject: `You joined the ${siteConfig.name} waitlist`,
      previewText: "Thanks for joining, we will notify you with updates.",
      heading: "Thanks for joining the waitlist",
      bodyParagraphs: [
        `We received your waitlist request for ${siteConfig.name}.`,
        "We will reach out with product updates and early access details.",
      ],
      cta: {
        label: "Visit Website",
        href: siteConfig.url,
      },
    },
  },
} as const satisfies {
  templates: {
    signupWelcome: EmailTemplate;
    waitlistOptIn: EmailTemplate;
  };
};
