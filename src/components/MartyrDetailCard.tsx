import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Calendar, MapPin, Star } from 'lucide-react';
import DefaultMartyrPhoto from './DefaultMartyrPhoto';

interface Martyr {
  id: number;
  name: string;
  rank: string;
  unit: string;
  dob: string;
  dod: string;
  age: number;
  location: string;
  photo: string;
  decorations: string[];
}

interface MartyrDetailCardProps {
  martyr: Martyr;
}

const MartyrDetailCard: React.FC<MartyrDetailCardProps> = ({ martyr }) => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <Card className="bg-[#1A1A1A] border-[#333333]">
      <CardHeader className="pb-0">
        <div className="relative mx-auto w-full max-w-[200px] mb-4">
          <AspectRatio ratio={1/1} className="bg-muted border-4 border-military rounded-full overflow-hidden">
            {imageError ? (
              <DefaultMartyrPhoto rank={martyr.rank} name={martyr.name} size="lg" />
            ) : (
              <img 
                src={martyr.photo} 
                alt={martyr.name}
                className="object-cover w-full h-full"
                onError={handleImageError}
              />
            )}
          </AspectRatio>
          <div className="absolute bottom-0 right-0 bg-military text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center border-2 border-[#1A1A1A]">
            {martyr.rank.charAt(0)}
          </div>
        </div>
        <CardTitle className="text-center text-2xl mb-1">{martyr.name}</CardTitle>
        <CardDescription className="text-center text-white/70">
          {martyr.rank}, {martyr.unit}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-military" />
            <div>
              <p className="text-sm text-white/70">Born: {martyr.dob}</p>
              <p className="text-sm text-white/70">Martyred: {martyr.dod} (Age {martyr.age})</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-military" />
            <p className="text-sm">{martyr.location}</p>
          </div>

          <div className="pt-2 pb-1">
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <Star className="h-4 w-4 text-military" /> Decorations
            </h4>
            <div className="flex flex-wrap gap-2">
              {martyr.decorations.map((decoration, index) => (
                <span key={index} className="inline-block bg-military/20 text-military text-xs px-2 py-1 rounded-full">
                  {decoration}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MartyrDetailCard; 