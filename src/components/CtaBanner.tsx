from 'react';
import { Link } from 'react-router-dom';

interface CtaBannerData {
  id: number | null;
  title: string;
  subtitle: string;
  button1_text: string;
  button1_url: string;
  button2_text: string;
  button2_url: string;
  background_type: 'solid' | 'image';
  background_color: string | null;
  background_image_url: string | null;
  enabled: boolean;
  position: string;
}

interface CtaBannerProps {
  position?: string;
  className?: string;
}

const CtaBanner: React.FC<CtaBannerProps> = ({ 
  position = 'homepage', 
  className = '' 
}) => {
  const [bannerData, setBannerData] = useState<CtaBannerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Valores padrão de fallback
  const defaultBanner: CtaBannerData = {
    id: null,
    title: 'Pronto para começar seu projeto solar?',
    subtitle: 'Conecte-se com as melhores empresas de energia solar da sua região e receba orçamentos personalizados em minutos.',
    button1_text: 'Encontrar Empresas',
    button1_url: '/busca-avancada',
    button2_text: 'Cadastrar Minha Empresa',
    button2_url: '/cadastrar',
    background_type: 'solid',
    background_color: '#f97316',
    background_image_url: null,
    enabled: true,
    position: 'homepage'
  };

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/v1/cta_banner');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          // Verificar se o banner é para a posição correta
          if (result.data.position === position || !result.data.position) {
            setBannerData(result.data);
          } else {
            setBannerData(defaultBanner);
          }
        } else {
          setBannerData(defaultBanner);
        }
      } catch (err) {
        console.error('Erro ao buscar dados do CTA Banner:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        setBannerData(defaultBanner);
      } finally {
        setLoading(false);
      }
    };

    fetchBannerData();
  }, [position]);

  // Função para determinar se uma URL é externa
  const isExternalUrl = (url: string): boolean => {
    return url.startsWith('http://') || url.startsWith('https://');
  };

  // Função para renderizar botão
  const renderButton = (text: string, url: string, isPrimary: boolean = false) => {
    const baseClasses = "inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:transform hover:scale-105";
    const primaryClasses = "bg-white text-gray-900 hover:bg-gray-100 shadow-lg";
    const secondaryClasses = "bg-white/20 text-white border-2 border-white/30 hover:bg-white/30 backdrop-blur-sm";
    
    const buttonClasses = `${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses}`;

    if (isExternalUrl(url)) {
      return (
        <a
          href={url}
          className={buttonClasses}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      );
    } else {
      return (
        <Link to={url} className={buttonClasses}>
          {text}
        </Link>
      );
    }
  };

  // Função para gerar estilos de fundo
  const getBackgroundStyles = (): React.CSSProperties => {
    if (!bannerData) return {};

    if (bannerData.background_type === 'image' && bannerData.background_image_url) {
      return {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bannerData.background_image_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    } else {
      return {
        background: `linear-gradient(135deg, ${bannerData.background_color || '#f97316'} 0%, ${bannerData.background_color || '#ea580c'} 100%)`
      };
    }
  };

  if (loading) {
    return (
      <div className={`rounded-xl p-8 md:p-12 text-center animate-pulse ${className}`} style={getBackgroundStyles()}>
        <div className="h-8 bg-white/20 rounded mb-4 mx-auto max-w-md"></div>
        <div className="h-4 bg-white/20 rounded mb-6 mx-auto max-w-lg"></div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="h-12 bg-white/20 rounded-lg w-40"></div>
          <div className="h-12 bg-white/20 rounded-lg w-40"></div>
        </div>
      </div>
    );
  }

  if (!bannerData || !bannerData.enabled) {
    return null;
  }

  return (
    <div 
      className={`rounded-xl p-8 md:p-12 text-center text-white shadow-2xl ${className}`}
      style={getBackgroundStyles()}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
          {bannerData.title}
        </h2>
        
        <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed max-w-3xl mx-auto">
          {bannerData.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {renderButton(bannerData.button1_text, bannerData.button1_url, true)}
          {renderButton(bannerData.button2_text, bannerData.button2_url, false)}
        </div>
      </div>
      
      {error && (
        <div className="mt-4 text-sm opacity-75">
          <p>⚠️ Usando configuração padrão devido a erro na API</p>
        </div>
      )}
    </div>
  );
};

export default CtaBanner;