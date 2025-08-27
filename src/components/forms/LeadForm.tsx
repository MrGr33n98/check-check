import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  company?: string;
  // Propriedades adicionais necessárias para useLeads.ts
  address?: string;
  propertyType: 'residential' | 'commercial' | 'industrial' | 'rural';
  energyBill: number;
  timeline: string;
  budget: string;
  purchaseIntention: string;
  decisionMaker?: string;
  financingInterest?: string;
  previousQuotes?: string;
  specificRequirements?: string;
  roofType?: string;
  roofArea?: number;
  currentEnergySource?: string;
  installationUrgency?: string;
}

interface LeadFormProps {
  onSubmit?: (data: LeadFormData) => void;
  className?: string;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, className }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    company: '',
    propertyType: 'residential',
    energyBill: 0,
    timeline: '',
    budget: '',
    purchaseIntention: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="company">Empresa (opcional)</Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="message">Mensagem</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Enviar</Button>
      </div>
    </form>
  );
};

export { LeadForm };