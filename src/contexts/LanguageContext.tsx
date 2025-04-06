import React, { createContext, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Language interface
interface Language {
  code: string;
  name: string;
  nativeName: string;
}

// Available languages
export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'कॉशुर' },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली' },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල' },
  { code: 'ko', name: 'Konkani', nativeName: 'कोंकणी' },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी' },
  { code: 'mni', name: 'Manipuri', nativeName: 'মণিপুরী' },
  { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱞᱤ' },
  { code: 'bho', name: 'Bhojpuri', nativeName: 'भोजपुरी' },
  { code: 'mag', name: 'Magahi', nativeName: 'मगही' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली' },
];

// Interface for the Language Context
interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (langCode: string) => void;
  languages: Language[];
}

// Creating the Language Context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language Provider Component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    // Get the current language from i18n, defaulting to English
    const currentLangCode = i18n.language || 'en';
    return languages.find(lang => lang.code === currentLangCode) || languages[0];
  });

  // Function to change the language
  const setLanguage = (langCode: string) => {
    const newLang = languages.find(lang => lang.code === langCode);
    if (newLang) {
      i18n.changeLanguage(langCode);
      setCurrentLanguage(newLang);
      document.documentElement.lang = langCode;
      document.documentElement.dir = langCode === 'ur' || langCode === 'sd' ? 'rtl' : 'ltr';
    }
  };

  // Listen for language changes
  useEffect(() => {
    const currentLangCode = i18n.language;
    const newLang = languages.find(lang => lang.code === currentLangCode);
    if (newLang && newLang.code !== currentLanguage.code) {
      setCurrentLanguage(newLang);
      document.documentElement.lang = currentLangCode;
      document.documentElement.dir = currentLangCode === 'ur' || currentLangCode === 'sd' ? 'rtl' : 'ltr';
    }
  }, [i18n.language, currentLanguage.code]);

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      setLanguage, 
      languages
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the Language Context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext; 