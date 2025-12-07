# 🚀 Quick Setup Guide

## Step 1: Get Your OpenRouter API Key (2 minutes)

1. Visit: **https://openrouter.ai/keys**
2. Sign up with Google or GitHub (free & instant)
3. Click **"Create Key"**
4. Name it: `TermsCheck`
5. Copy your API key (starts with `sk-or-v1-...`)
6. Add **$5 credit** to your account (gets you ~500 analyses with free models)

---

## Step 2: Setup Environment Variables (1 minute)

Create a `.env.local` file in the project root:

```bash
cd /Users/abdullahk_500335/Desktop/termscheck
touch .env.local
```

Add this content to `.env.local`:

```env
OPENROUTER_API_KEY=sk-or-v1-YOUR_ACTUAL_KEY_HERE
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Important**: Replace `YOUR_ACTUAL_KEY_HERE` with your real API key!

---

## Step 3: Install Dependencies (1 minute)

```bash
npm install
```

---

## Step 4: Start the App (30 seconds)

```bash
npm run dev
```

Open your browser: **http://localhost:3000** 🎉

---

## ✅ Test It Out

1. Click **"Try Analyzer"**
2. Upload a PDF or paste some sample text:

```
By using our service, you agree that we may sell your data to third parties 
for marketing purposes. You grant us unlimited liability protection. 
All sales are final with no refunds under any circumstances.
```

3. Click **"Analyze Terms & Conditions"**
4. Wait 5-10 seconds
5. See the AI-powered analysis! 🤖

---

## 🎨 What You Should See

- 🔴 **Critical risks** flagged in red (like data selling)
- 🟠 **Medium concerns** in orange (like no refunds)
- 🟢 **Standard clauses** in green
- Click any item to see detailed explanations

---

## 🐛 Troubleshooting

### Error: "Failed to analyze"
**Fix:** Check your `.env.local` file:
- Make sure the API key is correct
- Ensure there are no extra spaces
- Restart the dev server: `Ctrl+C` then `npm run dev`

### Error: "API returned 500"
**Fix:** Verify your OpenRouter account:
- Visit: https://openrouter.ai/account
- Check you have credits ($5 minimum)
- Check your API key is active

### Error: "Module not found"
**Fix:** Reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📦 Deploy to Production

Ready to make it live? See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for:
- ✅ Vercel (recommended - 1-click deploy)
- ✅ Netlify
- ✅ Railway
- ✅ Self-hosting

---

## 💰 Cost Breakdown

| Item | Cost | What You Get |
|------|------|--------------|
| **Hosting** | FREE | Vercel free tier (perfect for this) |
| **OpenRouter** | $5 | ~500 analyses with free models |
| **Total** | **$5** | Everything you need to start! |

**Pro tip:** The free Llama 3.1 8B model is great for testing. For production, upgrade to the paid Llama 3.1 70B (~$0.01/analysis) for better accuracy!

---

## 🔧 Advanced Configuration

### Change AI Model

Edit `app/api/analyzeTermsAndConditions/route.ts` line 61:

```typescript
// Current (FREE):
model: "meta-llama/llama-3.1-8b-instruct:free"

// Upgrade to Llama 70B (BEST VALUE - ~$0.01/analysis):
model: "meta-llama/llama-3.1-70b-instruct"

// Premium options:
model: "anthropic/claude-3.5-sonnet"  // Best accuracy
model: "openai/gpt-4-turbo"           // Also excellent
```

View all models: https://openrouter.ai/models

### Adjust Analysis Behavior

Edit the prompt in `route.ts` to:
- Focus on specific risks
- Add more categories
- Change output format
- Adjust tone/style

---

## 📚 Next Steps

1. ✅ **Test locally** with sample documents
2. ✅ **Customize** the UI colors/branding
3. ✅ **Deploy** to Vercel (see DEPLOYMENT.md)
4. ✅ **Share** your site with friends!

---

## 🆘 Need Help?

- **OpenRouter Docs**: https://openrouter.ai/docs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Issues**: Open an issue on this repo

---

**You're all set! 🎉**

Enjoy your AI-powered Terms & Conditions analyzer!

