# AI Route Planner Setup Guide 🤖

This project includes an AI-powered route planner that uses Claude API to understand natural language and intelligently plan routes.

## 🔑 Setup API Key

### Step 1: Get Your Anthropic API Key

1. Visit [Anthropic Console](https://console.anthropic.com/settings/keys)
2. Sign up or log in to your account
3. Create a new API key
4. Copy the key (it starts with `sk-ant-`)

### Step 2: Configure Environment Variables

1. Open the `.env` file in the project root:
   ```bash
   cd ~/Desktop/projectB
   open .env
   ```

2. Replace `your_api_key_here` with your actual API key:
   ```env
   VITE_CLAUDE_API_KEY=sk-ant-api03-...your-actual-key
   ```

3. Save the file

### Step 3: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

## 🎯 How It Works

The AI Route Planner uses:
- **Model**: Claude 3.5 Haiku (fast and efficient)
- **Purpose**: Semantic understanding of natural language queries
- **Output**: Structured JSON array of location IDs

### Example Queries

Instead of keyword matching, the AI understands intent:

✅ **"我想去一个适合看夕阳的地方然后回学校"**
- AI understands: sunset → waterfront → Brooklyn Bridge Park

✅ **"找个地方放松一下"**
- AI suggests: parks, waterfront areas

✅ **"去个有艺术气息的地方"**
- AI recommends: DUMBO (art galleries)

✅ **"意大利菜"**
- AI finds: Joe's Pizza

## 🔒 Security Notes

⚠️ **Important**: The `.env` file is already in `.gitignore` and will NOT be committed to GitHub.

⚠️ **Browser-side API calls**: Currently, API calls are made directly from the browser using `dangerouslyAllowBrowser: true`. This is OK for development and demo purposes, but for production:

- Consider using a backend proxy
- Use environment-specific keys
- Implement rate limiting

## 💡 Features

- **Loading states**: Shows "AI Agent 正在思考..." during processing
- **Error handling**: User-friendly error messages with troubleshooting links
- **Fallback**: If API fails, clear error messages guide users
- **Smart parsing**: Extracts JSON from various response formats

## 🐛 Troubleshooting

### Error: "Please set your VITE_CLAUDE_API_KEY"
- Make sure you've edited the `.env` file
- Restart the dev server after changing `.env`

### Error: "Network error"
- Check your internet connection
- Verify your API key is valid
- Check if you have API credits remaining

### AI doesn't understand the query
- Try being more specific
- Use keywords like: 咖啡 (coffee), 风景 (scenery), 艺术 (art)
- Check the example prompts for inspiration

## 📊 API Usage

- Each route planning request costs ~$0.001-0.002
- Uses Claude 3.5 Haiku for cost efficiency
- Typical response time: 1-3 seconds

## 🚀 Next Steps

To make this production-ready:

1. Create a backend API endpoint:
   ```javascript
   // api/plan-route.js
   export default async function handler(req, res) {
     const apiKey = process.env.CLAUDE_API_KEY; // Server-side only
     // ... call Claude API
   }
   ```

2. Update frontend to call your backend:
   ```javascript
   const response = await fetch('/api/plan-route', {
     method: 'POST',
     body: JSON.stringify({ input: userInput })
   });
   ```

3. Deploy with environment variables:
   - Vercel: Add to project settings
   - Netlify: Add to site settings
   - Railway: Add to environment variables

---

**Need help?** Check the [Anthropic API Documentation](https://docs.anthropic.com/)
