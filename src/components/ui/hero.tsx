import React from 'react'
import { Search, Zap, Users, Award, TrendingUp } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeroProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onSearch: () => void
  className?: string
}

const Hero: React.FC<HeroProps> = ({
  searchTerm,
  onSearchChange,
  onSearch,
  className
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  // Mock statistics - in a real app these would come from props or API
  const stats = [
    {
      icon: Users,
      value: '500+',
      label: 'Empresas Cadastradas',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Zap,
      value: '1.2GW',
      label: 'Capacidade Instalada',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Award,
      value: '15k+',
      label: 'Projetos Concluídos',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: TrendingUp,
      value: '98%',
      label: 'Satisfação dos Clientes',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  return (
    <section className={cn('bg-gradient-to-br from-blue-50 to-green-50 py-16 px-4', className)}>
      <div className="container mx-auto max-w-6xl">
        {/* Main Hero Content */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Encontre as Melhores
            <span className="text-primary block">Empresas de Energia Solar</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Compare, avalie e conecte-se com empresas qualificadas de energia solar no Brasil. 
            Encontre a solução perfeita para seu projeto.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex gap-2 p-2 bg-white rounded-lg shadow-lg">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Buscar por empresa, localização ou especialidade..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 border-0 focus-visible:ring-0 text-base h-12"
                />
              </div>
              <Button 
                onClick={onSearch}
                size="lg"
                className="px-8 h-12"
              >
                Buscar
              </Button>
            </div>
            
            {/* Quick Search Suggestions */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="text-sm text-gray-600 mr-2">Buscar por:</span>
              {['São Paulo', 'Rio de Janeiro', 'Residencial', 'Comercial', 'Industrial'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    onSearchChange(suggestion)
                    onSearch()
                  }}
                  className="text-sm bg-white/80 hover:bg-white text-gray-700 hover:text-primary px-3 py-1 rounded-full border border-gray-200 hover:border-primary transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-4 md:p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className={cn('w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4', stat.bgColor)}>
                  <IconComponent className={cn('w-6 h-6 md:w-8 md:h-8', stat.color)} />
                </div>
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { Hero }