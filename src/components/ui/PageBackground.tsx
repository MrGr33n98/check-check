import React from 'react';
import compareSolarImage from '@/assets/compare-solar.jpg';

const PageBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Primary Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{ 
          backgroundImage: `url(${compareSolarImage})`,
          filter: 'blur(0.5px) brightness(1.1) contrast(0.9)'
        }}
      />
      
      {/* Gradient Overlays for depth and contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/50 to-white/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-orange-50/30 via-transparent to-blue-50/20" />
      
      {/* Subtle pattern overlay for texture */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,165,0,0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Large floating elements for visual depth */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-orange-300/10 to-yellow-300/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-300/10 to-cyan-300/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-green-300/10 to-emerald-300/10 rounded-full blur-2xl animate-pulse delay-2000" />
      
      {/* Final contrast layer */}
      <div className="absolute inset-0 bg-white/40 dark:bg-black/60" />
    </div>
  );
};

export default PageBackground;