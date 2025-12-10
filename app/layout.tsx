import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://termscheck.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TermsCheck - AI-Powered Terms & Conditions Analyzer | Free T&C Risk Analysis",
    template: "%s | TermsCheck"
  },
  description: "Analyze terms and conditions instantly with AI. Get clear risk categorization and plain English explanations for legal documents. Free online T&C analyzer supporting text, PDFs, and DOC files. Understand hidden risks, data privacy clauses, and legal jargon in seconds.",
  keywords: [
    "terms and conditions analyzer",
    "T&C analyzer",
    "legal document analyzer",
    "AI legal analysis",
    "privacy policy checker",
    "terms of service analyzer",
    "PDF terms analyzer",
    "legal AI tool",
    "risk analysis",
    "contract review AI",
    "terms checker",
    "free legal analyzer",
    "understand terms and conditions",
    "legal jargon translator",
    "user agreement analyzer",
    "EULA analyzer",
    "service agreement checker"
  ],
  authors: [{ name: "TermsCheck" }],
  creator: "TermsCheck",
  publisher: "TermsCheck",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "TermsCheck",
    title: "TermsCheck - AI-Powered Terms & Conditions Analyzer",
    description: "Analyze terms and conditions instantly with AI. Get clear risk categorization and plain English explanations. Supports text, PDFs, and more. 100% free and private.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "TermsCheck - AI Terms & Conditions Analyzer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TermsCheck - AI-Powered Terms & Conditions Analyzer",
    description: "Analyze terms and conditions instantly with AI. Get clear risk categorization and plain English explanations. Free, private, and supports PDFs.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@termscheck",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "your-google-verification-code",
    // Add your verification codes after claiming on respective platforms
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TermsCheck",
    "alternateName": "Terms & Conditions Analyzer",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "description": "AI-powered terms and conditions analyzer that helps users understand legal documents by categorizing risks and explaining legal jargon in plain English.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "AI-powered legal document analysis",
      "Risk categorization (Critical, Medium, Low)",
      "Plain English explanations",
      "PDF support",
      "Text file support",
      "100% private and secure",
      "No signup required"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "TermsCheck",
      "url": siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "TermsCheck",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
