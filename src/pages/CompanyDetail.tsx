import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Phone, Globe, Star, Calendar, Award, ExternalLink, Mail, Clock, FileText, BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import StarRating from '@/components/ui/star-rating'
import ReviewCard from '@/components/ui/review-card'
import { mockCompanies, mockReviews, mockContent, mockBadges } from '@/data/mockData'
import type { Company, Review, Content, Badge as BadgeType } from '@/data/types'

const CompanyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [company, setCompany] = useState<Company | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [content, setContent] = useState<Content[]>([])
  const [badges, setBadges] = useState<BadgeType[]>([])
  const [activeTab, setActiveTab] = useState('overview')
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false)

  useEffect(() => {
    if (id) {
      const companyId = parseInt(id)
      const foundCompany = mockCompanies.find(c => c.id === companyId)
      
      if (foundCompany) {
        setCompany(foundCompany)
        
        // Load reviews for this company (only approved ones)
        const companyReviews = mockReviews.filter(
          r => r.solar_company_id === companyId && r.status === 'approved'
        )
        setReviews(companyReviews)
        
        // Load content for this company
        const companyContent = mockContent.filter(c => c.solar_company_id === companyId)
        setContent(companyContent)
        
        // Load badges for this company
        const companyBadges = mockBadges.filter(
          b => b.badgeable_type === 'Company' && b.badgeable_id === companyId
        )
        setBadges(companyBadges)
      }
    }
  }, [id])

  const handleBack = () => {
    navigate(-1)
  }

  const handleRequestQuote = () => {
    setIsLeadFormOpen(true)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!company) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Empresa não encontrada</h1>
          <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with back button */}
      <div className="mb-6">
        <Button onClick={handleBack} variant="ghost" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
      </div>

      {/* Company Header */}
      <div className="mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Company Logo */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                  {company.name.charAt(0)}
                </div>
              </div>

              {/* Company Info */}
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {company.name}
                    </h1>
                    
                    <div className="flex items-center gap-4 text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{company.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Desde {company.foundedYear || '2015'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <StarRating rating={company.rating} showValue size="sm" />
                        <span className="text-sm text-muted-foreground">
                          ({company.review_count} avaliações)
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Award className="w-4 h-4" />
                        <span>{company.installed_capacity_mw} MW instalados</span>
                      </div>
                    </div>

                    {/* Badges */}
                    {badges.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {badges.map((badge) => (
                          <Badge key={badge.id} variant="secondary" className="bg-blue-100 text-blue-800">
                            {badge.name}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Specialties */}
                    {company.specialties && company.specialties.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {company.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    <Button onClick={handleRequestQuote} size="lg" className="w-full lg:w-auto">
                      Solicitar Orçamento
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          <TabsTrigger value="guides">Guias</TabsTrigger>
          <TabsTrigger value="contact">Contato</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Company Description */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Sobre a Empresa</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {company.description}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Company Stats */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Capacidade Instalada</span>
                    <span className="font-medium">{company.installed_capacity_mw} MW</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avaliação Média</span>
                    <span className="font-medium">{company.rating.toFixed(1)}/5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total de Avaliações</span>
                    <span className="font-medium">{company.review_count}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Funcionários</span>
                    <span className="font-medium">{company.employeeCount || '50-100'}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Certifications */}
          {company.certifications && company.certifications.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Certificações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {company.certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                      <Award className="w-3 h-3 mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Service Areas */}
          {company.service_areas && company.service_areas.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Áreas de Atendimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {company.service_areas.map((area, index) => (
                    <Badge key={index} variant="outline">
                      <MapPin className="w-3 h-3 mr-1" />
                      {area}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Avaliações dos Clientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Nenhuma avaliação ainda</h3>
                  <p className="text-muted-foreground">
                    Esta empresa ainda não possui avaliações aprovadas.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Guides Tab */}
        <TabsContent value="guides" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Conteúdo Educativo
              </CardTitle>
            </CardHeader>
            <CardContent>
              {content.length > 0 ? (
                <div className="space-y-4">
                  {content.map((item) => (
                    <Card key={item.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <FileText className="w-5 h-5 text-blue-500" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground mb-2">
                              {item.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                              {item.body}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="capitalize">{item.content_type}</span>
                              <span>•</span>
                              <span>{formatDate(item.created_at)}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Nenhum conteúdo disponível</h3>
                  <p className="text-muted-foreground">
                    Esta empresa ainda não publicou conteúdo educativo.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{company.phone}</p>
                    <p className="text-sm text-muted-foreground">Telefone</p>
                  </div>
                </div>

                {company.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <a 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        {company.website}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <p className="text-sm text-muted-foreground">Website</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{company.location}</p>
                    <p className="text-sm text-muted-foreground">Localização</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Horário de Funcionamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Segunda-feira</span>
                    <span className="text-sm font-medium">08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Terça-feira</span>
                    <span className="text-sm font-medium">08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Quarta-feira</span>
                    <span className="text-sm font-medium">08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Quinta-feira</span>
                    <span className="text-sm font-medium">08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Sexta-feira</span>
                    <span className="text-sm font-medium">08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Sábado</span>
                    <span className="text-sm font-medium">08:00 - 12:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Domingo</span>
                    <span className="text-sm font-medium">Fechado</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Entre em Contato</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Solicite um Orçamento</h3>
                <p className="text-muted-foreground mb-4">
                  Clique no botão abaixo para solicitar um orçamento personalizado.
                </p>
                <Button onClick={handleRequestQuote}>
                  Solicitar Orçamento
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Lead Form Modal - Placeholder for now */}
      {isLeadFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Solicitar Orçamento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Formulário de lead será implementado na próxima tarefa.
              </p>
              <Button 
                onClick={() => setIsLeadFormOpen(false)} 
                variant="outline" 
                className="w-full"
              >
                Fechar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default CompanyDetail