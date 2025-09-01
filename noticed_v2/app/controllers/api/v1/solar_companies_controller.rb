class Api::V1::SolarCompaniesController < ApplicationController
  before_action :set_cors_headers
  before_action :set_solar_company, only: [:show]

  def index
    @solar_companies = SolarCompany.where(status: 'active')
    
    # Filtros
    @solar_companies = @solar_companies.where('name ILIKE ?', "%#{params[:search]}%") if params[:search].present?
    @solar_companies = @solar_companies.where(country: params[:country]) if params[:country].present?
    @solar_companies = @solar_companies.where('tags ILIKE ?', "%#{params[:tag]}%") if params[:tag].present?
    
    # Paginação
    page = params[:page]&.to_i || 1
    per_page = params[:per_page]&.to_i || 10
    per_page = [per_page, 50].min # Máximo 50 por página
    
    @solar_companies = @solar_companies.offset((page - 1) * per_page).limit(per_page)
    
    render json: {
      solar_companies: @solar_companies.map do |company|
        {
          id: company.id,
          name: company.name,
          title: company.title,
          short_description: company.short_description,
          country: company.country,
          address: company.address,
          phone: company.phone,
          foundation_year: company.foundation_year,
          members_count: company.members_count,
          revenue: company.revenue,
          social_links: company.social_links&.split(';')&.map(&:strip),
          tags: company.tags&.split(';')&.map(&:strip),
          status: company.status
        }
      end,
      pagination: {
        current_page: page,
        per_page: per_page,
        total_count: SolarCompany.where(status: 'active').count
      }
    }
  rescue => e
    render json: { error: e.message }, status: 500
  end

  def show
    render json: {
      id: @solar_company.id,
      name: @solar_company.name,
      title: @solar_company.title,
      short_description: @solar_company.short_description,
      country: @solar_company.country,
      address: @solar_company.address,
      phone: @solar_company.phone,
      foundation_year: @solar_company.foundation_year,
      members_count: @solar_company.members_count,
      revenue: @solar_company.revenue,
      social_links: @solar_company.social_links&.split(';')&.map(&:strip),
      tags: @solar_company.tags&.split(';')&.map(&:strip),
      status: @solar_company.status
    }
  rescue => e
    render json: { error: e.message }, status: 500
  end

  private

  def set_cors_headers
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
  end

  def set_solar_company
    @solar_company = SolarCompany.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Empresa não encontrada' }, status: 404
  end
end