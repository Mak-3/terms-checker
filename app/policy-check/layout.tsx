import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Terms & Conditions Analyzer | AI-Powered T&C Analysis Tool",
  description: "Upload or paste any terms and conditions document for instant AI analysis. Identify critical risks, understand legal jargon, and protect your rights. Supports PDF, TXT, DOC files. 100% free and private.",
  keywords: [
    "terms analyzer",
    "analyze terms and conditions",
    "T&C checker",
    "legal document analysis",
    "PDF terms analyzer",
    "free terms checker",
    "privacy policy analyzer",
    "EULA checker",
    "user agreement analyzer"
  ],
  openGraph: {
    title: "Free Terms & Conditions Analyzer - AI Analysis Tool",
    description: "Upload or paste terms and conditions for instant AI-powered risk analysis. Free, private, and supports PDFs.",
  },
  alternates: {
    canonical: "/policy-check",
  },
};

export default function PolicyCheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

