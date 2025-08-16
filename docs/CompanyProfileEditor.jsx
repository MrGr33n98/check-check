import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Upload, 
  Image as ImageIcon, 
  X, 
  Save, 
  Eye,
  Camera,
  Edit3,
  CheckCircle
} from 'lucide-react';

const CompanyProfileEditor = ({ companyData, onSave }) => {
  const [formData, setFormData] = useState({
    name: companyData?.name || '',
    description: companyData?.description || '',
    location: companyData?.location || '',
    capacity: companyData?.capacity || '',
    phone: companyData?.phone || '',
    email: companyData?.email || '',
    website: companyData?.website || '',
    logo: companyData?.logo || null,
    coverImage: companyData?.coverImage || null,
    ...companyData
  });

  const [logoPreview, setLogoPreview] = useState(companyData?.logo || null);
  const [coverPreview, setCoverPreview] = useState(companyData?.coverImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (field, file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('O arquivo deve ter no máximo 5MB.');
      return;
    }

    setIsUploading(true);

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    
    if (field === 'logo') {
      setLogoPreview(previewUrl);
    } else if (field === 'coverImage') {
      setCoverPreview(previewUrl);
    }

    // Simulate upload delay
    setTimeout(() => {
      handleInputChange(field, file);
      setIsUploading(false);
    }, 1000);
  };

  const removeImage = (field) => {
    if (field === 'logo') {
      setLogoPreview(null);
      handleInputChange('logo', null);
    } else if (field === 'coverImage') {
      setCoverPreview(null);
      handleInputChange('coverImage', null);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate save delay
    setTimeout(() => {
      if (onSave) {
        onSave(formData);
      }
      setIsSaving(false);
      setSavedMessage('Perfil atualizado com sucesso!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSavedMessage('');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {savedMessage && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            {savedMessage}
          </AlertDescription>
        </Alert>
      )}

      {/* Cover Image Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ImageIcon className="h-5 w-5 mr-2" />
            Imagem de Capa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              {coverPreview ? (
                <div className="relative">
                  <img
                    src={coverPreview}
                    alt="Cover preview"
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removeImage('coverImage')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="secondary">
                      Imagem de Capa
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Nenhuma imagem de capa</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <Label htmlFor="coverImage" className="cursor-pointer">
                <div className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                  <Upload className="h-4 w-4" />
                  <span>{coverPreview ? 'Alterar Capa' : 'Upload Capa'}</span>
                </div>
              </Label>
              <Input
                id="coverImage"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload('coverImage', e.target.files[0])}
                className="hidden"
              />
              <p className="text-sm text-gray-500">
                Recomendado: 1200x400px, máx. 5MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logo Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Edit3 className="h-5 w-5 mr-2" />
            Logo da Empresa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-6">
              <div className="relative">
                {logoPreview ? (
                  <div className="relative">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2"
                      onClick={() => removeImage('logo')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">Logo</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-center space-x-4">
                  <Label htmlFor="logo" className="cursor-pointer">
                    <div className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
                      <Upload className="h-4 w-4" />
                      <span>{logoPreview ? 'Alterar Logo' : 'Upload Logo'}</span>
                    </div>
                  </Label>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('logo', e.target.files[0])}
                    className="hidden"
                  />
                </div>
                <div className="text-sm text-gray-600">
                  <p><strong>Recomendações:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Formato quadrado (200x200px)</li>
                    <li>Fundo transparente (PNG)</li>
                    <li>Máximo 5MB</li>
                    <li>Alta resolução para melhor qualidade</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle>Informações da Empresa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome da Empresa</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Nome da empresa"
                />
              </div>
              <div>
                <Label htmlFor="location">Localização</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Cidade, Estado"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Descreva sua empresa..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="capacity">Capacidade (MW)</Label>
                <Input
                  id="capacity"
                  type="number"
                  step="0.1"
                  value={formData.capacity}
                  onChange={(e) => handleInputChange('capacity', e.target.value)}
                  placeholder="Ex: 10.5"
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="contato@empresa.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://www.empresa.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            Pré-visualização
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            {/* Cover Image Preview */}
            <div className="relative h-32 bg-gradient-to-r from-blue-500 to-green-500">
              {coverPreview && (
                <img
                  src={coverPreview}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo"
                    className="w-16 h-16 rounded-lg border-2 border-white object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-white rounded-lg border-2 border-white flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <div className="text-white">
                  <h3 className="font-bold text-lg">{formData.name || 'Nome da Empresa'}</h3>
                  <p className="text-sm opacity-90">{formData.location || 'Localização'}</p>
                </div>
              </div>
            </div>
            
            {/* Company Info Preview */}
            <div className="p-4">
              <p className="text-gray-600 text-sm">
                {formData.description || 'Descrição da empresa aparecerá aqui...'}
              </p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                {formData.capacity && <span>{formData.capacity} MW</span>}
                {formData.phone && <span>{formData.phone}</span>}
                {formData.website && <span>{formData.website}</span>}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={isSaving || isUploading}
          className="flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>{isSaving ? 'Salvando...' : 'Salvar Alterações'}</span>
        </Button>
      </div>
    </div>
  );
};

export default CompanyProfileEditor;

