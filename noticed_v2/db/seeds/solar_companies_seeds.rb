# Seeds para 5 Empresas de Energia Solar - Capitais Brasileiras
# Execute com: rails runner "load Rails.root.join('db/seeds/solar_companies_seeds.rb')"

puts "🌞 Criando empresas de energia solar das capitais brasileiras..."

# Limpar empresas existentes (opcional - descomente se quiser resetar)
# Provider.where(name: [
#   'Solar Paulista Energia',
#   'Rio Solar Energy',
#   'Minas Solar Tech',
#   'Nordeste Solar',
#   'Amazônia Solar Verde'
# ]).destroy_all

companies = [
  {
    name: 'Solar Paulista Energia',
    title: 'Líder em Energia Solar em São Paulo',
    short_description: 'Empresa líder em energia solar no estado de São Paulo com mais de 15 anos de experiência. Especializada em soluções residenciais, comerciais e industriais de alta qualidade.',
    country: 'Brasil',
    address: 'Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',
    phone: '+55 (11) 3456-7890',
    foundation_year: 2009,
    members_count: 250,
    revenue: 'R$ 45.000.000',
    status: 'active',
    social_links: [
      'https://facebook.com/solarpaulistaenergia',
      'https://linkedin.com/company/solar-paulista-energia',
      'https://instagram.com/solarpaulistaenergia',
      'https://solarpaulista.com.br'
    ],
    tags: [
      'energia solar',
      'sustentabilidade',
      'residencial',
      'comercial',
      'industrial',
      'são paulo',
      'painéis solares',
      'energia renovável'
    ]
  },
  {
    name: 'Rio Solar Energy',
    title: 'Energia Solar Carioca de Qualidade',
    short_description: 'Empresa carioca pioneira em energia solar fotovoltaica. Atendemos desde residências até grandes complexos comerciais com tecnologia de ponta e garantia estendida.',
    country: 'Brasil',
    address: 'Av. Atlântica, 1702 - Copacabana, Rio de Janeiro - RJ, 22021-001',
    phone: '+55 (21) 2345-6789',
    foundation_year: 2012,
    members_count: 180,
    revenue: 'R$ 32.000.000',
    status: 'active',
    social_links: [
      'https://facebook.com/riosolarenergy',
      'https://linkedin.com/company/rio-solar-energy',
      'https://instagram.com/riosolarenergy',
      'https://riosolar.com.br'
    ],
    tags: [
      'energia solar',
      'rio de janeiro',
      'fotovoltaica',
      'residencial',
      'comercial',
      'copacabana',
      'sustentabilidade',
      'energia limpa'
    ]
  },
  {
    name: 'Minas Solar Tech',
    title: 'Tecnologia Solar Mineira',
    short_description: 'Empresa mineira especializada em soluções sustentáveis de energia solar. Focamos em projetos personalizados com excelente custo-benefício para residências e empresas.',
    country: 'Brasil',
    address: 'Av. Afonso Pena, 1377 - Centro, Belo Horizonte - MG, 30130-012',
    phone: '+55 (31) 3234-5678',
    foundation_year: 2014,
    members_count: 95,
    revenue: 'R$ 18.500.000',
    status: 'active',
    social_links: [
      'https://facebook.com/minassolartech',
      'https://linkedin.com/company/minas-solar-tech',
      'https://instagram.com/minassolartech',
      'https://minassolar.com.br'
    ],
    tags: [
      'energia solar',
      'minas gerais',
      'belo horizonte',
      'tecnologia',
      'sustentabilidade',
      'residencial',
      'empresarial',
      'custo-benefício'
    ]
  },
  {
    name: 'Nordeste Solar',
    title: 'Aproveitando o Sol do Nordeste',
    short_description: 'Aproveitando o potencial solar único do Nordeste brasileiro. Somos especialistas em grandes projetos solares e temos a maior capacidade instalada da região.',
    country: 'Brasil',
    address: 'Av. Tancredo Neves, 1632 - Caminho das Árvores, Salvador - BA, 41820-021',
    phone: '+55 (71) 3123-4567',
    foundation_year: 2011,
    members_count: 320,
    revenue: 'R$ 65.000.000',
    status: 'active',
    social_links: [
      'https://facebook.com/nordestesolar',
      'https://linkedin.com/company/nordeste-solar',
      'https://instagram.com/nordestesolar',
      'https://nordestesolar.com.br'
    ],
    tags: [
      'energia solar',
      'nordeste',
      'salvador',
      'bahia',
      'grandes projetos',
      'usinas solares',
      'industrial',
      'alta capacidade'
    ]
  },
  {
    name: 'Amazônia Solar Verde',
    title: 'Energia Solar Sustentável para a Amazônia',
    short_description: 'Energia solar sustentável para a Amazônia. Desenvolvemos soluções ecológicas que respeitam o meio ambiente e atendem comunidades remotas e centros urbanos.',
    country: 'Brasil',
    address: 'Av. Eduardo Ribeiro, 620 - Centro, Manaus - AM, 69010-001',
    phone: '+55 (92) 3012-3456',
    foundation_year: 2016,
    members_count: 75,
    revenue: 'R$ 12.800.000',
    status: 'active',
    social_links: [
      'https://facebook.com/amazoniasolar',
      'https://linkedin.com/company/amazonia-solar-verde',
      'https://instagram.com/amazoniasolar',
      'https://amazoniasolar.com.br'
    ],
    tags: [
      'energia solar',
      'amazônia',
      'manaus',
      'sustentabilidade',
      'meio ambiente',
      'comunidades remotas',
      'ecológico',
      'energia verde'
    ]
  }
]

created_count = 0
updated_count = 0
errors = []

companies.each do |company_data|
  begin
    # Verificar se já existe uma empresa com esse nome
    existing_provider = Provider.find_by(name: company_data[:name])
    
    if existing_provider
      # Atualizar empresa existente
      if existing_provider.update(company_data)
        updated_count += 1
        puts "✅ Empresa atualizada: #{company_data[:name]}"
      else
        errors << "Erro ao atualizar #{company_data[:name]}: #{existing_provider.errors.full_messages.join(', ')}"
      end
    else
      # Criar nova empresa
      provider = Provider.new(company_data)
      
      if provider.save
        created_count += 1
        puts "✅ Empresa criada: #{company_data[:name]} (#{company_data[:address].split(',').last.strip})"
      else
        errors << "Erro ao criar #{company_data[:name]}: #{provider.errors.full_messages.join(', ')}"
      end
    end
    
  rescue => e
    errors << "Erro inesperado com #{company_data[:name]}: #{e.message}"
  end
end

puts "\n🎯 Resumo da importação:"
puts "✅ Empresas criadas: #{created_count}"
puts "🔄 Empresas atualizadas: #{updated_count}" if updated_count > 0
puts "❌ Erros: #{errors.count}" if errors.any?

if errors.any?
  puts "\n❌ Detalhes dos erros:"
  errors.each { |error| puts "  - #{error}" }
end

puts "\n🌞 Processo concluído! As empresas de energia solar estão prontas para busca."
puts "📍 Cidades cobertas: São Paulo, Rio de Janeiro, Belo Horizonte, Salvador, Manaus"