import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Globe, Settings, Type, MessageSquare, Volume2 } from 'lucide-react';
import AITranslationHelper from '@/components/AITranslationHelper';

const LanguageSettings = () => {
  const { t } = useTranslation();
  const { currentLanguage, setLanguage, languages } = useLanguage();
  const [fontSizePreference, setFontSizePreference] = useState('medium');
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [voiceLanguage, setVoiceLanguage] = useState(currentLanguage.code);
  const [transliterationEnabled, setTransliterationEnabled] = useState(false);
  
  const handleFontSizeChange = (value: string) => {
    setFontSizePreference(value);
    // In a real implementation, this would save the preference and apply it to the app
    // document.documentElement.style.fontSize = getFontSizeValue(value);
  };
  
  // Group languages by region
  const languageGroups = languages.reduce<Record<string, typeof languages>>((acc, lang) => {
    // This is a simplified grouping - in a real implementation, use a proper mapping
    const region = getLanguageRegion(lang.code);
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(lang);
    return acc;
  }, {});
  
  // Simple function to determine language region - in a real implementation, use a proper mapping
  function getLanguageRegion(langCode: string): string {
    const northIndian = ['hi', 'ur', 'pa', 'ks', 'doi', 'sd', 'ne', 'sa'];
    const eastIndian = ['bn', 'or', 'as', 'mni', 'sat'];
    const southIndian = ['ta', 'te', 'ml', 'kn'];
    const westIndian = ['gu', 'mr', 'ko'];
    const centralIndian = ['bho', 'mag', 'mai'];
    
    if (northIndian.includes(langCode)) return 'North Indian';
    if (eastIndian.includes(langCode)) return 'East Indian';
    if (southIndian.includes(langCode)) return 'South Indian';
    if (westIndian.includes(langCode)) return 'West Indian';
    if (centralIndian.includes(langCode)) return 'Central Indian';
    return 'Other';
  }
  
  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <Navbar />
      <main>
        <div className="container max-w-5xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Globe className="mr-2 text-saffron" /> {t('Language Settings')}
          </h1>
          <p className="text-white/70 mb-8">
            {t('Customize language preferences and translation settings')}
          </p>
          
          <Tabs defaultValue="language" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 bg-navy/40">
              <TabsTrigger value="language" className="data-[state=active]:bg-military">
                <Globe className="h-4 w-4 mr-2" /> {t('Language')}
              </TabsTrigger>
              <TabsTrigger value="display" className="data-[state=active]:bg-military">
                <Type className="h-4 w-4 mr-2" /> {t('Display')}
              </TabsTrigger>
              <TabsTrigger value="translation" className="data-[state=active]:bg-military">
                <MessageSquare className="h-4 w-4 mr-2" /> {t('Translation')}
              </TabsTrigger>
            </TabsList>
            
            {/* Language Selection Tab */}
            <TabsContent value="language" className="space-y-6">
              <Card className="bg-navy/40 border-military/20">
                <CardHeader>
                  <CardTitle>{t('Select Your Preferred Language')}</CardTitle>
                  <CardDescription>
                    {t('Choose from 25 Indian languages for the platform interface')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(languageGroups).map(([region, langs]) => (
                    <div key={region} className="space-y-3">
                      <h3 className="text-lg font-medium text-saffron">{region}</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {langs.map((lang) => (
                          <Button
                            key={lang.code}
                            variant={currentLanguage.code === lang.code ? "default" : "outline"}
                            className={
                              currentLanguage.code === lang.code 
                                ? "bg-military hover:bg-military/90" 
                                : "border-military/40 hover:bg-military/20"
                            }
                            onClick={() => setLanguage(lang.code)}
                          >
                            <div className="text-left">
                              <div className="font-medium">{lang.nativeName}</div>
                              <div className="text-xs text-white/60">{lang.name}</div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Display Settings Tab */}
            <TabsContent value="display" className="space-y-6">
              <Card className="bg-navy/40 border-military/20">
                <CardHeader>
                  <CardTitle>{t('Display Settings')}</CardTitle>
                  <CardDescription>
                    {t('Customize how text is displayed across the platform')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">{t('Font Size')}</h3>
                    <RadioGroup 
                      value={fontSizePreference} 
                      onValueChange={handleFontSizeChange}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="small" id="small" />
                        <Label htmlFor="small" className="text-sm">{t('Small')}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium" className="text-base">{t('Medium')}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="large" id="large" />
                        <Label htmlFor="large" className="text-lg">{t('Large')}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="extra-large" id="extra-large" />
                        <Label htmlFor="extra-large" className="text-xl">{t('Extra Large')}</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-3 pt-4 border-t border-military/20">
                    <h3 className="text-lg font-medium">{t('Script Settings')}</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">{t('Enable Transliteration')}</Label>
                        <p className="text-sm text-white/60">{t('Show text in your preferred script when possible')}</p>
                      </div>
                      <Switch
                        checked={transliterationEnabled}
                        onCheckedChange={setTransliterationEnabled}
                        className="data-[state=checked]:bg-saffron"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Translation Tab */}
            <TabsContent value="translation" className="space-y-6">
              <Card className="bg-navy/40 border-military/20">
                <CardHeader>
                  <CardTitle>{t('Translation Settings')}</CardTitle>
                  <CardDescription>
                    {t('Configure automatic translations and voice preferences')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">{t('Auto-translate Content')}</Label>
                      <p className="text-sm text-white/60">{t('Automatically translate user posts to your language')}</p>
                    </div>
                    <Switch
                      checked={autoTranslate}
                      onCheckedChange={setAutoTranslate}
                      className="data-[state=checked]:bg-saffron"
                    />
                  </div>
                  
                  <div className="space-y-3 pt-4 border-t border-military/20">
                    <h3 className="text-lg font-medium flex items-center">
                      <Volume2 className="h-4 w-4 mr-2 text-saffron" /> {t('Voice Assistant Language')}
                    </h3>
                    <RadioGroup 
                      value={voiceLanguage} 
                      onValueChange={setVoiceLanguage}
                      className="flex flex-col space-y-2"
                    >
                      {languages
                        .filter(lang => ['en', 'hi', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml'].includes(lang.code)) // Only languages with voice support
                        .map(lang => (
                          <div key={lang.code} className="flex items-center space-x-2">
                            <RadioGroupItem value={lang.code} id={`voice-${lang.code}`} />
                            <Label htmlFor={`voice-${lang.code}`}>{lang.nativeName} ({lang.name})</Label>
                          </div>
                        ))
                      }
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
              
              {/* AI Translation Helper */}
              <h3 className="text-xl font-bold mt-8 mb-4 flex items-center">
                <Settings className="mr-2 text-saffron" /> {t('AI Translation Tools')}
              </h3>
              <AITranslationHelper />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LanguageSettings; 