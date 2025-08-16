import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Calendar, Calculator, FileText, CheckCircle } from 'lucide-react'

interface ConversionPoint {
  id: string
  title: string
  description: string
  icon: string
  color: string
  cta: string
  leadMagnet: string
}

interface ConversionPointsProps {
  conversionPoints: ConversionPoint[]
  onLeadCapture: (leadData: any) => void
}

const ConversionPoints: React.FC<ConversionPointsProps> = ({
  conversionPoints,
  onLeadCapture
}) => {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleOpenModal = (offerId: string) => {
    setActiveModal(offerId)
    setIsSubmitted(false)
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      interest: offerId
    })
  }

  const handleCloseModal = () => {
    setActiveModal(null)
    setIsSubmitted(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email) {
      alert('Por favor, preencha nome e email.')
      return
    }

    const leadData = {
      ...formData,
      type: 'conversion_point',
      source: activeModal,
      createdAt: new Date().toISOString(),
      status: 'new'
    }

    onLeadCapture(leadData)
    setIsSubmitted(true)
  }

  const activeOffer = conversionPoints.find(offer => offer.id === activeModal)

  // Map icon names to actual Lucide icons
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Download': return Download
      case 'Calendar': return Calendar
      case 'Calculator': return Calculator
      case 'FileText': return FileText
      default: return Download
    }
  }

  return (
    <>
      {/* Conversion Points Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
        {conversionPoints.map((offer) => {
          const IconComponent = getIconComponent(offer.icon)
          return (
            <Card key={offer.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className={`${offer.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{offer.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
                <Button 
                  onClick={() => handleOpenModal(offer.id)}
                  className="w-full"
                  variant="outline"
                >
                  {offer.cta}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  {activeOffer && (
                    <>
                      {React.createElement(getIconComponent(activeOffer.icon), { className: "h-5 w-5 mr-2" })}
                      {activeOffer.title}
                    </>
                  )}
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={handleCloseModal}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center space-y-4">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Sucesso!
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {activeOffer?.leadMagnet} será enviado para seu email em breve.
                    </p>
                  </div>
                  <Button onClick={handleCloseModal} className="w-full">
                    Fechar
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-center mb-4">
                    <div className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                      Oferta Gratuita
                    </div>
                    <p className="text-sm text-gray-600">
                      {activeOffer?.leadMagnet}
                    </p>
                  </div>

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

                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>

                  {(activeModal === 'consultation' || activeModal === 'webinar') && (
                    <div>
                      <Label htmlFor="company">Empresa (opcional)</Label>
                      <Input
                        id="company"
                        placeholder="Nome da sua empresa"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                      />
                    </div>
                  )}

                  <div className="flex space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={handleCloseModal} className="flex-1">
                      Cancelar
                    </Button>
                    <Button type="submit" className="flex-1">
                      {activeOffer?.cta}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export { ConversionPoints }