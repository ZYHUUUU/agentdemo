import Anthropic from '@anthropic-ai/sdk';

// Initialize Anthropic client
const getClient = () => {
  const apiKey = import.meta.env.VITE_CLAUDE_API_KEY;

  if (!apiKey || apiKey === 'your_api_key_here') {
    throw new Error('Please set your VITE_CLAUDE_API_KEY in the .env file');
  }

  return new Anthropic({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true // Note: In production, API calls should go through a backend
  });
};

/**
 * Plans a route using Claude AI
 * @param {string} userInput - Natural language input from user
 * @param {Array} availableLocations - List of all available locations
 * @returns {Promise<Array<string>>} - Array of location IDs in order
 */
export const planRouteWithClaude = async (userInput, availableLocations) => {
  try {
    const client = getClient();

    // Prepare location data for the prompt with detailed info
    const locationsList = availableLocations
      .map(loc => {
        const keywords = (loc.keywords || []).join(', ');
        return `- ID: "${loc.id}"
  Name: ${loc.name}
  Type: ${loc.type}
  Description: ${loc.description || loc.address || 'No description'}
  Distance: ${loc.distance || 'on campus'}
  Keywords: ${keywords || 'none'}`;
      })
      .join('\n\n');

    const systemPrompt = `You are an intelligent route planning assistant for NYU Tandon School of Engineering students in Brooklyn, NY (MetroTech Center area).

Your task is to CAREFULLY analyze the user's intent and create a personalized route based on their specific needs and mood.

AVAILABLE LOCATIONS:
${locationsList}

IMPORTANT SEMANTIC RULES - Match user intent to appropriate locations:

🌅 SCENIC/RELAXATION/VIEWS:
- "sunset", "view", "scenery", "看风景", "看夕阳" → Brooklyn Bridge Park (ID: 1) or Brooklyn Bridge (ID: 3)
- "relax", "放松", "散步", "walk" → Brooklyn Bridge Park (ID: 1)

🎨 CULTURE/ART/TRENDY:
- "art", "艺术", "trendy", "时尚", "逛街", "shopping" → DUMBO (ID: 2)
- "gallery", "画廊", "文化" → DUMBO (ID: 2)

☕ COFFEE/CAFES:
- "coffee", "咖啡", "提神", "cafe" → coffee1 (Starbucks) or coffee2 (Brooklyn Roasting)

🍕 FOOD SPECIFIC:
- "pizza", "披萨", "Italian", "意大利" → ID: 3 (Joe's Pizza)
- "burger", "汉堡", "American" → ID: 1 (Shake Shack)
- "Mexican", "墨西哥", "burrito" → ID: 2 (Chipotle)

🍱 GENERAL FOOD:
- "lunch", "dinner", "吃饭", "餐厅", "hungry" → Choose from restaurants (IDs: 1, 2, 3, 4, 5)

ROUTING RULES:
1. ALWAYS start from "tandon" unless explicitly stated otherwise
2. If user mentions "back", "return", "回", end at "tandon"
3. Select 2-4 locations maximum (not too many)
4. Order locations logically by proximity when possible
5. MATCH THE USER'S MOOD AND INTENT - don't give the same route for different requests!

EXAMPLE MAPPINGS (FOLLOW THESE PATTERNS):

Input: "我想去一个适合看夕阳的地方然后回学校"
Intent: Sunset viewing → scenic waterfront
Output: ["tandon", "1", "tandon"]  (Brooklyn Bridge Park for sunset)

Input: "找个地方吃午饭，最好是意大利菜"
Intent: Italian food
Output: ["tandon", "3", "tandon"]  (Joe's Pizza)

Input: "我想放松一下，散散步看看风景"
Intent: Relaxation + scenery
Output: ["tandon", "1", "tandon"]  (Brooklyn Bridge Park)

Input: "去个有艺术气息的地方逛逛"
Intent: Art/culture
Output: ["tandon", "2", "tandon"]  (DUMBO art district)

Input: "喝杯咖啡提提神，然后去最近的景点"
Intent: Coffee + nearby attraction
Output: ["tandon", "coffee1", "2", "tandon"]  (Coffee then DUMBO)

Input: "我想吃汉堡"
Intent: Burger craving
Output: ["tandon", "1", "tandon"]  (Shake Shack)

Input: "随便走走看看"
Intent: Casual exploration
Output: ["tandon", "2", "1", "tandon"]  (DUMBO + Brooklyn Bridge Park)

CRITICAL: Analyze the user's SPECIFIC intent and select the MOST RELEVANT locations. Different intents should produce DIFFERENT routes!

Return ONLY a JSON array of location IDs in route order, nothing else.`;

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      temperature: 1.0, // Add temperature for more variety
      messages: [{
        role: 'user',
        content: `User's request: "${userInput}"

Analyze the user's intent carefully and plan a route that matches their specific needs. Return ONLY a JSON array of location IDs.`
      }],
      system: systemPrompt
    });

    // Extract the response text
    const responseText = response.content[0].text.trim();

    console.log('AI Response:', responseText); // Debug log

    // Try to extract JSON from the response
    let locationIds;
    try {
      // Try to parse directly
      locationIds = JSON.parse(responseText);
    } catch (e) {
      // Try to extract JSON from markdown code blocks
      const jsonMatch = responseText.match(/\[[\s\S]*?\]/);
      if (jsonMatch) {
        locationIds = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Could not parse location IDs from response');
      }
    }

    if (!Array.isArray(locationIds)) {
      throw new Error('Response is not an array');
    }

    console.log('Parsed location IDs:', locationIds); // Debug log

    return locationIds;

  } catch (error) {
    console.error('Claude API Error:', error);
    throw error;
  }
};
