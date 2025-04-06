/*
import React, { useState, useEffect } from 'react';
import { useTranslation2 } from '../contexts/TranslationContext';

interface TranslatedTextProps {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  html?: boolean;
  cache?: boolean;
}

// Cache for storing translated texts to avoid repeated API calls
const translationCache: Record<string, Record<string, string>> = {};

const TranslatedText: React.FC<TranslatedTextProps> = ({
  text,
  className = '',
  as = 'span',
  html = false,
  cache = true
}) => {
  const { translateContent, currentLanguage } = useTranslation2();
  const [translatedText, setTranslatedText] = useState<string>(text);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    const translateText = async () => {
      if (currentLanguage === 'en') {
        setTranslatedText(text);
        return;
      }
      
      // Check cache first if caching is enabled
      if (cache && translationCache[currentLanguage]?.[text]) {
        setTranslatedText(translationCache[currentLanguage][text]);
        return;
      }
      
      setIsLoading(true);
      try {
        const result = await translateContent(text);
        setTranslatedText(result);
        
        // Store in cache if caching is enabled
        if (cache) {
          if (!translationCache[currentLanguage]) {
            translationCache[currentLanguage] = {};
          }
          translationCache[currentLanguage][text] = result;
        }
      } catch (error) {
        console.error('Error translating text:', error);
        setTranslatedText(text); // Fallback to original text on error
      } finally {
        setIsLoading(false);
      }
    };
    
    translateText();
  }, [text, currentLanguage, translateContent, cache]);
  
  const Tag = as as React.ElementType;
  
  if (isLoading) {
    return <Tag className={`${className} opacity-50`}>{text}</Tag>;
  }
  
  if (html) {
    return <Tag className={className} dangerouslySetInnerHTML={{ __html: translatedText }} />;
  }
  
  return <Tag className={className}>{translatedText}</Tag>;
};

export default TranslatedText;
*/ 