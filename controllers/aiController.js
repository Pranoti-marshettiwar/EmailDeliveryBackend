import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

console.log("Loaded API Key:", process.env.OPENAI_API_KEY);

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateSuggestions(req, res) {
  const { campaignDescription } = req.body;

  if (!campaignDescription) {
    return res.status(400).json({ error: "Campaign description is required." });
  }

  try {
    // Call OpenAI API to generate suggestions
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct", // Ensure the model name matches your OpenAI subscription
      prompt: `
Generate email content for the following campaign:
Campaign Description: ${campaignDescription}
1. Subject Line:
2. Email Body:
      `,
      max_tokens: 200,
      temperature: 0.7,
    });

    // Extract and return suggestions
    const suggestions = response.choices[0]?.text?.trim() || "No suggestions available.";
    res.status(200).json({ suggestions });
  } catch (error) {
    console.error("Error generating suggestions:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate suggestions." });
  }
}

export default { generateSuggestions };
