import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from '@/components/ui/hero'
import CompanyList from '@/components/ui/company-list'
import ConversionPoints from '@/components/ui/conversion-points'
import { mockCompanies, mockConversionPoints } from '@/data/mockData'

// Define the Company type that matches the UI components
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

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = () => {
    // Scroll to company list section with better offset
    const companyListElement = document.getElementById('company-list')
    if (companyListElement) {
      const headerOffset = 80 // Account for fixed header if any
      const elementPosition = companyListElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleCompanySelect = (company: Company) => {
    navigate(`/company/${company.id}`)
  }

  const handleRequestQuote = (company: Company) => {
    // For now, navigate to company detail page
    // In the future, this could open a lead form modal
    navigate(`/company/${company.id}`)
  }

  const handleLeadCapture = (_leadData: any) => {
    // Show success message (you could use a toast notification here)
    alert('Obrigado! Você receberá o material em seu e-mail em breve.')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearch={handleSearch}
      />

      {/* Conversion Points Section */}
      <ConversionPoints
        conversionPoints={mockConversionPoints}
        onLeadCapture={handleLeadCapture}
      />

      {/* Company List Section */}
      <section id="company-list" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <CompanyList
            companies={mockCompanies as Company[]}
            searchTerm={searchTerm}
            onCompanySelect={handleCompanySelect}
            onRequestQuote={handleRequestQuote}
          />
        </div>
      </section>
    </div>
  )
}

export default HomePage