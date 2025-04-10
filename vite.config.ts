import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    define: {
      // Explicitly set environment variables to make them available at runtime
      'import.meta.env.VITE_CHATBOT_API_KEY': JSON.stringify(env.VITE_CHATBOT_API_KEY || ''),
      'import.meta.env.VITE_OPENROUTER_API_KEY': JSON.stringify(env.VITE_OPENROUTER_API_KEY || ''),
      'import.meta.env.VITE_CHATBOT_MODEL': JSON.stringify(env.VITE_CHATBOT_MODEL || 'openai/chatgpt-4o-latest'),
      'import.meta.env.VITE_CHATBOT_TEMPERATURE': JSON.stringify(env.VITE_CHATBOT_TEMPERATURE || '0.7'),
      'import.meta.env.VITE_CHATBOT_MAX_TOKENS': JSON.stringify(env.VITE_CHATBOT_MAX_TOKENS || '150'),
      'import.meta.env.VITE_CHATBOT_SITE_URL': JSON.stringify(env.VITE_CHATBOT_SITE_URL || 'https://sentinel-deshbhakt-seva.netlify.app'),
      'import.meta.env.VITE_SITE_URL': JSON.stringify(env.VITE_SITE_URL || 'https://sentinel-deshbhakt-seva.netlify.app'),
      'import.meta.env.VITE_CHATBOT_SITE_NAME': JSON.stringify(env.VITE_CHATBOT_SITE_NAME || 'Help Assistant'),
      'import.meta.env.VITE_SITE_NAME': JSON.stringify(env.VITE_SITE_NAME || 'Help Assistant'),
      'import.meta.env.VITE_CHATBOT_SYSTEM_PROMPT': JSON.stringify(env.VITE_CHATBOT_SYSTEM_PROMPT || 'You are a helpful assistant.')
    },
    server: {
      host: true,
      port: 8080,
    },
    plugins: [
      react(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "dist",
      sourcemap: true,
    },
  };
});
