import React, { useState } from 'react';
import { GeolocationPopup } from '@/components/ui/geolocation-popup';
import { useLocation } from '@/contexts/LocationContext';
import EnhancedHeroSection from '@/components/sections/EnhancedHeroSection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import BusinessServicesSection from '@/components/sections/BusinessServicesSection';
import TrustIndicatorsSection from '@/components/sections/TrustIndicatorsSection';
import ConversionPoints from '@/components/sections/ConversionPoints';
import FeaturedCompaniesSection from '@/components/sections/FeaturedCompaniesSection';
import NewsletterSection from '@/components/sections/NewsletterSection';

const EnhancedHomePage: React.FC = () => {
  const [showLocationPopup, setShowLocationPopup] = useState(true);
  const { setUserLocation } = useLocation();

  const handleLocationSelect = (location: string) => {
    setUserLocation(location);
    setShowLocationPopup(false);
  };

  return (
    <div className="min-h-screen">
      {showLocationPopup && (
        <GeolocationPopup onLocationSelect={handleLocationSelect} />
      )}
      
      <EnhancedHeroSection />
      <CategoriesSection />
      <FeaturedCompaniesSection />
      <BusinessServicesSection />
      <TrustIndicatorsSection />
      <ConversionPoints />
      <NewsletterSection />
    </div>
  );
};

export default EnhancedHomePage;