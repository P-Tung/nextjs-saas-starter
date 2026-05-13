import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { StructuredData } from "@/components/seo/structured-data";
import { AuthProvider } from "@/contexts/auth-context";
import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";
import {
  createOrganizationSchema,
  createSoftwareApplicationSchema,
  createWebsiteSchema,
} from "@/lib/structured-data";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  ...createMetadata(),
  metadataBase: new URL(siteConfig.url),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [
    createOrganizationSchema(),
    createWebsiteSchema(),
    createSoftwareApplicationSchema(),
  ];

  return (
    <html lang={siteConfig.language} data-theme="light" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" type="image/png" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#ffd600" />
        {siteConfig.seo.googleSiteVerification ? (
          <meta
            name="google-site-verification"
            content={siteConfig.seo.googleSiteVerification}
          />
        ) : null}
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
        suppressHydrationWarning
      >
        <StructuredData id="root-schema" data={structuredData} />
        <AuthProvider>
          <AnalyticsProvider>
            <div className="min-h-screen bg-base-100 text-base-content">
              <SiteHeader />
              <main>{children}</main>
              <SiteFooter />
            </div>
          </AnalyticsProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
