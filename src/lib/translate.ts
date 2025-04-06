/* 
import i18n from './i18n';
import { languages } from '../contexts/LanguageContext';

// Define supported languages for translation
const supportedLanguages = languages.map(lang => lang.code);

/**
 * Translate text using Google Translate API
 * @param text Text to translate
 * @param targetLang Target language code
 * @returns Promise with translated text
 */
export const translateText = async (text: string, targetLang: string = 'hi'): Promise<string> => {
  // If target language is English or not supported, return original text
  if (targetLang === 'en' || !supportedLanguages.includes(targetLang)) {
    return text;
  }

  try {
    // Using Google Translate API
    const url = `https://translation.googleapis.com/language/translate/v2?key=${import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        target: targetLang,
        source: 'en',
        format: 'text'
      }),
    });

    const data = await response.json();
    
    if (data.data && data.data.translations && data.data.translations[0]) {
      return data.data.translations[0].translatedText;
    }
    
    return text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
};

/**
 * Fallback translate function that uses a proxy approach if API key is not available
 * This is a fallback option and has limitations
 */
export const translateTextFallback = async (text: string, targetLang: string = 'hi'): Promise<string> => {
  // If target language is English or not supported, return original text
  if (targetLang === 'en' || !supportedLanguages.includes(targetLang)) {
    return text;
  }

  try {
    // Using a free translation service (LibreTranslate)
    const url = 'https://libretranslate.com/translate';
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: targetLang,
        format: 'text'
      }),
    });

    const data = await response.json();
    
    if (data.translatedText) {
      return data.translatedText;
    }
    
    return text;
  } catch (error) {
    console.error('Translation fallback error:', error);
    return text;
  }
};

/**
 * Translate an object's string values
 * @param obj Object with string values to translate
 * @param targetLang Target language code
 * @returns Promise with object containing translated values
 */
export const translateObject = async <T extends Record<string, any>>(
  obj: T, 
  targetLang: string = 'hi'
): Promise<T> => {
  // If target language is English, return original object
  if (targetLang === 'en') {
    return obj;
  }

  const translatedObj = { ...obj };
  
  for (const key in translatedObj) {
    if (typeof translatedObj[key] === 'string') {
      // Only translate string values
      translatedObj[key] = await translateText(translatedObj[key], targetLang);
    } else if (typeof translatedObj[key] === 'object' && translatedObj[key] !== null) {
      // Recursively translate nested objects
      translatedObj[key] = await translateObject(translatedObj[key], targetLang);
    }
  }
  
  return translatedObj;
};

/**
 * Get the current language from i18n
 * @returns Current language code
 */
export const getCurrentLanguage = (): string => {
  return i18n.language || 'en';
};

/**
 * Check if the current language is Hindi
 * @returns True if current language is Hindi
 */
export const isHindi = (): boolean => {
  return getCurrentLanguage() === 'hi';
};

export default {
  translateText,
  translateTextFallback,
  translateObject,
  getCurrentLanguage,
  isHindi
}; 
*/ 