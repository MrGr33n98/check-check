import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCompanyService } from '@/hooks/useCompanyService';
import { CompanyFormData } from '@/types/company';

const companySchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  city: z.string().min(2, 'Cidade é obrigatória'),
  state: z.string().length(2, 'Estado deve ter 2 caracteres'),
  address: z.string().min(5, 'Endereço é obrigatório'),
  phone: z.string().min(10, 'Telefone deve ter no mínimo 10 dígitos'),
  email: z.string().email('Email inválido'),
  website: z.string().url('Website inválido').optional(),
  services: z.array(z.string()).min(1, 'Selecione pelo menos um serviço'),
});

const CompanyForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCompanyById, createCompany, updateCompany } = useCompanyService();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
  });

  useEffect(() => {
    if (id) {
      loadCompany(parseInt(id));
    }
  }, [id]);

  const loadCompany = async (companyId: number) => {
    try {
      const company = await getCompanyById(companyId);
      Object.keys(company).forEach((key) => {
        if (key in companySchema.shape) {
          setValue(key as keyof CompanyFormData, company[key as keyof CompanyFormData]);
        }
      });
    } catch (error) {
      console.error('Erro ao carregar empresa:', error);
    }
  };

  const onSubmit = async (data: CompanyFormData) => {
    setLoading(true);
    try {
      if (id) {
        await updateCompany(parseInt(id), data);
      } else {
        await createCompany(data);
      }
      navigate('/companies');
    } catch (error) {
      console.error('Erro ao salvar empresa:', error);
    } finally {
      setLoading(false);
    }
  };

  const services = [
    'Instalação de Painéis Solares',
    'Manutenção de Sistemas Solares',
    'Consultoria em Energia Solar',
    'Venda de Equipamentos',
    'Projeto de Sistemas Solares',
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {id ? 'Editar Empresa' : 'Nova Empresa'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <Input
            {...register('name')}
            className="mt-1"
            error={errors.name?.message}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descrição</label>
          <Textarea
            {...register('description')}
            className="mt-1"
            error={errors.description?.message}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Cidade</label>
            <Input
              {...register('city')}
              className="mt-1"
              error={errors.city?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Estado</label>
            <Input
              {...register('state')}
              className="mt-1"
              maxLength={2}
              error={errors.state?.message}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Endereço</label>
          <Input
            {...register('address')}
            className="mt-1"
            error={errors.address?.message}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Telefone</label>
            <Input
              {...register('phone')}
              className="mt-1"
              error={errors.phone?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              {...register('email')}
              type="email"
              className="mt-1"
              error={errors.email?.message}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Website</label>
          <Input
            {...register('website')}
            type="url"
            className="mt-1"
            error={errors.website?.message}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Serviços Oferecidos
          </label>
          <div className="space-y-2">
            {services.map((service) => (
              <label key={service} className="flex items-center">
                <input
                  type="checkbox"
                  {...register('services')}
                  value={service}
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <span className="ml-2">{service}</span>
              </label>
            ))}
          </div>
          {errors.services && (
            <p className="text-sm text-red-600 mt-1">{errors.services.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/companies')}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;