from 'react';
import { Eye, Plus, AlertCircle, TrendingUp, MousePointer, BarChart3, ExternalLink } from 'lucide-react';

interface PromotionalBanner {
  id: number;
  title: string;
  background_color: string;
  text_color: string;
  url: string;
  provider_name?: string;
  provider_logo?: string;
  display_order: number;
  position: string;
  active: boolean;
  final_url: string;
  is_external: boolean;
  clicks_count: number;
  impressions_count: number;
  start_date?: string;
  end_date?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  created_at: string;
  updated_at: string;
}

interface CompanyBannerDashboardProps {
  providerId: number;
  providerName: string;
  className?: string;
}

const CompanyBannerDashboard: React.FC<CompanyBannerDashboardProps> = ({
  providerId,
  providerName,
  className = ''
}) => {
  const [banners, setBanners] = useState<PromotionalBanner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

  // Fetch company banners
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/v1/promotional_banners?provider_id=${providerId}`);
        const data = await response.json();
        
        if (data.success) {
          setBanners(data.data || []);
          setError(null);
        } else {
          setError(data.error || 'Failed to load banners');
        }
      } catch (err) {
        console.error('Error fetching company banners:', err);
        setError('Failed to load banners');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, [providerId]);

  const calculateCTR = (clicks: number, impressions: number): string => {
    if (impressions === 0) return '0.00';
    return ((clicks / impressions) * 100).toFixed(2);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleRequestChange = async () => {
    if (!requestMessage.trim()) {
      alert('Por favor, descreva as alterações desejadas.');
      return;
    }

    setIsSubmittingRequest(true);
    try {
      const response = await fetch('/api/v1/banner_change_requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider_id: providerId,
          message: requestMessage,
          request_type: 'banner_change'
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Solicitação enviada com sucesso! Nossa equipe entrará em contato em breve.');
        setRequestMessage('');
        setShowRequestForm(false);
      } else {
        alert('Erro ao enviar solicitação. Tente novamente.');
      }
    } catch (err) {
      console.error('Error submitting request:', err);
      alert('Erro ao enviar solicitação. Tente novamente.');
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  const getStatusBadge = (banner: PromotionalBanner) => {
    const now = new Date();
    const startDate = banner.start_date ? new Date(banner.start_date) : null;
    const endDate = banner.end_date ? new Date(banner.end_date) : null;

    if (!banner.active) {
      return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">Inativo</span>;
    }

    if (startDate && now < startDate) {
      return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-600">Agendado</span>;
    }

    if (endDate && now > endDate) {
      return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600">Expirado</span>;
    }

    return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">Ativo</span>;
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Banners Promocionais</h3>
            <p className="text-sm text-gray-600 mt-1">
              Gerencie os banners da {providerName}
            </p>
          </div>
          <button
            onClick={() => setShowRequestForm(!showRequestForm)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Solicitar Banner</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-400">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {showRequestForm && (
        <div className="p-6 bg-gray-50 border-b">
          <h4 className="text-md font-medium text-gray-900 mb-3">Solicitar Alteração de Banner</h4>
          <textarea
            value={requestMessage}
            onChange={(e) => setRequestMessage(e.target.value)}
            placeholder="Descreva as alterações desejadas no seu banner (texto, cores, link, etc.)..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
          />
          <div className="flex items-center space-x-3 mt-3">
            <button
              onClick={handleRequestChange}
              disabled={isSubmittingRequest}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmittingRequest ? 'Enviando...' : 'Enviar Solicitação'}
            </button>
            <button
              onClick={() => {
                setShowRequestForm(false);
                setRequestMessage('');
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="p-6">
        {banners.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">Nenhum banner encontrado</h4>
            <p className="text-gray-600 mb-4">
              Você ainda não possui banners promocionais ativos.
            </p>
            <button
              onClick={() => setShowRequestForm(true)}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Solicitar Primeiro Banner</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {banners.map((banner) => (
              <div key={banner.id} className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Banner Preview */}
                <div 
                  className="p-4 text-center"
                  style={{
                    backgroundColor: banner.background_color,
                    color: banner.text_color
                  }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="font-medium">{banner.title}</span>
                    {banner.is_external && <ExternalLink className="w-4 h-4" />}
                  </div>
                </div>

                {/* Banner Details */}
                <div className="p-4 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(banner)}
                      <span className="text-sm text-gray-500">
                        Posição: {banner.position}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => window.open(banner.final_url, '_blank')}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Visualizar destino"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 text-blue-600 mb-1">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-medium">Impressões</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">
                        {banner.impressions_count.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 text-green-600 mb-1">
                        <MousePointer className="w-4 h-4" />
                        <span className="text-sm font-medium">Cliques</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">
                        {banner.clicks_count.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 text-purple-600 mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">CTR</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">
                        {calculateCTR(banner.clicks_count, banner.impressions_count)}%
                      </p>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>Criado em: {formatDate(banner.created_at)}</p>
                    {banner.start_date && (
                      <p>Início: {formatDate(banner.start_date)}</p>
                    )}
                    {banner.end_date && (
                      <p>Fim: {formatDate(banner.end_date)}</p>
                    )}
                  </div>

                  {/* UTM Info */}
                  {(banner.utm_source || banner.utm_medium || banner.utm_campaign) && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Parâmetros UTM:</p>
                      <div className="flex flex-wrap gap-1">
                        {banner.utm_source && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            source: {banner.utm_source}
                          </span>
                        )}
                        {banner.utm_medium && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            medium: {banner.utm_medium}
                          </span>
                        )}
                        {banner.utm_campaign && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            campaign: {banner.utm_campaign}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyBannerDashboard;