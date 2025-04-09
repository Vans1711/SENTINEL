import { Message } from "@/components/Chatbot";

const API_KEY = import.meta.env.VITE_CHATBOT_API_KEY;
const SITE_URL = import.meta.env.VITE_CHATBOT_SITE_URL || "http://localhost:8081";
const SITE_NAME = import.meta.env.VITE_CHATBOT_SITE_NAME || "Help Assistant";

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
    formattedMessages.unshift({
      role: "system",
      content: import.meta.env.VITE_CHATBOT_SYSTEM_PROMPT || "You are a helpful assistant."
    });

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