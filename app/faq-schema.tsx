export default function FAQSchema() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is TermsCheck?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TermsCheck is a free AI-powered tool that analyzes terms and conditions documents and categorizes clauses by risk level. It helps you understand legal jargon in plain English and identifies critical risks, medium concerns, and standard clauses."
        }
      },
      {
        "@type": "Question",
        "name": "How does the terms and conditions analyzer work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply upload a document (PDF, TXT, DOC) or paste text into our analyzer. Our AI will analyze the content and categorize clauses into critical risks (dangerous terms like data selling), medium risks (concerning terms like limited refunds), and low risks (standard clauses)."
        }
      },
      {
        "@type": "Question",
        "name": "What file formats does TermsCheck support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TermsCheck supports multiple file formats including PDF, TXT, DOC, and DOCX files. You can also paste text directly into the analyzer for instant analysis."
        }
      },
      {
        "@type": "Question",
        "name": "Is TermsCheck free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, TermsCheck is 100% free to use. There is no signup required, no hidden fees, and your documents remain completely private. We don't store your uploaded documents or analysis results."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data safe and private?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. TermsCheck is 100% private and secure. We don't store your uploaded documents or analysis results. Your data is processed in real-time and immediately discarded after analysis."
        }
      },
      {
        "@type": "Question",
        "name": "What types of risks does TermsCheck identify?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TermsCheck categorizes clauses into three risk levels: Critical Risks (dangerous clauses like data selling, unlimited liability, and hidden fees), Medium Risks (concerning terms like limited refunds and third-party data sharing), and Low Risks (standard, benign, industry-standard clauses)."
        }
      },
      {
        "@type": "Question",
        "name": "Can I analyze privacy policies and EULAs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! TermsCheck can analyze any legal document including terms and conditions, privacy policies, EULAs (End User License Agreements), user agreements, service agreements, and any other legal document you encounter."
        }
      },
      {
        "@type": "Question",
        "name": "How long does the analysis take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Analysis typically takes 5-15 seconds for most documents. Large documents over 5000 words may take up to 30 seconds. The AI provides instant, accurate results without the need to read through lengthy legal text."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

