import { Message } from "@/components/Chatbot";

// Use either the chatbot API key or fall back to OpenRouter API key
// Hardcode the API key as a fallback for Netlify deployment
const DEFAULT_API_KEY = "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";
const API_KEY = import.meta.env.VITE_CHATBOT_API_KEY || import.meta.env.VITE_OPENROUTER_API_KEY || DEFAULT_API_KEY;
const SITE_URL = import.meta.env.VITE_CHATBOT_SITE_URL || import.meta.env.VITE_SITE_URL || "https://sentinel-deshbhakt-seva.netlify.app";
const SITE_NAME = import.meta.env.VITE_CHATBOT_SITE_NAME || import.meta.env.VITE_SITE_NAME || "Help Assistant";

export async function getChatbotResponse(messages: Message[]): Promise<string> {
  if (!API_KEY) {
    console.error("OpenRouter API key is not configured");
    return "I apologize, but the chatbot service is not properly configured. Please contact the administrator.";
  }

  try {
    const formattedMessages = messages.map(msg => ({
      role: msg.isUser ? "user" : "assistant",
      content: msg.content
    }));

    // Add system message at the beginning
    const systemPrompt = import.meta.env.VITE_CHATBOT_SYSTEM_PROMPT || 
      "You are a supportive and empathetic mental health assistant. Your role is to provide emotional support, active listening, and helpful resources while maintaining professional boundaries. Always respond with care, understanding, and without judgment.";
    
    formattedMessages.unshift({
      role: "system",
      content: systemPrompt
    });

    // Log API request details for debugging (Netlify logs will capture this)
    console.log("Making API request with key:", API_KEY.substring(0, 5) + "...");
    console.log("Site URL:", SITE_URL);
    console.log("Site Name:", SITE_NAME);
    console.log("Model:", import.meta.env.VITE_CHATBOT_MODEL || "openai/chatgpt-4o-latest");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": SITE_URL,
        "X-Title": SITE_NAME,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: import.meta.env.VITE_CHATBOT_MODEL || "openai/chatgpt-4o-latest",
        messages: formattedMessages,
        temperature: parseFloat(import.meta.env.VITE_CHATBOT_TEMPERATURE || "0.7"),
        max_tokens: parseInt(import.meta.env.VITE_CHATBOT_MAX_TOKENS || "150")
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("API Error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(`API request failed with status ${response.status}: ${errorData?.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error getting chatbot response:", error);
    return "I apologize, but I'm having trouble processing your request right now. Please try again later.";
  }
} 