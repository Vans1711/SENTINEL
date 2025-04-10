/**
 * Utility to debug environment variables in browser console
 * This will be automatically called when the app starts
 * NOTE: API keys are masked for security
 */
export function debugEnvironmentVariables() {
  if (import.meta.env.DEV) {
    // Only show full debug in development mode
    console.group('Environment Variables Debug:');
    console.log('VITE_CHATBOT_API_KEY:', maskApiKey(import.meta.env.VITE_CHATBOT_API_KEY));
    console.log('VITE_OPENROUTER_API_KEY:', maskApiKey(import.meta.env.VITE_OPENROUTER_API_KEY));
    console.log('VITE_CHATBOT_MODEL:', import.meta.env.VITE_CHATBOT_MODEL);
    console.log('VITE_CHATBOT_TEMPERATURE:', import.meta.env.VITE_CHATBOT_TEMPERATURE);
    console.log('VITE_CHATBOT_MAX_TOKENS:', import.meta.env.VITE_CHATBOT_MAX_TOKENS);
    console.log('VITE_CHATBOT_SITE_URL:', import.meta.env.VITE_CHATBOT_SITE_URL);
    console.log('VITE_SITE_URL:', import.meta.env.VITE_SITE_URL);
    console.log('VITE_CHATBOT_SITE_NAME:', import.meta.env.VITE_CHATBOT_SITE_NAME);
    console.log('VITE_SITE_NAME:', import.meta.env.VITE_SITE_NAME);
    console.groupEnd();
  } else {
    // In production, just log if the key is present or not
    console.log('Environment check: OpenRouter API Key is', 
      import.meta.env.VITE_CHATBOT_API_KEY || import.meta.env.VITE_OPENROUTER_API_KEY ? 'configured' : 'missing');
  }
}

/**
 * Mask API key for security when logging
 */
function maskApiKey(key: string | undefined): string {
  if (!key) return 'undefined';
  if (key.length < 10) return '***'; // Key too short, just mask it entirely
  
  return key.substring(0, 5) + '...' + key.substring(key.length - 3);
} 