import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API Route: Health Check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // API Route: AI Meal Recommendation & Craving Assistant
  app.post('/api/ai/recommend', async (req, res) => {
    try {
      const { query, availableDishes, dietaryRestrictions, maxBudget } = req.body;

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({
          error: 'Gemini API key is missing. Please add GEMINI_API_KEY in Secrets.',
        });
      }

      const prompt = `
You are an expert culinary concierge and nutritionist for a high-end food delivery app.
Analyze the user's craving/request and select the best matching 1 to 3 dishes from the provided available dishes list.

User Request: "${query || 'Suggest something delicious for dinner'}"
Dietary Restrictions / Preferences: ${dietaryRestrictions ? dietaryRestrictions.join(', ') : 'None'}
Max Budget per item: ${maxBudget ? `$${maxBudget}` : 'Flexible'}

Available Dishes Database:
${JSON.stringify(availableDishes || [], null, 2)}

Instructions:
1. Select 1 to 3 dish IDs from the list that best match the craving and restrictions.
2. Provide a short, mouth-watering explanation for why these dishes fit best.
3. Include concise nutritional advice or highlight (e.g. "High protein energy boost", "Balanced low-carb option").
4. Suggest a complementary pairing idea (e.g. "Pairs perfectly with an iced mango tea").
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are an enthusiastic food sommelier and nutrition expert. Return structured JSON strictly adhering to the schema.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendedDishIds: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'List of matching dish IDs from the available list',
              },
              reasoning: {
                type: Type.STRING,
                description: 'A 2-3 sentence appetizing explanation',
              },
              nutritionHighlights: {
                type: Type.STRING,
                description: 'Key dietary or macro benefits',
              },
              suggestedPairings: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Suggested side items or drink pairings',
              },
            },
            required: ['recommendedDishIds', 'reasoning', 'nutritionHighlights'],
          },
        },
      });

      const resultText = response.text || '{}';
      const parsedData = JSON.parse(resultText);

      return res.json({ success: true, data: parsedData });
    } catch (err: any) {
      console.error('Error calling Gemini AI:', err);
      return res.status(500).json({
        error: 'Failed to generate recommendations.',
        details: err?.message || 'Unknown error',
      });
    }
  });

  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Food Ordering App Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
