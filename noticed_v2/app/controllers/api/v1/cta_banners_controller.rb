class Api::V1::CtaBannersController < ApplicationController
  before_action :set_cors_headers
  skip_before_action :verify_authenticity_token

  def show
    cta_banner = CtaBanner.current
    
    if cta_banner
      render json: {
        success: true,
        data: cta_banner.to_json_api
      }
    else
      render json: {
        success: true,
        data: default_cta_banner
      }
    end
  rescue => e
    render json: {
      success: false,
      error: 'Erro interno do servidor',
      data: default_cta_banner
    }, status: 500
  end

  private

  def set_cors_headers
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
  end

  def default_cta_banner
    {
      id: nil,
      title: 'Pronto para começar seu projeto solar?',
      subtitle: 'Conecte-se com as melhores empresas de energia solar da sua região e receba orçamentos personalizados em minutos.',
      button1_text: 'Encontrar Empresas',
      button1_url: '/buscar',
      button2_text: 'Cadastrar Minha Empresa',
      button2_url: '/cadastrar',
      background_type: 'solid',
      background_color: '#f97316',
      background_image_url: nil,
      enabled: true,
      position: 'homepage'
    }
  end
end