/*
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { translateText, translateTextFallback, getCurrentLanguage } from '../lib/translate';
import { useLanguage } from './LanguageContext';

interface TranslationContextType {
  translateContent: (text: string) => Promise<string>;
  isTranslating: boolean;
  currentLanguage: string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const { useGoogleTranslate } = useLanguage();
  const [isTranslating, setIsTranslating] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage());

  // Listen for language changes and update state
  useEffect(() => {
    const handleLanguageChanged = () => {
      setCurrentLanguage(getCurrentLanguage());
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  /**
   * Translate content based on current language and Google Translate setting
   */
  const translateContent = async (text: string): Promise<string> => {
    // If text is empty, language is English, or Google Translate is disabled, return the original text
    if (!text || currentLanguage === 'en' || !useGoogleTranslate) {
      return text;
    }

    setIsTranslating(true);
    
    try {
      // Try with Google Translate API first
      const apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
      let translatedText;
      
      if (apiKey) {
        translatedText = await translateText(text, currentLanguage);
      } else {
        // Fall back to free translation service if no API key
        translatedText = await translateTextFallback(text, currentLanguage);
      }
      
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    } finally {
      setIsTranslating(false);
    }
  };

  const value = {
    translateContent,
    isTranslating,
    currentLanguage
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation2 = () => {
  const context = useContext(TranslationContext);
  
  if (context === undefined) {
    throw new Error('useTranslation2 must be used within a TranslationProvider');
  }
  
  return context;
};

export default TranslationContext;
*/ 