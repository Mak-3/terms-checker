import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  const prompt = `You are an expert legal analyst specializing in terms and conditions analysis.

Analyze the following terms and conditions text and categorize ALL important clauses into three risk levels: CRITICAL, MEDIUM, and LOW.

For each clause you identify, provide:
- term: A brief title for the clause (3-5 words)
- meaning: A clear explanation of what this clause means for the user (1-2 sentences)
- example: A practical example of how this could affect the user (1 sentence)

Categories:
- CRITICAL: Clauses that pose significant risks, legal liabilities, or major limitations (e.g., data selling, unlimited liability, irrevocable rights transfer, automatic renewals with penalties)
- MEDIUM: Clauses that are concerning but not immediately dangerous (e.g., data sharing with partners, limited refund windows, mandatory arbitration)
- LOW: Standard clauses that are relatively benign or industry-standard (e.g., cookie usage, service updates, standard privacy practices)

You MUST respond ONLY with valid JSON in this exact format (no other text before or after):
{
  "critical": [
    {
      "term": "string",
      "meaning": "string",
      "example": "string"
    }
  ],
  "medium": [
    {
      "term": "string",
      "meaning": "string",
      "example": "string"
    }
  ],
  "low": [
    {
      "term": "string",
      "meaning": "string",
      "example": "string"
    }
  ]
}

Terms and Conditions Text:
${text}

Remember: Respond ONLY with the JSON object, nothing else.`;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer":
            process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
          "X-Title": "TermsCheck - AI Terms Analyzer",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "nvidia/nemotron-nano-12b-v2-vl:free", // Very cheap: ~$0.001 per analysis
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenRouter API Error:", errorData);
      throw new Error(
        `OpenRouter API returned ${response.status}: ${
          errorData.error?.message || "Unknown error"
        }`
      );
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content || "";

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      console.error("JSON Parse Error:", e, "Raw response:", raw);
      parsed = {
        critical: [
          {
            term: "Parsing Error",
            meaning: "The AI response could not be parsed. Please try again.",
            example: "This may happen if the text is too complex or malformed.",
          },
        ],
        medium: [],
        low: [],
      };
    }

    return NextResponse.json({
      success: true,
      analysis: parsed,
    });
  } catch (e) {
    console.error("API Error:", e);
    const errorMessage =
      e instanceof Error
        ? e.message
        : "Failed to analyze terms and conditions. Please check your API key.";
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
