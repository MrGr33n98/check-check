import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from '@/contexts/LocationContext';
import { Button } from '@/components/ui/button';
import { MapPin, X } from 'lucide-react';

const GeolocationPopup: React.FC = () => {
  const { userLocation, isLocating, requestLocation, clearLocation } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the popup only if location is not set and has not been dismissed before
    const dismissed = sessionStorage.getItem('geolocation_popup_dismissed');
    if (!userLocation && !isLocating && !dismissed) {
      const timer = setTimeout(() => setIsVisible(true), 2000); // Delay popup
      return () => clearTimeout(timer);
    }
  }, [userLocation, isLocating]);

  const handleAllow = () => {
    requestLocation();
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('geolocation_popup_dismissed', 'true');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 w-full max-w-sm z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 border animate-in slide-in-from-bottom-10 fade-in-50 duration-300">
        <button onClick={handleDismiss} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600">
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-100 rounded-full">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Personalize sua busca</h4>
            <p className="text-sm text-gray-600 mt-1">
              Permita o acesso à sua localização para ver empresas perto de você.
            </p>
            <div className="mt-4 flex gap-2">
              <Button onClick={handleAllow} size="sm">Permitir</Button>
              <Button onClick={handleDismiss} size="sm" variant="ghost">Agora não</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeolocationPopup;
