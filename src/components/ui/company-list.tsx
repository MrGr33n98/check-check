import React, { useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Filter, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
import { CompanyCard } from '@/components/ui/company-card'
import { cn } from '@/lib/utils'

interface Company {
  id: number
  name: string
  location: string
  installed_capacity_mw: number
  rating: number
  review_count: number
  specialties: string[]
  description: string
  status: 'active' | 'pending' | 'inactive'
}

interface CompanyListProps {
  companies: Company[]
  searchTerm: string
  onCompanySelect?: (company: Company) => void
  onRequestQuote?: (company: Company) => void
  className?: string
}

const CompanyList: React.FC<CompanyListProps> = ({
  companies,
  searchTerm,
  onCompanySelect,
  onRequestQuote,
  className
}) => {
  const [sortBy, setSortBy] = useState('name')
  const [filterLocation, setFilterLocation] = useState('all')
  const [minCapacity, setMinCapacity] = useState('')
  const [minRating, setMinRating] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(9) // 3x3 grid

  // Get unique locations for filter
  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(companies.map(company => company.location))]
    return uniqueLocations.sort()
  }, [companies])

  // Filter and sort companies
  const filteredAndSortedCompanies = useMemo(() => {
    let filtered = companies.filter(company => {
      // Only show active companies
      if (company.status !== 'active') return false

      // Search filter - enhanced to include specialties
      const matchesSearch = !searchTerm || 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )

      // Location filter
      const matchesLocation = filterLocation === 'all' || company.location === filterLocation

      // Capacity filter
      const matchesCapacity = !minCapacity || company.installed_capacity_mw >= parseFloat(minCapacity)

      // Rating filter
      const matchesRating = !minRating || company.rating >= parseFloat(minRating)

      return matchesSearch && matchesLocation && matchesCapacity && matchesRating
    })

    // Sort companies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'rating':
          return b.rating - a.rating
        case 'capacity':
          return b.installed_capacity_mw - a.installed_capacity_mw
        case 'reviews':
          return b.review_count - a.review_count
        default:
          return 0
      }
    })

    return filtered
  }, [companies, searchTerm, sortBy, filterLocation, minCapacity, minRating])

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedCompanies.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedCompanies = filteredAndSortedCompanies.slice(startIndex, endIndex)

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, sortBy, filterLocation, minCapacity, minRating])

  return (
    <section className={cn('py-12', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Empresas de Energia Solar
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              {filteredAndSortedCompanies.length} empresas encontradas
              {searchTerm && ` para "${searchTerm}"`}
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>{showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}</span>
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ordenar por
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Nome da Empresa</SelectItem>
                    <SelectItem value="rating">Maior Avaliação</SelectItem>
                    <SelectItem value="capacity">Maior Capacidade</SelectItem>
                    <SelectItem value="reviews">Mais Avaliações</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localização
                </label>
                <Select value={filterLocation} onValueChange={setFilterLocation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Localizações</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacidade Mínima (MW)
                </label>
                <Input
                  type="number"
                  placeholder="0"
                  value={minCapacity}
                  onChange={(e) => setMinCapacity(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avaliação Mínima
                </label>
                <Select value={minRating} onValueChange={setMinRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as Avaliações</SelectItem>
                    <SelectItem value="4">4+ Estrelas</SelectItem>
                    <SelectItem value="3">3+ Estrelas</SelectItem>
                    <SelectItem value="2">2+ Estrelas</SelectItem>
                    <SelectItem value="1">1+ Estrelas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSortBy('name')
                    setFilterLocation('all')
                    setMinCapacity('')
                    setMinRating('')
                  }}
                  className="w-full"
                >
                  Limpar Filtros
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Company Grid */}
        {filteredAndSortedCompanies.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedCompanies.map(company => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  onViewDetails={onCompanySelect}
                  onRequestQuote={onRequestQuote}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-gray-700 text-center sm:text-left">
                  Mostrando {startIndex + 1} a {Math.min(endIndex, filteredAndSortedCompanies.length)} de {filteredAndSortedCompanies.length} empresas
                </div>
                
                <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center px-2 sm:px-3"
                  >
                    <ChevronLeft className="h-4 w-4 sm:mr-1" />
                    <span className="hidden sm:inline">Anterior</span>
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        // Show first page, last page, current page, and pages around current
                        // On mobile, show fewer pages
                        const isMobile = window.innerWidth < 640
                        const range = isMobile ? 0 : 1
                        return page === 1 || 
                               page === totalPages || 
                               Math.abs(page - currentPage) <= range
                      })
                      .map((page, index, array) => {
                        // Add ellipsis if there's a gap
                        const showEllipsis = index > 0 && page - array[index - 1] > 1
                        
                        return (
                          <React.Fragment key={page}>
                            {showEllipsis && (
                              <span className="px-1 sm:px-2 py-1 text-gray-500 text-sm">...</span>
                            )}
                            <Button
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(page)}
                              className="w-8 h-8 p-0 text-sm"
                            >
                              {page}
                            </Button>
                          </React.Fragment>
                        )
                      })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center px-2 sm:px-3"
                  >
                    <span className="hidden sm:inline">Próxima</span>
                    <ChevronRight className="h-4 w-4 sm:ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma empresa encontrada
            </h3>
            <p className="text-gray-600">
              Tente ajustar seus critérios de busca ou filtros.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export { CompanyList }