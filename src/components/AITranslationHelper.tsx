import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Globe, CornerDownLeft, Copy, Check, RefreshCcw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

// Mock translation function - In a real implementation, this would call an external AI translation API
// like Google Translate, Microsoft Translator, or a custom backend service
const mockTranslateText = async (text: string, targetLang: string): Promise<string> => {
  // Simulating API latency
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // This is a mock implementation - in production, replace with actual API calls
  // Simple mock responses for Hindi only to demonstrate functionality
  if (targetLang === 'hi' && text.toLowerCase().includes('hello')) {
    return 'नमस्ते';
  } else if (targetLang === 'hi' && text.toLowerCase().includes('thank you')) {
    return 'धन्यवाद';
  } else if (targetLang === 'hi' && text.toLowerCase().includes('help')) {
    return 'मदद';
  } else if (targetLang === 'hi') {
    return text + ' (हिंदी में अनुवादित)';
  }
  
  // For other languages, just append a note (in production, use actual translation API)
  return `${text} (Translated to ${targetLang})`;
};

const AITranslationHelper: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const { languages } = useLanguage();
  const { t } = useTranslation();

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError('Please enter text to translate');
      return;
    }
    
    if (!targetLanguage) {
      setError('Please select a target language');
      return;
    }
    
    setError('');
    setIsTranslating(true);
    
    try {
      const translated = await mockTranslateText(inputText, targetLanguage);
      setTranslatedText(translated);
    } catch (err) {
      setError('Translation failed. Please try again.');
      console.error(err);
    } finally {
      setIsTranslating(false);
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <Card className="w-full max-w-2xl bg-navy/40 border-military/20">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Globe className="mr-2 h-5 w-5 text-saffron" />
          {t('AI Translation Helper')}
        </CardTitle>
        <CardDescription>
          {t('Translate text between multiple Indian languages')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive" className="bg-red-900/20 border-red-800">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-2">
          <p className="text-sm font-medium">{t('Enter text to translate')}:</p>
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t('Type or paste your text here')}
            className="min-h-[100px] bg-navy/60 border-military/40 focus-visible:ring-saffron"
          />
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">{t('Select target language')}:</p>
          <Select value={targetLanguage} onValueChange={setTargetLanguage}>
            <SelectTrigger className="bg-navy/60 border-military/40 focus:ring-saffron">
              <SelectValue placeholder={t('Choose language')} />
            </SelectTrigger>
            <SelectContent className="max-h-[200px] bg-navy border-military">
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code} className="text-white hover:bg-military/20">
                  <span>{lang.nativeName}</span>
                  <span className="ml-1 text-xs text-white/60">({lang.name})</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {translatedText && (
          <div className="space-y-2 pt-2">
            <div className="flex justify-between">
              <p className="text-sm font-medium">{t('Translation')}:</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-6 px-2 text-white/70 hover:text-white hover:bg-military/20"
              >
                {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied ? t('Copied!') : t('Copy')}
              </Button>
            </div>
            <div className="min-h-[100px] p-3 rounded-md bg-navy/60 border border-military/40 text-white">
              {translatedText}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            setInputText('');
            setTranslatedText('');
            setError('');
          }}
          className="border-military/40 text-white hover:bg-military/20"
        >
          {t('Clear')}
        </Button>
        <Button 
          onClick={handleTranslate} 
          disabled={isTranslating || !inputText.trim() || !targetLanguage}
          className="bg-saffron hover:bg-saffron/80 text-navy"
        >
          {isTranslating ? (
            <>
              <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
              {t('Translating...')}
            </>
          ) : (
            <>
              <CornerDownLeft className="mr-2 h-4 w-4" />
              {t('Translate')}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AITranslationHelper; 