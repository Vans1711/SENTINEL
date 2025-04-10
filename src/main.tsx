import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './lib/i18n'; // Initialize i18n
import { LanguageProvider } from './contexts/LanguageContext';
import React from 'react';
import { debugEnvironmentVariables } from './lib/env-debug';

// Debug environment variables on startup
debugEnvironmentVariables();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
