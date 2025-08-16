import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { X, Calculator, FileText, Calendar, DollarSign, TrendingUp, CheckCircle } from 'lucide-react';

const LeadForm = ({ company, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    propertyType: '',
    energyBill: '',
    timeline: '',
    message: '',
    consent: false,
    // Novos campos de intenção de compra
    budget: '',
    roofType: '',
    roofArea: '',
    currentEnergySource: '',
    purchaseIntention: '',
    decisionMaker: '',
    financingInterest: '',
    installationUrgency: '',
    previousQuotes: '',
    specificRequirements: '',
    leadSource: 'website'
  });

  const [showAdvancedFields, setShowAdvancedFields] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [intentionScore, setIntentionScore] = useState(0);

  const handleInputChange = (field, value) => {
    const newFormData = {
      ...formData,
      [field]: value
    };
    setFormData(newFormData);
    
    // Recalcular score em tempo real
    const score = calculateIntentionScore(newFormData);
    setIntentionScore(score);
  };

  const calculateIntentionScore = (data) => {
    let score = 0;
    
    // Budget (30 pontos)
    if (data.budget === 'above_50k') score += 30;
    else if (data.budget === '30k_50k') score += 25;
    else if (data.budget === '15k_30k') score += 20;
    else if (data.budget === '10k_15k') score += 15;
    else if (data.budget === 'below_10k') score += 10;
    
    // Purchase intention (25 pontos)
    if (data.purchaseIntention === 'ready_to_buy') score += 25;
    else if (data.purchaseIntention === 'next_3_months') score += 20;
    else if (data.purchaseIntention === 'next_6_months') score += 15;
    else if (data.purchaseIntention === 'next_year') score += 10;
    else if (data.purchaseIntention === 'researching') score += 5;
    
    // Timeline (20 pontos)
    if (data.timeline === 'asap') score += 20;
    else if (data.timeline === '1-3_months') score += 15;
    else if (data.timeline === '3-6_months') score += 10;
    else if (data.timeline === '6-12_months') score += 5;
    
    // Decision maker (15 pontos)
    if (data.decisionMaker === 'yes') score += 15;
    else if (data.decisionMaker === 'partial') score += 10;
    else if (data.decisionMaker === 'no') score += 5;
    
    // Financing interest (10 pontos)
    if (data.financingInterest === 'cash') score += 10;
    else if (data.financingInterest === 'financing') score += 8;
    else if (data.financingInterest === 'leasing') score += 6;
    
    return Math.min(score, 100); // Cap at 100
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Alto';
    if (score >= 60) return 'Médio-Alto';
    if (score >= 40) return 'Médio';
    return 'Baixo';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.consent) {
      alert('Por favor, preencha todos os campos obrigatórios e aceite os termos.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simular delay de envio
    setTimeout(() => {
      const leadData = {
        ...formData,
        companyId: company.id,
        companyName: company.name,
        intentionScore: calculateIntentionScore(formData),
        createdAt: new Date().toISOString(),
        status: 'new',
        id: Date.now() // Mock ID
      };
      
      if (onSubmit) {
        onSubmit(leadData);
      }
      
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Solicitação Enviada!
                </h3>
                <p className="text-gray-600 mt-2">
                  Obrigado pelo seu interesse! {company.name} entrará em contato em breve.
                </p>
                {intentionScore > 0 && (
                  <div className="mt-4">
                    <Badge className={`${getScoreColor(intentionScore)} text-white`}>
                      Score de Intenção: {intentionScore}% ({getScoreLabel(intentionScore)})
                    </Badge>
                  </div>
                )}
              </div>
              <Button onClick={onClose} className="w-full">
                Fechar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Solicitar Orçamento</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600">
            Receba uma proposta personalizada de {company.name}
          </p>
          {intentionScore > 0 && (
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-gray-600">Score de Intenção:</span>
              <Badge className={`${getScoreColor(intentionScore)} text-white`}>
                {intentionScore}% ({getScoreLabel(intentionScore)})
              </Badge>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campos básicos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  placeholder="Cidade, Estado"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Tipo de Propriedade</Label>
                <Select onValueChange={(value) => handleInputChange('propertyType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residencial</SelectItem>
                    <SelectItem value="commercial">Comercial</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="rural">Rural</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="energyBill">Valor da Conta de Energia (R$)</Label>
                <Input
                  id="energyBill"
                  type="number"
                  placeholder="Ex: 300"
                  value={formData.energyBill}
                  onChange={(e) => handleInputChange('energyBill', e.target.value)}
                />
              </div>
            </div>

            {/* Campos de intenção de compra */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-blue-500" />
                  Informações de Compra
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdvancedFields(!showAdvancedFields)}
                >
                  {showAdvancedFields ? 'Ocultar' : 'Mostrar'} Campos Avançados
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Orçamento Disponível</Label>
                  <Select onValueChange={(value) => handleInputChange('budget', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a faixa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="below_10k">Até R$ 10.000</SelectItem>
                      <SelectItem value="10k_15k">R$ 10.000 - R$ 15.000</SelectItem>
                      <SelectItem value="15k_30k">R$ 15.000 - R$ 30.000</SelectItem>
                      <SelectItem value="30k_50k">R$ 30.000 - R$ 50.000</SelectItem>
                      <SelectItem value="above_50k">Acima de R$ 50.000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Intenção de Compra</Label>
                  <Select onValueChange={(value) => handleInputChange('purchaseIntention', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Quando pretende comprar?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ready_to_buy">Pronto para comprar</SelectItem>
                      <SelectItem value="next_3_months">Próximos 3 meses</SelectItem>
                      <SelectItem value="next_6_months">Próximos 6 meses</SelectItem>
                      <SelectItem value="next_year">Próximo ano</SelectItem>
                      <SelectItem value="researching">Ainda pesquisando</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {showAdvancedFields && (
                <div className="space-y-4 mt-4">
                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertDescription>
                      Essas informações nos ajudam a preparar uma proposta mais precisa para você.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Tipo de Telhado</Label>
                      <Select onValueChange={(value) => handleInputChange('roofType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ceramic">Cerâmico</SelectItem>
                          <SelectItem value="concrete">Concreto</SelectItem>
                          <SelectItem value="metal">Metálico</SelectItem>
                          <SelectItem value="fiber_cement">Fibrocimento</SelectItem>
                          <SelectItem value="other">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="roofArea">Área do Telhado (m²)</Label>
                      <Input
                        id="roofArea"
                        type="number"
                        placeholder="Ex: 100"
                        value={formData.roofArea}
                        onChange={(e) => handleInputChange('roofArea', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Você é o tomador de decisão?</Label>
                      <Select onValueChange={(value) => handleInputChange('decisionMaker', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Sim, sou eu</SelectItem>
                          <SelectItem value="partial">Participo da decisão</SelectItem>
                          <SelectItem value="no">Não, apenas pesquiso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Forma de Pagamento Preferida</Label>
                      <Select onValueChange={(value) => handleInputChange('financingInterest', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">À vista</SelectItem>
                          <SelectItem value="financing">Financiamento</SelectItem>
                          <SelectItem value="leasing">Leasing</SelectItem>
                          <SelectItem value="installments">Parcelado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Já recebeu outros orçamentos?</Label>
                    <Select onValueChange={(value) => handleInputChange('previousQuotes', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Não, este é o primeiro</SelectItem>
                        <SelectItem value="1-2">Sim, 1-2 orçamentos</SelectItem>
                        <SelectItem value="3-5">Sim, 3-5 orçamentos</SelectItem>
                        <SelectItem value="more_than_5">Mais de 5 orçamentos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="specificRequirements">Requisitos Específicos</Label>
                    <Textarea
                      id="specificRequirements"
                      placeholder="Ex: Preciso de sistema com backup, instalação em telhado inclinado, etc."
                      value={formData.specificRequirements}
                      onChange={(e) => handleInputChange('specificRequirements', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label>Prazo para o Projeto</Label>
              <Select onValueChange={(value) => handleInputChange('timeline', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Quando pretende instalar?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asap">O mais rápido possível</SelectItem>
                  <SelectItem value="1-3_months">1-3 meses</SelectItem>
                  <SelectItem value="3-6_months">3-6 meses</SelectItem>
                  <SelectItem value="6-12_months">6-12 meses</SelectItem>
                  <SelectItem value="researching">Ainda pesquisando</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Mensagem Adicional</Label>
              <Textarea
                id="message"
                placeholder="Conte-nos mais sobre seu projeto..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) => handleInputChange('consent', checked)}
              />
              <Label htmlFor="consent" className="text-sm">
                Concordo em ser contatado por {company.name} sobre este orçamento *
              </Label>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Solicitar Orçamento'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadForm;

