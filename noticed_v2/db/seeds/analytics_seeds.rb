# Analytics Seeds
# Este arquivo popula dados de exemplo para o modelo Analytics

puts "Criando dados de analytics de exemplo..."

# Buscar provedores aprovados para associar aos analytics
approved_providers = Provider.where(status: 'approved').limit(10)

if approved_providers.empty?
  puts "Nenhum provedor aprovado encontrado. Criando alguns provedores de exemplo..."
  
  # Criar alguns provedores de exemplo se não existirem
  3.times do |i|
    provider = Provider.create!(
      company_name: "Empresa Solar #{i + 1}",
      email: "empresa#{i + 1}@solar.com",
      phone: "(11) 9999-#{1000 + i}",
      status: 'approved',
      address: "Rua Solar #{i + 1}, 123",
      city: "São Paulo",
      state: "SP",
      zip_code: "01234-567",
      country: "Brasil",
      company_description: "Empresa especializada em energia solar #{i + 1}",
      founded_year: 2015 + i,
      employees_count: 10 + (i * 5)
    )
    approved_providers << provider
  end
end

# Criar dados de analytics para os últimos 90 dias
start_date = 90.days.ago.to_date
end_date = Date.current

approved_providers.each do |provider|
  puts "Criando analytics para #{provider.company_name}..."
  
  # Criar dados diários para os últimos 90 dias
  (start_date..end_date).each do |date|
    # Pular alguns dias aleatoriamente para simular dados reais
    next if rand(10) < 2
    
    # Gerar métricas baseadas em tendências realistas
    base_leads = rand(5..25)
    base_views = rand(100..500)
    base_conversions = rand(1..8)
    
    # Simular crescimento ao longo do tempo
    days_from_start = (date - start_date).to_i
    growth_factor = 1 + (days_from_start * 0.002) # Crescimento gradual
    
    leads_received = (base_leads * growth_factor).round
    page_views = (base_views * growth_factor).round
    conversions = [base_conversions, leads_received].min # Conversões não podem ser maiores que leads
    
    conversion_rate = page_views > 0 ? ((conversions.to_f / page_views) * 100).round(2) : 0
    
    # Calcular crescimento mensal (comparar com mesmo dia do mês anterior)
    previous_month_date = date - 1.month
    previous_analytic = Analytic.find_by(provider: provider, date: previous_month_date)
    monthly_growth = if previous_analytic && previous_analytic.leads_received > 0
                      (((leads_received - previous_analytic.leads_received).to_f / previous_analytic.leads_received) * 100).round(2)
                    else
                      rand(-10.0..15.0).round(2)
                    end
    
    # Métricas adicionais
    response_time = rand(1..24) # horas
    average_rating = rand(3.5..5.0).round(1)
    total_reviews = rand(0..10)
    profile_views = rand(50..200)
    intention_score = rand(60..95)
    conversion_point_leads = rand(0..conversions)
    
    Analytic.create!(
      provider: provider,
      date: date,
      leads_received: leads_received,
      page_views: page_views,
      conversions: conversions,
      conversion_rate: conversion_rate,
      monthly_growth: monthly_growth,
      response_time: response_time,
      average_rating: average_rating,
      total_reviews: total_reviews,
      profile_views: profile_views,
      intention_score: intention_score,
      conversion_point_leads: conversion_point_leads
    )
  end
end

# Criar alguns registros com dados especiais para demonstração
puts "Criando registros especiais para demonstração..."

if approved_providers.any?
  top_provider = approved_providers.first
  
  # Registro com alta conversão
  Analytic.create!(
    provider: top_provider,
    date: 1.day.ago,
    leads_received: 50,
    page_views: 1000,
    conversions: 25,
    conversion_rate: 2.5,
    monthly_growth: 25.0,
    response_time: 2,
    average_rating: 4.8,
    total_reviews: 15,
    profile_views: 300,
    intention_score: 92,
    conversion_point_leads: 20
  )
  
  # Registro com crescimento excepcional
  Analytic.create!(
    provider: approved_providers.second || top_provider,
    date: Date.current,
    leads_received: 35,
    page_views: 800,
    conversions: 18,
    conversion_rate: 2.25,
    monthly_growth: 45.0,
    response_time: 1,
    average_rating: 4.9,
    total_reviews: 12,
    profile_views: 250,
    intention_score: 88,
    conversion_point_leads: 15
  )
end

total_analytics = Analytic.count
total_providers_with_analytics = Provider.joins(:analytics).distinct.count

puts "✅ Seeds de analytics criados com sucesso!"
puts "📊 Total de registros de analytics: #{total_analytics}"
puts "🏢 Provedores com analytics: #{total_providers_with_analytics}"
puts "📅 Período: #{start_date.strftime('%d/%m/%Y')} a #{end_date.strftime('%d/%m/%Y')}"

# Exibir algumas estatísticas
if Analytic.any?
  puts "\n📈 Estatísticas gerais:"
  puts "   • Total de leads: #{Analytic.sum(:leads_received)}"
  puts "   • Total de visualizações: #{Analytic.sum(:page_views)}"
  puts "   • Taxa de conversão média: #{Analytic.average(:conversion_rate).round(2)}%"
  puts "   • Crescimento médio: #{Analytic.average(:monthly_growth).round(2)}%"
end