import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import DefaultMartyrPhoto from './DefaultMartyrPhoto';

interface Martyr {
  id: number;
  name: string;
  rank: string;
  unit: string;
  dob: string;
  dod: string;
  location: string;
  photo: string;
  decorations: string[];
}

interface LegacyWallCardProps {
  martyr: Martyr;
  onClick: (id: number) => void;
}

const LegacyWallCard: React.FC<LegacyWallCardProps> = ({ martyr, onClick }) => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <Card 
      className="bg-[#1A1A1A] border-[#333333] hover:border-military transition-all cursor-pointer"
      onClick={() => onClick(martyr.id)}
    >
      <CardHeader className="pb-0">
        <div className="relative mx-auto w-full max-w-[160px] mb-4">
          <AspectRatio ratio={1/1} className="bg-muted border-4 border-military rounded-full overflow-hidden">
            {imageError ? (
              <DefaultMartyrPhoto rank={martyr.rank} name={martyr.name} size="sm" />
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
        <CardTitle className="text-center text-xl">{martyr.name}</CardTitle>
        <CardDescription className="text-center text-white/70">
          {martyr.rank}, {martyr.unit}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center pt-4">
        <p className="text-sm text-white/60">{martyr.dob} - {martyr.dod}</p>
        <p className="text-sm text-white/60 mt-1">{martyr.location}</p>
        <div className="flex justify-center gap-2 mt-3">
          {martyr.decorations.slice(0, 1).map((decoration, index) => (
            <span key={index} className="inline-block bg-military/20 text-military text-xs px-2 py-1 rounded-full">
              {decoration}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-center">
        <Button 
          className="bg-military hover:bg-military-light text-white mt-2"
          onClick={(e) => {
            e.stopPropagation();
            onClick(martyr.id);
          }}
        >
          View Tribute Wall
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LegacyWallCard; 