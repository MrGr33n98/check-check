import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';
import { LocationProvider } from '@/contexts/LocationContext';
import GeolocationPopup from '../ui/geolocation-popup';

const Layout: React.FC = () => {
  return (
    <LocationProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
        <Toaster richColors position="top-right" />
        <GeolocationPopup />
      </div>
    </LocationProvider>
  );
};

export default Layout;
