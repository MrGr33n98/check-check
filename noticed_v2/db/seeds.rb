# Create default admin user
admin_user = AdminUser.find_or_create_by(email: 'admin@example.com') do |user|
  user.password = 'password'
  user.password_confirmation = 'password'
end

puts "Admin user created: #{admin_user.email}" unless admin_user.new_record?

# Create sample users
5.times do |i|
  user = User.find_or_create_by(email: "user#{i+1}@example.com") do |u|
    u.name = "User #{i+1}"
    u.password = 'password'
    u.password_confirmation = 'password'
  end
  puts "User created: #{user.email}" unless user.new_record?
end

# Create sample posts
User.all.each do |user|
  3.times do |i|
    post = user.posts.find_or_create_by(title: "Sample Post #{i+1} for #{user.name}") do |p|
      p.body = "This is the body of sample post #{i+1} created for #{user.name}."
      p.published_at = Time.current
    end
    puts "Post created: #{post.title}" unless post.new_record?
  end
end

# Create sample comments
Post.all.each do |post|
  User.all.sample(2).each do |user|
    comment = post.comments.find_or_create_by(user: user) do |c|
      c.body = "This is a sample comment from #{user.name} on #{post.title}."
    end
    puts "Comment created: #{comment.body}" unless comment.new_record?
  end
end

# Create sample categories for SolarFinder
categories_data = [
  { name: "Geração Distribuída", description: "Soluções para residências, comércios e indústrias que produzem sua própria energia", featured: true },
  { name: "Usinas Solares de Grande Porte", description: "Construção, gestão e operação de fazendas solares", featured: true },
  { name: "Armazenamento de Energia", description: "Baterias residenciais, industriais e sistemas híbridos", featured: true },
  { name: "Energia Off-Grid", description: "Soluções isoladas para áreas rurais ou sem acesso à rede elétrica", featured: false },
  { name: "Eficiência Energética", description: "Tecnologias e softwares para reduzir desperdício e otimizar consumo", featured: false }
]

categories_data.each do |cat_data|
  category = Category.find_or_create_by(name: cat_data[:name]) do |c|
    c.description = cat_data[:description]
    c.featured = cat_data[:featured]
  end
  puts "Category created: #{category.name}" unless category.new_record?
end

# Create sample tags
tags_data = ["Fácil de usar", "Bom custo-benefício", "Integração IoT", "Análise avançada", "Suporte 24h", "API aberta", "IA", "Preventivo", "Relatórios"]
tags_data.each do |tag_name|
  tag = Tag.find_or_create_by(name: tag_name)
  puts "Tag created: #{tag.name}" unless tag.new_record?
end

# Create sample solutions
solutions_data = [
  { 
    name: "SolarMax Pro", 
    company: "EnergiaTech",
    description: "Sistema completo de monitoramento e gestão para instalações residenciais e comerciais.",
    long_description: "O SolarMax Pro é uma solução completa para gestão de energia solar que oferece monitoramento em tempo real, análise preditiva e otimização de desempenho. Com interface intuitiva e relatórios detalhados, ajuda você a maximizar o retorno sobre seu investimento em energia solar.",
    website: "https://energiatech.com/solarmax-pro",
    featured: true
  },
  { 
    name: "EcoPower Manager", 
    company: "GreenSolutions",
    description: "Plataforma de otimização de desempenho para sistemas de médio e grande porte.",
    long_description: "O EcoPower Manager é uma plataforma avançada de gestão de energia solar projetada para sistemas comerciais e industriais. Com algoritmos de IA e machine learning, otimiza automaticamente o desempenho do sistema com base em condições climáticas, consumo e outros fatores.",
    website: "https://greensolutions.com/ecopower-manager",
    featured: true
  },
  { 
    name: "SunControl", 
    company: "SolarInnovate",
    description: "Solução de controle preditivo com inteligência artificial integrada.",
    long_description: "O SunControl utiliza inteligência artificial para prever e otimizar o desempenho dos sistemas solares. Com análise preditiva avançada, identifica possíveis problemas antes que ocorram e sugere ações corretivas.",
    website: "https://solarinnovate.com/suncontrol",
    featured: false
  }
]

solutions_data.each_with_index do |sol_data, index|
  solution = Solution.find_or_create_by(name: sol_data[:name]) do |s|
    s.company = sol_data[:company]
    s.description = sol_data[:description]
    s.long_description = sol_data[:long_description]
    s.website = sol_data[:website]
    s.featured = sol_data[:featured]
    s.user = User.first
  end
  
  # Associate with categories
  categories = Category.where(featured: true).limit(2)
  solution.categories = categories unless solution.categories.any?
  
  # Associate with tags
  tags = Tag.all.sample(3)
  solution.tags = tags unless solution.tags.any?
  
  puts "Solution created: #{solution.name}" unless solution.new_record?
end

# Create sample reviews (will be created later after products are created)

# Create sample leads
Solution.all.each do |solution|
  2.times do |i|
    lead = Lead.find_or_create_by(email: "lead#{i+1}@#{solution.company.downcase.gsub(' ', '')}.com") do |l|
      l.name = "Lead #{i+1} for #{solution.name}"
      l.phone = "(11) 9#{rand(10000000..99999999)}"
      l.company = "Company #{i+1}"
      l.message = "Estou interessado em saber mais sobre a solução #{solution.name}."
      l.solution = solution
      l.status = Lead.statuses.keys.sample
    end
    puts "Lead created: #{lead.name}" unless lead.new_record?
  end
end

# Note: Members are created as CompanyMembers through the provider-user relationship

# Create sample sponsored items
sponsored_data = [
  { title: "Anúncio Principal 1", description: "Destaque no topo da página", image_url: "https://via.placeholder.com/300x250", link_url: "https://example.com", position: "header", status: "active", priority: 1, starts_at: Time.current, ends_at: 30.days.from_now },
  { title: "Anúncio Lateral 1", description: "Publicidade na barra lateral", image_url: "https://via.placeholder.com/160x600", link_url: "https://example.com", position: "sidebar", status: "active", priority: 2, starts_at: Time.current, ends_at: 15.days.from_now },
  { title: "Anúncio Rodapé 1", description: "Patrocínio no rodapé", image_url: "https://via.placeholder.com/728x90", link_url: "https://example.com", position: "footer", status: "active", priority: 3, starts_at: Time.current, ends_at: 60.days.from_now }
]

sponsored_data.each do |sponsored_item|
  sponsored = Sponsored.find_or_create_by(title: sponsored_item[:title]) do |s|
    s.description = sponsored_item[:description]
    s.image_url = sponsored_item[:image_url]
    s.link_url = sponsored_item[:link_url]
    s.position = sponsored_item[:position]
    s.status = sponsored_item[:status]
    s.priority = sponsored_item[:priority]
    s.starts_at = sponsored_item[:starts_at]
    s.ends_at = sponsored_item[:ends_at]
  end
  puts "Sponsored item created: #{sponsored.title}" unless sponsored.new_record?
end

# Create sample articles
articles_data = [
  { title: "Guia Completo sobre Energia Solar", excerpt: "Tudo o que você precisa saber sobre energia solar", content: "Conteúdo completo sobre energia solar...", author: "Redator Solar", article_category: "guides", status: "published", published_at: Time.current, featured: true },
  { title: "5 Dicas para Economizar com Energia Solar", excerpt: "Dicas práticas para reduzir custos", content: "Conteúdo com dicas práticas...", author: "Redator Solar", article_category: "tips", status: "published", published_at: Time.current, featured: false },
  { title: "Case Study: Instalação Residencial", excerpt: "História de sucesso de cliente", content: "Detalhes completos do case study...", author: "Redator Solar", article_category: "case_studies", status: "published", published_at: Time.current, featured: true }
]

articles_data.each do |article_data|
  article = Article.find_or_create_by(title: article_data[:title]) do |a|
    a.excerpt = article_data[:excerpt]
    a.content = article_data[:content]
    a.author = article_data[:author]
    a.article_category = article_data[:article_category]
    a.status = article_data[:status]
    a.published_at = article_data[:published_at]
    a.featured = article_data[:featured]
    a.category = Category.first  # Assign the first category
    a.user = User.first  # Assign the first user
  end
  puts "Article created: #{article.title}" unless article.new_record?
end

# Create sample products
products_data = [
  { name: "SolarMax Pro", seo_url: "solarmax-pro", status: "active", kind: "software", country: "Brazil", premium_until: 6.months.from_now },
  { name: "EcoPower Manager", seo_url: "ecopower-manager", status: "active", kind: "platform", country: "Brazil", premium_until: 1.year.from_now },
  { name: "SunControl", seo_url: "suncontrol", status: "active", kind: "software", country: "Brazil" },
  { name: "Solar Inverter X1", seo_url: "solar-inverter-x1", status: "active", kind: "hardware", country: "Brazil" },
  { name: "Energy Storage System", seo_url: "energy-storage-system", status: "draft", kind: "hardware", country: "Brazil" }
]

products_data.each do |product_data|
  product = Product.find_or_create_by(name: product_data[:name]) do |p|
    p.seo_url = product_data[:seo_url]
    p.status = product_data[:status]
    p.kind = product_data[:kind]
    p.country = product_data[:country]
    p.premium_until = product_data[:premium_until]
  end
  puts "Product created: #{product.name}" unless product.new_record?
end

# Create sample reviews for products
Product.where(status: :active).each do |product|
  User.all.sample(3).each do |user|
    rating = rand(3..5)
    review = Review.find_or_create_by(product: product, user: user) do |r|
      r.rating = rating
      r.title = "Excelente produto!" if rating >= 4
      r.title = "Bom produto" if rating == 3
      r.title = "Precisa de melhorias" if rating < 3
      r.comment = "Estou muito satisfeito com os resultados obtidos. O produto superou minhas expectativas em termos de eficiência e facilidade de uso." if rating >= 4
      r.comment = "O produto é bom, mas poderia ter alguns recursos a mais." if rating == 3
      r.comment = "O produto atende às necessidades básicas, mas precisa de melhorias em alguns aspectos." if rating < 3
      r.status = "approved"
      r.cliente = user.name
    end
    puts "Review created: #{review.title}" unless review.new_record?
  end
end

# Create sample providers
providers_data = [
  { 
    name: "EnergiaTech Solutions", 
    seo_url: "energiatech-solutions",
    title: "Líder em Soluções de Energia Solar",
    short_description: "Empresa especializada em desenvolvimento de software para energia solar",
    country: "Brazil",
    address: "Rua das Flores, 123 - São Paulo, SP",
    phone: "(11) 3456-7890",
    members_count: 50,
    foundation_year: 2015,
    revenue: "R$ 5-10M",
    social_links: ["https://facebook.com/energiatech", "https://linkedin.com/company/energiatech"],
    tags: ["Software", "Energia Solar", "IoT"],
    premium_until: 1.year.from_now
  },
  { 
    name: "GreenSolutions Brasil", 
    seo_url: "greensolutions-brasil",
    title: "Inovação em Energia Renovável",
    short_description: "Desenvolvimento de plataformas para gestão de energia renovável",
    country: "Brazil",
    address: "Av. Paulista, 456 - São Paulo, SP",
    phone: "(11) 2345-6789",
    members_count: 75,
    foundation_year: 2012,
    revenue: "R$ 10-50M",
    social_links: ["https://facebook.com/greensolutions", "https://twitter.com/greensolutions"],
    tags: ["Plataforma", "Gestão", "Sustentabilidade"]
  },
  { 
    name: "SolarInnovate", 
    seo_url: "solarinnovate",
    title: "Inteligência Artificial para Energia Solar",
    short_description: "Soluções de IA para otimização de sistemas solares",
    country: "Brazil",
    address: "Rua da Inovação, 789 - Rio de Janeiro, RJ",
    phone: "(21) 3456-7890",
    members_count: 30,
    foundation_year: 2018,
    revenue: "R$ 1-5M",
    social_links: ["https://linkedin.com/company/solarinnovate"],
    tags: ["IA", "Machine Learning", "Otimização"]
  }
]

providers_data.each do |provider_data|
  provider = Provider.find_or_create_by(name: provider_data[:name]) do |p|
    p.seo_url = provider_data[:seo_url]
    p.title = provider_data[:title]
    p.short_description = provider_data[:short_description]
    p.country = provider_data[:country]
    p.address = provider_data[:address]
    p.phone = provider_data[:phone]
    p.members_count = provider_data[:members_count]
    p.foundation_year = provider_data[:foundation_year]
    p.revenue = provider_data[:revenue]
    p.social_links = provider_data[:social_links]
    p.tags = provider_data[:tags]
    p.premium_until = provider_data[:premium_until]
  end
  puts "Provider created: #{provider.name}" unless provider.new_record?
end

# Create sample campaigns
Product.limit(3).each_with_index do |product, index|
  campaign = Campaign.find_or_create_by(code: "CAMP#{product.id}#{Date.current.year}") do |c|
    c.product = product
    c.title = "Campanha #{product.name} 2025"
    c.goal = [100, 200, 500].sample
    c.reached = rand(0..c.goal/2)
    c.beginners = rand(10..50)
    c.shares = rand(5..25)
    c.prize = ["Desconto 20%", "Consultoria Grátis", "Licença Premium"].sample
    c.starts_on = Date.current
    c.ends_on = 3.months.from_now
  end
  puts "Campaign created: #{campaign.title}" unless campaign.new_record?
end

# Create sample questions
Product.limit(2).each do |product|
  User.limit(3).each do |user|
    question = Question.find_or_create_by(
      user: user, 
      product: product, 
      subject: "Como integrar #{product.name} com meu sistema?"
    ) do |q|
      q.description = "Gostaria de saber mais detalhes sobre a integração do #{product.name} com sistemas existentes."
      q.status = Question.statuses.keys.sample
      q.category = Category.first
    end
    puts "Question created: #{question.subject}" unless question.new_record?
  end
end

# Create sample replies for questions
Question.limit(5).each do |question|
  reply = Reply.find_or_create_by(question: question, user: User.first) do |r|
    r.answer = "Obrigado pela pergunta! Para integrar o #{question.product&.name || 'sistema'}, você pode seguir nossa documentação técnica disponível no portal do desenvolvedor."
    r.status = Reply.statuses.keys.sample
  end
  puts "Reply created for question: #{question.subject}" unless reply.new_record?
end

# Create sample company members
Provider.all.each do |provider|
  User.limit(2).each do |user|
    company_member = CompanyMember.find_or_create_by(provider: provider, user: user) do |cm|
      cm.state = CompanyMember.states.keys.sample
    end
    puts "Company member created: #{user.name} -> #{provider.name}" unless company_member.new_record?
  end
end

# Create sample product users
Product.where(status: :active).each do |product|
  User.limit(3).each do |user|
    product_user = ProductUser.find_or_create_by(product: product, user: user) do |pu|
      pu.status = ProductUser.statuses.keys.sample
    end
    puts "Product user created: #{user.name} -> #{product.name}" unless product_user.new_record?
  end
end

# Create sample pricings
Product.all.each do |product|
  pricings_data = [
    { title: "Plano Básico", amount: 99.90, charge_type: "recurring", frequency: "monthly", display_order: 1 },
    { title: "Plano Premium", amount: 199.90, charge_type: "recurring", frequency: "monthly", display_order: 2, discount_pct: 10 },
    { title: "Plano Anual", amount: 999.90, charge_type: "recurring", frequency: "yearly", display_order: 3, discount_pct: 20 }
  ]
  
  pricings_data.each do |pricing_data|
    pricing = Pricing.find_or_create_by(product: product, title: pricing_data[:title]) do |p|
      p.amount = pricing_data[:amount]
      p.charge_type = pricing_data[:charge_type]
      p.frequency = pricing_data[:frequency]
      p.display_order = pricing_data[:display_order]
      p.discount_pct = pricing_data[:discount_pct] || 0
      p.state = "active"
      p.payment_methods = ["credit_card", "pix", "boleto"]
    end
    puts "Pricing created: #{pricing.title} for #{product.name}" unless pricing.new_record?
  end
end

# Create sample contents
Product.limit(3).each do |product|
  contents_data = [
    { title: "Guia de Instalação #{product.name}", format: "guide", level: "beginner", kind: "tutorial" },
    { title: "API Documentation #{product.name}", format: "documentation", level: "advanced", kind: "technical" },
    { title: "Video Tutorial #{product.name}", format: "video", level: "intermediate", kind: "tutorial" }
  ]
  
  contents_data.each do |content_data|
    content = Content.find_or_create_by(title: content_data[:title]) do |c|
      c.product = product
      c.short_description = "Conteúdo sobre #{product.name}"
      c.format = content_data[:format]
      c.level = content_data[:level]
      c.kind = content_data[:kind]
      c.category_tags = ["tutorial", "documentation", product.kind]
      c.source = "Internal"
      c.maker = "Team #{product.name}"
      c.active = true
    end
    puts "Content created: #{content.title}" unless content.new_record?
  end
end

# Create sample badges
badges_data = [
  { name: "Melhor Software 2024", year: 2024, edition: "Annual Awards", position: 1 },
  { name: "Inovação em IA", year: 2024, edition: "Tech Innovation", position: 2 },
  { name: "Escolha do Editor", year: 2025, edition: "Q1 Review", position: 1 }
]

badges_data.each do |badge_data|
  badge = Badge.find_or_create_by(name: badge_data[:name], year: badge_data[:year]) do |b|
    b.description = "Prêmio de reconhecimento na categoria #{badge_data[:name]}"
    b.edition = badge_data[:edition]
    b.position = badge_data[:position]
    b.category = Category.first
  end
  
  # Set products count manually for now
  badge.update_column(:products_count, rand(1..5)) if badge.persisted?
  
  puts "Badge created: #{badge.name}" unless badge.new_record?
end

# Create sample B2B ads
Provider.all.each do |provider|
  b2b_ad = B2bAd.find_or_create_by(company: provider, starts_on: Date.current) do |ad|
    ad.expires_on = 30.days.from_now
    ad.status = "active"
    ad.subscription_plan = ["basic", "premium", "enterprise"].sample
    ad.category = Category.first
    ad.provider = provider
    ad.operation = "lead_generation"
  end
  puts "B2B Ad created for: #{provider.name}" unless b2b_ad.new_record?
end

# Load analytics seeds
load Rails.root.join('db', 'seeds', 'analytics_seeds.rb')

# Load dynamic banners seeds
load Rails.root.join('db', 'seeds', 'dynamic_banners.rb')

# Load provider banners seeds
load Rails.root.join('db', 'seeds', 'provider_banners_seeds.rb')

puts "\n=== Seed data creation completed! ==="
puts "Created sample data for all models including:"
puts "- Products: #{Product.count}"
puts "- Providers: #{Provider.count}"
puts "- Campaigns: #{Campaign.count}"
puts "- Questions: #{Question.count}"
puts "- Replies: #{Reply.count}"
puts "- Company Members: #{CompanyMember.count}"
puts "- Product Users: #{ProductUser.count}"
puts "- Pricings: #{Pricing.count}"
puts "- Contents: #{Content.count}"
puts "- Badges: #{Badge.count}"
puts "- B2B Ads: #{B2bAd.count}"
puts "- Analytics: #{Analytic.count}"