import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LocationContextType {
  userLocation: string | null;
  setUserLocation: (location: string) => void;
  isLocationSet: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [userLocation, setUserLocationState] = useState<string | null>(null);
  const [isLocationSet, setIsLocationSet] = useState(false);

  useEffect(() => {
    // Carregar localização salva do localStorage
    const savedLocation = localStorage.getItem('user-location');
    if (savedLocation) {
      setUserLocationState(savedLocation);
      setIsLocationSet(true);
    }
  }, []);

  const setUserLocation = (location: string) => {
    setUserLocationState(location);
    setIsLocationSet(true);
    localStorage.setItem('user-location', location);
  };

  const value = {
    userLocation,
    setUserLocation,
    isLocationSet
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;