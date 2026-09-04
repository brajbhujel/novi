import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Novi | Run your team without the tab switching",
    template: "%s | Novi",
  },
  description:
    "Novi brings tasks, docs, and conversations into one calm workspace built for small, fast moving teams.",
  applicationName: "Novi",
  keywords: [
    "project management",
    "task management",
    "team workspace",
    "startup tools",
    "Novi",
  ],
  authors: [{ name: "Novi" }],
  creator: "Novi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Novi",
    title: "Novi | Run your team without the tab switching",
    description:
      "Tasks, docs, and conversations in one calm workspace for small, fast moving teams.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Novi | Run your team without the tab switching",
    description:
      "Tasks, docs, and conversations in one calm workspace for small, fast moving teams.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#5b4dff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Novi",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Project and task management for small, fast moving teams. Tasks, docs, and conversations in one calm workspace.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
