import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

// Group languages by region to make the dropdown more organized
const languageGroups = {
  "North Indian": ['hi', 'ur', 'pa', 'ks', 'doi', 'sd', 'ne', 'sa'],
  "East Indian": ['bn', 'or', 'as', 'mni', 'sat'],
  "South Indian": ['ta', 'te', 'ml', 'kn'],
  "West Indian": ['gu', 'mr', 'ko'],
  "Central Indian": ['bho', 'mag', 'mai'],
  "Other": ['en', 'si']
};

const LanguageSelector = () => {
  const { currentLanguage, setLanguage, languages } = useLanguage();
  const { t } = useTranslation();

  // Function to find which group a language belongs to
  const getLanguageGroup = (langCode: string) => {
    for (const [group, codes] of Object.entries(languageGroups)) {
      if (codes.includes(langCode)) {
        return group;
      }
    }
    return "Other";
  };

  // Group languages for the dropdown
  const groupedLanguages = languages.reduce<Record<string, typeof languages>>((acc, lang) => {
    const group = getLanguageGroup(lang.code);
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(lang);
    return acc;
  }, {});

  // Handle language change
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  return (
    <Select value={currentLanguage.code} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[180px] bg-navy/40 border-military focus:ring-saffron">
        <SelectValue placeholder={t('Select Language')} />
      </SelectTrigger>
      <SelectContent className="max-h-[400px] bg-navy border-military">
        {Object.entries(groupedLanguages).map(([group, langs]) => (
          <SelectGroup key={group}>
            <div className="px-2 py-1.5 text-xs font-semibold text-saffron">{group}</div>
            {langs.map((lang) => (
              <SelectItem key={lang.code} value={lang.code} className="text-white hover:bg-military/20">
                <div className="flex items-center">
                  <span>{lang.nativeName}</span>
                  <span className="ml-1 text-xs text-white/60">({lang.name})</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector; 