import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X, MapPin, Monitor } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { BannerService, BannerConfig } from '@/services/bannerService';



const BannerManager: React.FC = () => {
  const [banners, setBanners] = useState<BannerConfig[]>([]);
  const [editingBanner, setEditingBanner] = useState<BannerConfig | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [previewBanner, setPreviewBanner] = useState<BannerConfig | null>(null);


  const backgroundOptions = [
    { value: 'bg-gradient-to-r from-blue-500 to-cyan-400', label: 'Azul Oceano', preview: 'linear-gradient(to right, #3b82f6, #22d3ee)' },
    { value: 'bg-gradient-to-r from-green-500 to-emerald-400', label: 'Verde Natureza', preview: 'linear-gradient(to right, #10b981, #34d399)' },
    { value: 'bg-gradient-to-r from-orange-500 to-yellow-400', label: 'Laranja Solar', preview: 'linear-gradient(to right, #f97316, #facc15)' },
    { value: 'bg-gradient-to-r from-purple-500 to-pink-400', label: 'Roxo Premium', preview: 'linear-gradient(to right, #8b5cf6, #f472b6)' },
    { value: 'bg-gradient-to-r from-gray-700 to-gray-900', label: 'Cinza Elegante', preview: 'linear-gradient(to right, #374151, #111827)' }
  ];

  const animationOptions = [
    { value: 'fade', label: 'Fade In' },
    { value: 'slide', label: 'Slide Down' },
    { value: 'bounce', label: 'Bounce In' },
    { value: 'none', label: 'Sem Animação' }
  ];

  const positionOptions = [
    { value: 'top', label: 'Topo' },
    { value: 'bottom', label: 'Rodapé' },
    { value: 'sidebar', label: 'Lateral' }
  ];

  // Carregar banners
  useEffect(() => {
    const loadBanners = async () => {
      try {
        const allBanners = await BannerService.getAllBanners();
        setBanners(allBanners);
      } catch (error) {
        console.error('Erro ao carregar banners:', error);
      }
    };

    loadBanners();
  }, []);

  const createNewBanner = (): BannerConfig => ({
    id: Date.now().toString(),
    city: '',
    title: '',
    description: '',
    companyName: '',
    companyLogo: '',
    ctaText: 'Ver Empresas',
    ctaLink: '',
    backgroundColor: 'from-blue-500 to-green-500',
    textColor: 'text-white',
    animation: 'slideDown',
    position: 'top',
    isActive: true,
    isPremium: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  const handleSave = async (banner: BannerConfig) => {
    try {
      if (isCreating) {
        const created = await BannerService.createBanner({
          city: banner.city,
          title: banner.title,
          description: banner.description,
          companyName: banner.companyName,
          companyLogo: banner.companyLogo,
          ctaText: banner.ctaText,
          ctaLink: banner.ctaLink,
          backgroundColor: banner.backgroundColor,
          textColor: banner.textColor,
          animation: banner.animation,
          position: banner.position,
          isActive: banner.isActive,
          isPremium: banner.isPremium
        });
        setBanners([...banners, created]);
        setIsCreating(false);
      } else {
        const updatedBanner = await BannerService.updateBanner(banner.id, banner);
        if (updatedBanner) {
          setBanners(banners.map(b => b.id === banner.id ? updatedBanner : b));
        }
      }
      setEditingBanner(null);
    } catch (error) {
      console.error('Erro ao salvar banner:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este banner?')) {
      try {
        const success = await BannerService.deleteBanner(id);
        if (success) {
          setBanners(banners.filter(b => b.id !== id));
        }
      } catch (error) {
        console.error('Erro ao deletar banner:', error);
      }
    }
  };

  const toggleActive = async (id: string) => {
    try {
      const updatedBanner = await BannerService.toggleBannerStatus(id);
      if (updatedBanner) {
        setBanners(banners.map(b => 
          b.id === id ? updatedBanner : b
        ));
      }
    } catch (error) {
      console.error('Erro ao alterar status do banner:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Banners</h1>
          <p className="text-gray-600 mt-2">
            Configure banners personalizados por cidade para aumentar conversões
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingBanner(createNewBanner());
            setIsCreating(true);
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Banner
        </Button>
      </div>

      {/* Lista de Banners */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {banners.map((banner) => (
          <Card key={banner.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <CardTitle className="text-lg">
                    {banner.city}
                  </CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleActive(banner.id)}
                    className={`p-1 rounded ${banner.isActive ? 'text-green-600' : 'text-gray-400'}`}
                  >
                    {banner.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  {banner.isPremium && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      Premium
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Preview do Banner */}
              <div 
                className={`${banner.backgroundColor} ${banner.textColor} p-4 rounded-lg mb-4 text-sm`}
              >
                <h3 className="font-bold mb-1">{banner.title}</h3>
                <p className="opacity-90 mb-2">{banner.companyName}</p>
                <p className="opacity-80 text-xs mb-3 line-clamp-2">{banner.description}</p>
                <div className="inline-block bg-white text-blue-600 px-3 py-1 rounded text-xs font-medium">
                  {banner.ctaText}
                </div>
              </div>

              {/* Informações */}
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Posição:</span>
                  <span className="capitalize">{banner.position}</span>
                </div>
                <div className="flex justify-between">
                  <span>Animação:</span>
                  <span className="capitalize">{banner.animation}</span>
                </div>
                {banner.displayDuration && (
                  <div className="flex justify-between">
                    <span>Duração:</span>
                    <span>{banner.displayDuration}s</span>
                  </div>
                )}
              </div>

              {/* Ações */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewBanner(banner)}
                  className="flex-1"
                >
                  <Monitor className="w-4 h-4 mr-1" />
                  Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingBanner(banner);
                    setIsCreating(false);
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(banner.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Edição */}
      {editingBanner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {isCreating ? 'Criar Novo Banner' : 'Editar Banner'}
                </h2>
                <button
                  onClick={() => {
                    setEditingBanner(null);
                    setIsCreating(false);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Formulário */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Cidade</label>
                      <input
                        type="text"
                        placeholder="Cidade"
                        value={editingBanner?.city || ''}
                        onChange={(e) => setEditingBanner(prev => prev ? {...prev, city: e.target.value} : null)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Nome da Empresa</label>
                        <input
                          type="text"
                          placeholder="Nome da Empresa"
                          value={editingBanner?.companyName || ''}
                          onChange={(e) => setEditingBanner(prev => prev ? {...prev, companyName: e.target.value} : null)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Título</label>
                    <input
                      type="text"
                      placeholder="Título do banner"
                      value={editingBanner?.title || ''}
                      onChange={(e) => setEditingBanner(prev => prev ? {...prev, title: e.target.value} : null)}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                      <label className="block text-sm font-medium mb-2">Texto do CTA</label>
                      <input
                        type="text"
                        placeholder="Texto do CTA"
                        value={editingBanner?.ctaText || ''}
                        onChange={(e) => setEditingBanner(prev => prev ? {...prev, ctaText: e.target.value} : null)}
                        className="w-full p-2 border rounded"
                      />
                    </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Descrição</label>
                    <textarea
                      placeholder="Descrição do banner"
                      value={editingBanner?.description || ''}
                      onChange={(e) => setEditingBanner(prev => prev ? {...prev, description: e.target.value} : null)}
                      className="w-full p-2 border rounded"
                      rows={3}
                    />
                  </div>

                  <div>
                      <label className="block text-sm font-medium mb-2">Link do CTA</label>
                      <input
                        type="text"
                        placeholder="Link do CTA"
                        value={editingBanner?.ctaLink || ''}
                        onChange={(e) => setEditingBanner(prev => prev ? {...prev, ctaLink: e.target.value} : null)}
                        className="w-full p-2 border rounded"
                      />
                    </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Cor de Fundo</label>
                    <div className="grid grid-cols-1 gap-2">
                      {backgroundOptions.map((option) => (
                        <label key={option.value} className="flex items-center gap-3 p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="backgroundColor"
                            value={option.value}
                            checked={editingBanner.backgroundColor === option.value}
                            onChange={(e) => setEditingBanner({...editingBanner, backgroundColor: e.target.value})}
                            className="sr-only"
                          />
                          <div 
                            className="w-8 h-8 rounded border-2"
                            style={{ background: option.preview }}
                          />
                          <span className={`font-medium ${editingBanner.backgroundColor === option.value ? 'text-blue-600' : 'text-gray-700'}`}>
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Posição</label>
                      <select
                        value={editingBanner.position}
                        onChange={(e) => setEditingBanner({...editingBanner, position: e.target.value as any})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {positionOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Animação</label>
                      <select
                        value={editingBanner.animation}
                        onChange={(e) => setEditingBanner({...editingBanner, animation: e.target.value as any})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {animationOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Duração (segundos)</label>
                    <input
                        type="number"
                        min="5"
                        max="60"
                        value={editingBanner?.displayDuration || ''}
                        onChange={(e) => setEditingBanner(prev => prev ? {...prev, displayDuration: e.target.value ? parseInt(e.target.value) : undefined} : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="10"
                      />
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editingBanner.isActive}
                        onChange={(e) => setEditingBanner({...editingBanner, isActive: e.target.checked})}
                        className="rounded"
                      />
                      <span className="text-sm font-medium">Banner ativo</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editingBanner.isPremium}
                        onChange={(e) => setEditingBanner({...editingBanner, isPremium: e.target.checked})}
                        className="rounded"
                      />
                      <span className="text-sm font-medium">Plano Premium</span>
                    </label>
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Preview</h3>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className={`${editingBanner.backgroundColor} ${editingBanner.textColor} p-6 rounded-lg`}>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium opacity-90">
                          {editingBanner.city || 'Cidade'}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold mb-2">
                        {editingBanner.title || 'Título do Banner'}
                      </h2>
                      <p className="text-lg mb-2 opacity-90">
                        {editingBanner.companyName || 'Nome da Empresa'}
                      </p>
                      <p className="text-sm mb-4 opacity-80">
                        {editingBanner.description || 'Descrição do banner aparecerá aqui...'}
                      </p>
                      <div className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg font-medium">
                        {editingBanner.ctaText || 'Ver Empresas'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingBanner(null);
                    setIsCreating(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => handleSave(editingBanner)}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={!editingBanner.city || !editingBanner.title}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isCreating ? 'Criar Banner' : 'Salvar Alterações'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Preview */}
      {previewBanner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Preview do Banner</h2>
              <button
                onClick={() => setPreviewBanner(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className={`${previewBanner.backgroundColor} ${previewBanner.textColor} p-6 rounded-lg shadow-lg`}>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-medium opacity-90">
                    {previewBanner.city}
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-2">
                  {previewBanner.title}
                </h2>
                <p className="text-lg mb-2 opacity-90">
                  {previewBanner.companyName}
                </p>
                <p className="text-sm mb-4 opacity-80">
                  {previewBanner.description}
                </p>
                <div className="inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold transition-all hover:scale-105">
                  {previewBanner.ctaText}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerManager;