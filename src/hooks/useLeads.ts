import { useState, useCallback, useEffect } from 'react'
import type { Lead } from '@/data/types'
import type { LeadFormData } from '@/components/forms/LeadForm'

interface UseLeadsReturn {
  leads: Lead[]
  isLoading: boolean
  error: string | null
  submitLead: (leadData: LeadFormData & { companyId: number; intentionScore: number }) => Promise<void>
  addLead: (lead: Lead) => void
  updateLeadStatus: (leadId: number, status: Lead['status']) => Promise<void>
  getLeadsByCompany: (companyId: number) => Lead[]
  getLeadById: (leadId: number) => Lead | undefined
}

export const useLeads = (): UseLeadsReturn => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)


  // Load leads from localStorage on initial load
  useEffect(() => {
    const loadLeads = () => {
      try {
        const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]')
        if (Array.isArray(existingLeads)) {
          setLeads(existingLeads)
        }
      } catch (err) {
          console.error('Error loading leads from localStorage:', err)
        }
    }
    
    loadLeads()
  }, [])

  const submitLead = useCallback(async (leadData: LeadFormData & { companyId: number; intentionScore: number }) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newLead: Lead = {
        id: Date.now(), // In a real app, this would come from the backend
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        address: leadData.address || '',
        propertyType: leadData.propertyType as Lead['propertyType'],
        energyBill: leadData.energyBill,
        timeline: leadData.timeline,
        message: leadData.message,
        intentionScore: leadData.intentionScore,
        budget: leadData.budget,
        purchaseIntention: leadData.purchaseIntention,
        status: 'new',
        leadSource: 'website',
        companyId: leadData.companyId,
        created_at: new Date().toISOString(),
        // Additional fields
        decisionMaker: leadData.decisionMaker,
        financingInterest: leadData.financingInterest,
        previousQuotes: leadData.previousQuotes,
        specificRequirements: leadData.specificRequirements,
        roofType: leadData.roofType,
        roofArea: leadData.roofArea,
        currentEnergySource: leadData.currentEnergySource,
        installationUrgency: leadData.installationUrgency
      }

      setLeads(prev => [newLead, ...prev])
      
      // Store in localStorage for persistence
      try {
        const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]')
        localStorage.setItem('leads', JSON.stringify([newLead, ...existingLeads]))
      } catch (err) {
        console.error('Error saving lead to localStorage:', err)
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar lead')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateLeadStatus = useCallback(async (leadId: number, status: Lead['status']) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))

      setLeads(prev => prev.map(lead => 
        lead.id === leadId ? { ...lead, status } : lead
      ))

      // Update localStorage
      try {
        const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]')
        const updatedLeads = existingLeads.map((lead: Lead) => 
          lead.id === leadId ? { ...lead, status } : lead
        )
        localStorage.setItem('leads', JSON.stringify(updatedLeads))
      } catch (err) {
        console.error('Error updating lead status in localStorage:', err)
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar status do lead')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getLeadsByCompany = useCallback((companyId: number) => {
    return leads.filter(lead => lead.companyId === companyId)
  }, [leads])

  const addLead = useCallback((lead: Lead) => {
    setLeads(prev => [lead, ...prev])
    
    // Store in localStorage for persistence
    try {
      const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]')
      localStorage.setItem('leads', JSON.stringify([lead, ...existingLeads]))
    } catch (err) {
      console.error('Error adding lead to localStorage:', err)
    }
  }, [])

  const getLeadById = useCallback((leadId: number) => {
    return leads.find(lead => lead.id === leadId)
  }, [leads])

  return {
    leads,
    isLoading,
    error,
    submitLead,
    addLead,
    updateLeadStatus,
    getLeadsByCompany,
    getLeadById
  }
}