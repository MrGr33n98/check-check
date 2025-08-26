import React, { useState, useEffect } from 'react'
import { X, User, Home, DollarSign, Calculator } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface LeadFormData {
  name: string
  email: string
  phone: string
  address: string
  propertyType: 'residential' | 'commercial' | 'industrial' | 'rural' | ''
  energyBill: number
  timeline: string
  message: string
  budget: string
  purchaseIntention: string
  decisionMaker: string
  financingInterest: string
  previousQuotes: string
  specificRequirements: string
  roofType: string
  roofArea: number
  currentEnergySource: string
  installationUrgency: string
}

interface FormErrors {
  [key: string]: string
}

interface LeadFormProps {
  companyId: number
  companyName: string
  isOpen: boolean
  onClose: () => void
  onSubmit: (leadData: LeadFormData & { companyId: number; intentionScore: number }) => void
  className?: string
}

const LeadForm: React.FC<LeadFormProps> = ({
  companyId,
  companyName,
  isOpen,
  onClose,
  onSubmit,
  className
}) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    propertyType: '',
    energyBill: 0,
    timeline: '',
    message: '',
    budget: '',
    purchaseIntention: '',
    decisionMaker: '',
    financingInterest: '',
    previousQuotes: '',
    specificRequirements: '',
    roofType: '',
    roofArea: 0,
    currentEnergySource: '',
    installationUrgency: ''
  })
  const [intentionScore, setIntentionScore] = useState(0)
  const [errors, setErrors] = useState<Partial<LeadFormData>>({})

  const totalSteps = 3

  // Calculate intention score in real-time
  useEffect(() => {
    const calculateIntentionScore = () => {
      let score = 0

      // Basic information completeness (20 points)
      if (formData.name && formData.email && formData.phone) score += 20

      // Property type specificity (15 points)
      if (formData.propertyType) {
        score += formData.propertyType === 'commercial' || formData.propertyType === 'industrial' ? 15 : 10
      }

      // Energy bill amount (20 points)
      if (formData.energyBill > 0) {
        if (formData.energyBill >= 500) score += 20
        else if (formData.energyBill >= 200) score += 15
        else if (formData.energyBill >= 100) score += 10
        else score += 5
      }

      // Timeline urgency (15 points)
      if (formData.timeline) {
        if (formData.timeline.includes('1-3 meses')) score += 15
        else if (formData.timeline.includes('3-6 meses')) score += 12
        else if (formData.timeline.includes('6-12 meses')) score += 8
        else score += 5
      }

      // Budget indication (10 points)
      if (formData.budget) {
        if (formData.budget.includes('50.000+')) score += 10
        else if (formData.budget.includes('30.000-50.000')) score += 8
        else if (formData.budget.includes('20.000-30.000')) score += 6
        else score += 4
      }

      // Purchase intention (10 points)
      if (formData.purchaseIntention) {
        if (formData.purchaseIntention.includes('Muito interessado')) score += 10
        else if (formData.purchaseIntention.includes('Interessado')) score += 7
        else score += 4
      }

      // Decision maker (5 points)
      if (formData.decisionMaker === 'Sim') score += 5

      // Previous quotes (5 points - negative if too many)
      if (formData.previousQuotes) {
        if (formData.previousQuotes === 'Nenhuma') score += 5
        else if (formData.previousQuotes === '1-2') score += 3
        else if (formData.previousQuotes === '3-5') score += 1
      }

      return Math.min(100, Math.max(0, score))
    }

    setIntentionScore(calculateIntentionScore())
  }, [formData.name, formData.email, formData.phone, formData.propertyType, 
      formData.energyBill, formData.timeline, formData.budget, 
      formData.purchaseIntention, formData.decisionMaker, formData.previousQuotes])

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {}

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório'
      if (!formData.email.trim()) newErrors.email = 'Email é obrigatório'
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido'
      if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório'
      if (!formData.propertyType) newErrors.propertyType = 'Tipo de propriedade é obrigatório'
    }

    if (step === 2) {
      if (formData.energyBill <= 0) newErrors.energyBill = 'Valor da conta de energia é obrigatório'
      if (!formData.timeline) newErrors.timeline = 'Prazo é obrigatório'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(totalSteps, prev + 1))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(1, prev - 1))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep(currentStep)) {
      onSubmit({
        ...formData,
        companyId,
        intentionScore
      })
    }
  }

  const updateFormData = (field: keyof LeadFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const getIntentionScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100'
    if (score >= 40) return 'text-orange-600 bg-orange-100'
    return 'text-red-600 bg-red-100'
  }

  const getIntentionScoreLabel = (score: number) => {
    if (score >= 80) return 'Alto Potencial'
    if (score >= 60) return 'Bom Potencial'
    if (score >= 40) return 'Potencial Médio'
    return 'Baixo Potencial'
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className={cn("w-full max-w-2xl max-h-[90vh] overflow-y-auto", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl">Solicitar Orçamento</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {companyName}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Intention Score Display */}
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-muted-foreground" />
              <Badge className={cn("text-xs", getIntentionScoreColor(intentionScore))}>
                {intentionScore}% - {getIntentionScoreLabel(intentionScore)}
              </Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Etapa {currentStep} de {totalSteps}</span>
              <span className="text-sm text-muted-foreground">
                {Math.round((currentStep / totalSteps) * 100)}% completo
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Informações Básicas
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      className={cn(
                        "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                        errors.name ? "border-red-500" : "border-gray-300"
                      )}
                      placeholder="Seu nome completo"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className={cn(
                        "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                        errors.email ? "border-red-500" : "border-gray-300"
                      )}
                      placeholder="seu@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      className={cn(
                        "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                        errors.phone ? "border-red-500" : "border-gray-300"
                      )}
                      placeholder="(11) 99999-9999"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tipo de Propriedade *
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => updateFormData('propertyType', e.target.value)}
                      className={cn(
                        "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                        errors.propertyType ? "border-red-500" : "border-gray-300"
                      )}
                    >
                      <option value="">Selecione o tipo</option>
                      <option value="residential">Residencial</option>
                      <option value="commercial">Comercial</option>
                      <option value="industrial">Industrial</option>
                      <option value="rural">Rural</option>
                    </select>
                    {errors.propertyType && <p className="text-red-500 text-xs mt-1">{errors.propertyType}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Endereço da Instalação
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Endereço completo onde será instalado o sistema"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Project Details */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Detalhes do Projeto
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Valor da Conta de Energia (R$) *
                    </label>
                    <input
                      type="number"
                      value={formData.energyBill || ''}
                      onChange={(e) => updateFormData('energyBill', parseFloat(e.target.value) || 0)}
                      className={cn(
                        "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                        errors.energyBill ? "border-red-500" : "border-gray-300"
                      )}
                      placeholder="500"
                      min="0"
                      step="0.01"
                    />
                    {errors.energyBill && <p className="text-red-500 text-xs mt-1">{errors.energyBill}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Prazo para Instalação *
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => updateFormData('timeline', e.target.value)}
                      className={cn(
                        "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                        errors.timeline ? "border-red-500" : "border-gray-300"
                      )}
                    >
                      <option value="">Selecione o prazo</option>
                      <option value="1-3 meses">1-3 meses</option>
                      <option value="3-6 meses">3-6 meses</option>
                      <option value="6-12 meses">6-12 meses</option>
                      <option value="Mais de 1 ano">Mais de 1 ano</option>
                      <option value="Ainda não decidi">Ainda não decidi</option>
                    </select>
                    {errors.timeline && <p className="text-red-500 text-xs mt-1">{errors.timeline}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Orçamento Disponível
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => updateFormData('budget', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecione a faixa</option>
                      <option value="Até R$ 20.000">Até R$ 20.000</option>
                      <option value="R$ 20.000-30.000">R$ 20.000-30.000</option>
                      <option value="R$ 30.000-50.000">R$ 30.000-50.000</option>
                      <option value="R$ 50.000+">R$ 50.000+</option>
                      <option value="Preciso de orientação">Preciso de orientação</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nível de Interesse
                    </label>
                    <select
                      value={formData.purchaseIntention}
                      onChange={(e) => updateFormData('purchaseIntention', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecione seu interesse</option>
                      <option value="Muito interessado">Muito interessado</option>
                      <option value="Interessado">Interessado</option>
                      <option value="Apenas pesquisando">Apenas pesquisando</option>
                      <option value="Comparando opções">Comparando opções</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Mensagem Adicional
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => updateFormData('message', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Descreva suas necessidades específicas, dúvidas ou informações adicionais..."
                  />
                </div>
              </div>
            )}

            {/* Step 3: Additional Information */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Informações Adicionais
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Você é o tomador de decisão?
                    </label>
                    <select
                      value={formData.decisionMaker}
                      onChange={(e) => updateFormData('decisionMaker', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecione</option>
                      <option value="Sim">Sim</option>
                      <option value="Não">Não</option>
                      <option value="Decisão compartilhada">Decisão compartilhada</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Interesse em Financiamento
                    </label>
                    <select
                      value={formData.financingInterest}
                      onChange={(e) => updateFormData('financingInterest', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecione</option>
                      <option value="Sim, tenho interesse">Sim, tenho interesse</option>
                      <option value="Não, pagamento à vista">Não, pagamento à vista</option>
                      <option value="Gostaria de saber mais">Gostaria de saber mais</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Orçamentos Anteriores
                    </label>
                    <select
                      value={formData.previousQuotes}
                      onChange={(e) => updateFormData('previousQuotes', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecione</option>
                      <option value="Nenhuma">Nenhuma</option>
                      <option value="1-2">1-2 orçamentos</option>
                      <option value="3-5">3-5 orçamentos</option>
                      <option value="Mais de 5">Mais de 5 orçamentos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tipo de Telhado
                    </label>
                    <select
                      value={formData.roofType}
                      onChange={(e) => updateFormData('roofType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecione</option>
                      <option value="Cerâmica">Cerâmica</option>
                      <option value="Fibrocimento">Fibrocimento</option>
                      <option value="Metálico">Metálico</option>
                      <option value="Laje">Laje</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Área do Telhado (m²)
                    </label>
                    <input
                      type="number"
                      value={formData.roofArea || ''}
                      onChange={(e) => updateFormData('roofArea', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="100"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Fonte de Energia Atual
                    </label>
                    <select
                      value={formData.currentEnergySource}
                      onChange={(e) => updateFormData('currentEnergySource', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecione</option>
                      <option value="Rede elétrica">Rede elétrica</option>
                      <option value="Gerador">Gerador</option>
                      <option value="Misto">Misto</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Requisitos Específicos
                  </label>
                  <textarea
                    value={formData.specificRequirements}
                    onChange={(e) => updateFormData('specificRequirements', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Descreva qualquer requisito específico, restrições ou preferências para a instalação..."
                  />
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <div className="flex items-center gap-2">
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={handlePrevious}>
                    Anterior
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {currentStep < totalSteps ? (
                  <Button type="button" onClick={handleNext}>
                    Próximo
                  </Button>
                ) : (
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Enviar Solicitação
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export { LeadForm }
export type { LeadFormData }