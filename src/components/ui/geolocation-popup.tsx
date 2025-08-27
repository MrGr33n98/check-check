import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { MapPin } from 'lucide-react';

interface GeolocationPopupProps {
  onLocationSelect: (location: string) => void;
}

const GeolocationPopup: React.FC<GeolocationPopupProps> = ({ onLocationSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Verificar se o usuário já selecionou uma localização
    const savedLocation = localStorage.getItem('user-location');
    if (!savedLocation) {
      // Aguardar um pouco antes de mostrar o popup para melhor UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Se já tem localização salva, notificar o componente pai
      onLocationSelect(savedLocation);
    }
  }, [onLocationSelect]);

  const handleConfirm = async () => {
    if (!location.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Salvar no localStorage
      localStorage.setItem('user-location', location.trim());
      
      // Notificar o componente pai
      onLocationSelect(location.trim());
      
      // Fechar o popup
      setIsOpen(false);
    } catch (error) {
      console.error('Erro ao salvar localização:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    // Usar São Paulo como fallback
    const fallbackLocation = 'São Paulo, SP';
    localStorage.setItem('user-location', fallbackLocation);
    onLocationSelect(fallbackLocation);
    setIsOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" hideCloseButton>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center">
            <MapPin className="h-5 w-5 text-orange-500" />
            Encontre empresas perto de você
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Para mostrar empresas perto de você, informe sua cidade ou CEP
          </p>
          
          <div className="space-y-2">
            <Label htmlFor="location">Cidade ou CEP</Label>
            <Input
              id="location"
              placeholder="Ex: São Paulo, SP ou 01310-100"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full"
              autoFocus
            />
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleConfirm}
              disabled={!location.trim() || isLoading}
              className="flex-1"
            >
              {isLoading ? 'Confirmando...' : 'Confirmar'}
            </Button>
            <Button
              variant="outline"
              onClick={handleSkip}
              className="flex-1"
            >
              Pular
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground text-center">
            Você pode alterar sua localização a qualquer momento
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { GeolocationPopup };
export default GeolocationPopup;