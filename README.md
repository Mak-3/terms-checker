# TermsCheck - Terms & Conditions Analyzer

An AI-powered web application that analyzes terms and conditions documents and categorizes clauses by risk level. Built with Next.js and powered by OpenRouter AI for fast, accurate analysis.

## Features

- 📄 **Document Upload**: Support for PDFs, text files (.txt, .doc, .docx)
- 📝 **Text Input**: Paste terms and conditions directly
- 🎯 **Risk Categorization**: Automatically categorizes clauses into:
  - 🔴 **Critical Risk**: Dangerous clauses (data selling, unlimited liability, etc.)
  - 🟠 **Medium Risk**: Concerning terms (limited refunds, mandatory arbitration, etc.)
  - 🟢 **Low Risk**: Standard, benign clauses
- 💡 **Plain English Explanations**: Each clause includes meaning and practical examples
- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations
- 🚀 **Fast Analysis**: Powered by OpenRouter's high-performance models
- 🤖 **Multiple AI Models**: Access to GPT-4, Claude, Llama, and more

## Prerequisites

1. **Node.js**: Version 18 or higher
2. **OpenRouter API Key**: Free to get started

### Getting an OpenRouter API Key

1. Visit [https://openrouter.ai/keys](https://openrouter.ai/keys)
2. Sign up with Google/GitHub (free)
3. Click "Create Key" and name it "TermsCheck"
4. Copy your API key (starts with `sk-or-v1-...`)
5. Add $5 credit to get started (~500k tokens with free models)

## Getting Started

1. **Clone the repository** (if you haven't already):
```bash
git clone <your-repo-url>
cd termscheck
```

2. **Install dependencies**:
```bash
npm install
```

3. **Create environment file**:
```bash
# Create .env.local file
touch .env.local
```

Add your API key to `.env.local`:
```env
OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Start the development server**:
```bash
npm run dev
```

5. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. Go to the homepage and click "Try Analyzer" or navigate to `/policy-check`
2. Upload a document or paste text:
   - **Upload**: PDF, TXT, DOC, or DOCX files
   - **Paste**: Copy/paste terms and conditions text directly
3. Click "Analyze Terms & Conditions"
4. Wait for AI analysis (usually 5-15 seconds)
5. Review the categorized results:
   - Click any item to expand and see detailed explanations
   - 🔴 Red sections = Critical risks to watch out for
   - 🟠 Orange sections = Medium concerns to be aware of
   - 🟢 Green sections = Standard, acceptable clauses

## Sample Test Document

A sample terms and conditions document (`sample-terms.txt`) is included in the project root for testing.

## Project Structure

```
termscheck/
├── app/
│   ├── api/
│   │   └── analyzeTermsAndConditions/
│   │       └── route.ts           # API endpoint for analysis
│   ├── policy-check/
│   │   └── page.tsx               # Main analyzer page
│   ├── page.tsx                   # Homepage
│   ├── layout.tsx                 # Root layout
│   └── globals.css                # Global styles
├── sample-terms.txt               # Sample T&C document
└── README.md                      # This file
```

## How It Works

1. **Input Processing**: User uploads a document (PDF/TXT/DOC) or pastes text
2. **PDF Extraction**: If PDF, text is extracted using pdfjs-dist
3. **API Request**: Text is sent to `/api/analyzeTermsAndConditions`
4. **AI Analysis**: OpenRouter's Llama 3.1 70B model analyzes the text
5. **Categorization**: AI returns structured JSON with:
   - Category (critical, medium, low)
   - Term name
   - Plain English meaning
   - Practical example
6. **Display**: Results rendered in beautiful, color-coded, expandable sections

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **AI Provider**: OpenRouter (Llama 3.1 70B Instruct)
- **PDF Processing**: pdfjs-dist
- **API**: Next.js API Routes
- **Deployment**: Vercel-ready

## Configuration

### Environment Variables

Create a `.env.local` file with:

```env
# Required: Your OpenRouter API key
OPENROUTER_API_KEY=sk-or-v1-your-key-here

# Optional: Your site URL (for analytics)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Changing AI Models

The app uses `meta-llama/llama-3.1-8b-instruct:free` by default (FREE model).

To use a different model, edit `app/api/analyzeTermsAndConditions/route.ts` line 61:

**Free Models:**
- `meta-llama/llama-3.1-8b-instruct:free` (Current, FREE)
- `google/gemma-2-9b-it:free` (Alternative free option)
- `qwen/qwen-2-7b-instruct:free` (Another free option)

**Recommended Paid Models (better accuracy):**
- `meta-llama/llama-3.1-70b-instruct` (~$0.50 per 1M tokens) - Great value!
- `anthropic/claude-3.5-sonnet` - Best for complex analysis
- `openai/gpt-4-turbo` - Very accurate
- `google/gemini-pro-1.5` - Good balance

See all models: [https://openrouter.ai/models](https://openrouter.ai/models)

## Troubleshooting

### "Failed to connect to the analyzer"
- **Check API Key**: Ensure `OPENROUTER_API_KEY` is set in `.env.local`
- **Check Credits**: Visit [OpenRouter account](https://openrouter.ai/account) to verify you have credits
- **Check Internet**: OpenRouter requires an internet connection
- **Check Console**: Look for error messages in browser dev tools (F12)

### API returns 500 errors
```bash
# Test your API key
curl https://openrouter.ai/api/v1/models \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

### PDF upload not working
- **File size**: Maximum ~10MB
- **File format**: Ensure it's a valid PDF
- **Text-based**: PDF must contain text (not just images)

### Parsing errors
- The AI occasionally returns unexpected formats
- Try re-running the analysis
- Consider using a premium model for better consistency

### Slow analysis
- Free models: 5-15 seconds typically
- Large documents (>5000 words): May take 30+ seconds
- Solution: Upgrade to a faster premium model

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy to Vercel:**
1. Push to GitHub
2. Import to Vercel: [https://vercel.com/new](https://vercel.com/new)
3. Add `OPENROUTER_API_KEY` environment variable
4. Deploy! 🚀

## Cost Estimation

- **Hosting**: FREE on Vercel
- **OpenRouter API**: 
  - Free models: $0 (Llama 3.1 8B) - Current default
  - Paid Llama 70B: ~$0.01 per analysis (~100 analyses for $1)
  - Premium models: $0.02-$0.10 per analysis

**Recommended**: Start FREE, then upgrade to Llama 70B paid ($0.50/1M tokens) for better results!

**Total**: Can run for FREE or add $5 for ~500 analyses with better models!

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Support

- **OpenRouter Issues**: [OpenRouter Discord](https://discord.gg/openrouter)
- **Bug Reports**: Open a GitHub issue
- **Questions**: Check [DEPLOYMENT.md](./DEPLOYMENT.md) for FAQs
