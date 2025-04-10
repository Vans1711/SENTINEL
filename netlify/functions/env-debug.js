// This function will help debug environment variables
exports.handler = async function(event, context) {
  // Don't expose the actual API keys in responses, just check if they exist
  const envStatus = {
    VITE_CHATBOT_API_KEY: process.env.VITE_CHATBOT_API_KEY ? "Set (hidden for security)" : "Not set",
    VITE_OPENROUTER_API_KEY: process.env.VITE_OPENROUTER_API_KEY ? "Set (hidden for security)" : "Not set",
    VITE_CHATBOT_MODEL: process.env.VITE_CHATBOT_MODEL,
    VITE_CHATBOT_TEMPERATURE: process.env.VITE_CHATBOT_TEMPERATURE,
    VITE_CHATBOT_MAX_TOKENS: process.env.VITE_CHATBOT_MAX_TOKENS,
    VITE_CHATBOT_SITE_URL: process.env.VITE_CHATBOT_SITE_URL,
    VITE_SITE_URL: process.env.VITE_SITE_URL,
    VITE_CHATBOT_SITE_NAME: process.env.VITE_CHATBOT_SITE_NAME,
    VITE_SITE_NAME: process.env.VITE_SITE_NAME,
    NODE_VERSION: process.env.NODE_VERSION
  };

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
      message: "Environment variables status",
      environmentVariables: envStatus
    })
  };
}; 