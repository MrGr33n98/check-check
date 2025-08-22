import React from 'react';
import * as LucideIcons from 'lucide-react';

interface TabIconProps {
  icon: keyof typeof LucideIcons;
  className?: string;
}

export const TabIcon: React.FC<TabIconProps> = ({ icon, className = 'w-5 h-5' }) => {
  const IconComponent = LucideIcons[icon] as React.ComponentType<any>;
  
  if (!IconComponent) {
    return null;
  }
  
  return <IconComponent className={className} />;
};