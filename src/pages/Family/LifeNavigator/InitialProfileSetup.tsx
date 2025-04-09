import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserProfile } from './index';
import { UserCircle, CheckCircle, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface InitialProfileSetupProps {
  profile: UserProfile;
  onProfileUpdate: (updates: Partial<UserProfile>) => void;
  voiceGuidance: boolean;
}

const InitialProfileSetup: React.FC<InitialProfileSetupProps> = ({
  profile,
  onProfileUpdate,
  voiceGuidance
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Partial<UserProfile>>(profile);
  
  // Voice guidance effect
  useEffect(() => {
    if (voiceGuidance) {
      try {
        const message = t('life_navigator.profile.voice_guidance', 'Welcome to profile setup. Please complete your profile information to help us personalize your experience.');
        const utterance = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error("Speech synthesis failed:", error);
      }
    }
  }, [voiceGuidance, t]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Update profile with form data
    const updatedProfile = {
      ...formData,
      isProfileComplete: true
    };
    onProfileUpdate(updatedProfile);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold flex items-center">
          <UserCircle className="mr-2 h-6 w-6 text-military" />
          {t('life_navigator.profile.title', 'Profile Setup')}
        </h2>
      </div>

      <Card className="bg-[#1A1A1A]/30 border-[#2D3748]">
        <CardHeader>
          <CardTitle className="text-xl">
            {t('life_navigator.profile.personal_info', 'Personal Information')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('life_navigator.profile.your_name', 'Your Name')}</Label>
            <Input
              id="name"
              placeholder={t('life_navigator.profile.enter_name', 'Enter your name')}
              className="bg-[#1A1A1A]/50 border-[#2D3748]"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>{t('life_navigator.profile.relationship', 'Your Relationship to Martyr')}</Label>
            <RadioGroup 
              value={formData.relationship || 'widow'} 
              onValueChange={(value) => handleChange('relationship', value)}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="widow" id="widow" />
                <Label htmlFor="widow">{t('life_navigator.profile.widow', 'Widow/Spouse')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="child" id="child" />
                <Label htmlFor="child">{t('life_navigator.profile.child', 'Child')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="parent" id="parent" />
                <Label htmlFor="parent">{t('life_navigator.profile.parent', 'Parent')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">{t('life_navigator.profile.other', 'Other')}</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.relationship === 'child' && (
            <div className="space-y-2">
              <Label htmlFor="age">{t('life_navigator.profile.age', 'Your Age')}</Label>
              <Input
                id="age"
                type="number"
                placeholder={t('life_navigator.profile.enter_age', 'Enter your age')}
                className="bg-[#1A1A1A]/50 border-[#2D3748]"
                value={formData.age || ''}
                onChange={(e) => handleChange('age', parseInt(e.target.value))}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-[#1A1A1A]/30 border-[#2D3748]">
        <CardHeader>
          <CardTitle className="text-xl">
            {t('life_navigator.profile.martyr_info', 'Martyr Information')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="martyrName">{t('life_navigator.profile.martyr_name', 'Name')}</Label>
            <Input
              id="martyrName"
              placeholder={t('life_navigator.profile.enter_martyr_name', 'Enter martyr name')}
              className="bg-[#1A1A1A]/50 border-[#2D3748]"
              value={formData.martyr?.name || ''}
              onChange={(e) => handleChange('martyr', { ...(formData.martyr || {}), name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="martyrRank">{t('life_navigator.profile.martyr_rank', 'Rank')}</Label>
            <Input
              id="martyrRank"
              placeholder={t('life_navigator.profile.enter_martyr_rank', 'Enter rank')}
              className="bg-[#1A1A1A]/50 border-[#2D3748]"
              value={formData.martyr?.rank || ''}
              onChange={(e) => handleChange('martyr', { ...(formData.martyr || {}), rank: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="martyrForce">{t('life_navigator.profile.force', 'Force')}</Label>
            <Select 
              value={formData.martyr?.force || ''} 
              onValueChange={(value) => handleChange('martyr', { ...(formData.martyr || {}), force: value })}
            >
              <SelectTrigger id="martyrForce" className="bg-[#1A1A1A]/50 border-[#2D3748]">
                <SelectValue placeholder={t('life_navigator.profile.select_force', 'Select force')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Indian Army">{t('life_navigator.profile.indian_army', 'Indian Army')}</SelectItem>
                <SelectItem value="Indian Navy">{t('life_navigator.profile.indian_navy', 'Indian Navy')}</SelectItem>
                <SelectItem value="Indian Air Force">{t('life_navigator.profile.indian_air_force', 'Indian Air Force')}</SelectItem>
                <SelectItem value="Central Armed Police Forces">{t('life_navigator.profile.capf', 'Central Armed Police Forces')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="martyrdomDate">{t('life_navigator.profile.date_of_martyrdom', 'Date of Martyrdom')}</Label>
            <Input
              id="martyrdomDate"
              type="date"
              className="bg-[#1A1A1A]/50 border-[#2D3748]"
              value={formData.martyr?.dateOfMartyrdom || ''}
              onChange={(e) => handleChange('martyr', { ...(formData.martyr || {}), dateOfMartyrdom: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          className="bg-military hover:bg-military/80 text-white"
          onClick={handleSubmit}
        >
          <CheckCircle2 className="mr-2 h-4 w-4" />
          {t('life_navigator.profile.save_profile', 'Save Profile')}
        </Button>
      </div>

      {profile.isProfileComplete && (
        <Card className="bg-green-900/20 border-green-600/30">
          <CardContent className="p-4 flex items-center">
            <CheckCircle2 className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-green-300">
              {t('life_navigator.profile.complete', 'Profile is complete! You can now access all features.')}
            </span>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InitialProfileSetup; 