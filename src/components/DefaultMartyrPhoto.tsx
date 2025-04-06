import React from 'react';

interface DefaultMartyrPhotoProps {
  rank: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

const DefaultMartyrPhoto: React.FC<DefaultMartyrPhotoProps> = ({ 
  rank, 
  name,
  size = 'md'
}) => {
  const getInitials = () => {
    return `${rank.charAt(0)}${name.charAt(0)}`;
  };
  
  const getFontSize = () => {
    switch(size) {
      case 'sm': return 'text-2xl';
      case 'lg': return 'text-5xl';
      default: return 'text-3xl';
    }
  };

  // Get a deterministic color based on name
  const getBackgroundColorClass = () => {
    const sum = [...rank, ...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = [
      'bg-military/50',
      'bg-military/40',
      'bg-military/60',
      'bg-military/30',
      'bg-military/70'
    ];
    return colors[sum % colors.length];
  };
  
  return (
    <div className={`w-full h-full ${getBackgroundColorClass()} flex items-center justify-center text-white ${getFontSize()} font-bold`}>
      {getInitials()}
    </div>
  );
};

export default DefaultMartyrPhoto; 