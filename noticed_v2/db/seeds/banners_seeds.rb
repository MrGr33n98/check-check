# Seeds para Banners

print "Criando banners de exemplo..."

# Limpar banners existentes em desenvolvimento
if Rails.env.development?
  Banner.destroy_all
end

# Buscar algumas categorias e provedores existentes
categories = Category.limit(3)
providers = Provider.limit(2)

# Banner 1: Header Desktop
banner1 = Banner.create!(
  title: "Energia Solar Residencial - Economize até 95%",
  description: "Descubra como a energia solar pode reduzir drasticamente sua conta de luz. Solicite um orçamento gratuito!",
  link_url: "https://exemplo.com/energia-solar-residencial",
  banner_type: :header,
  status: :active,
  device_target: :desktop,
  priority: 1,
  starts_at: 1.day.ago,
  ends_at: 3.months.from_now,
  show_close_button: false,
  display_frequency: 1,
  custom_css: "
    .banner-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 8px;
    }
    .banner-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .banner-description {
      font-size: 16px;
      opacity: 0.9;
    }
  ",
  custom_html: "
    <div class='banner-header'>
      <div class='banner-title'>🌞 Energia Solar Residencial - Economize até 95%</div>
      <div class='banner-description'>Descubra como a energia solar pode reduzir drasticamente sua conta de luz. Solicite um orçamento gratuito!</div>
    </div>
  "
)

# Associar categorias ao banner1
banner1.categories = categories.limit(2) if categories.any?

print "."

# Banner 2: Sidebar Mobile
banner2 = Banner.create!(
  title: "Instalação Solar Comercial",
  description: "Soluções em energia solar para empresas. ROI garantido em 3 anos.",
  link_url: "https://exemplo.com/energia-solar-comercial",
  banner_type: :sidebar,
  status: :active,
  device_target: :mobile,
  priority: 2,
  starts_at: Time.current,
  ends_at: 2.months.from_now,
  provider: providers.first,
  show_close_button: true,
  display_frequency: 2, # Uma vez por sessão
  custom_css: "
    .banner-sidebar {
      background: #f8f9fa;
      border: 2px solid #28a745;
      border-radius: 12px;
      padding: 15px;
      text-align: center;
      position: relative;
    }
    .banner-icon {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .banner-title {
      font-size: 18px;
      font-weight: bold;
      color: #28a745;
      margin-bottom: 8px;
    }
    .banner-description {
      font-size: 14px;
      color: #6c757d;
      margin-bottom: 12px;
    }
    .banner-cta {
      background: #28a745;
      color: white;
      padding: 8px 16px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: bold;
      display: inline-block;
    }
  ",
  custom_html: "
    <div class='banner-sidebar'>
      <div class='banner-icon'>🏢</div>
      <div class='banner-title'>Instalação Solar Comercial</div>
      <div class='banner-description'>Soluções em energia solar para empresas. ROI garantido em 3 anos.</div>
      <a href='#' class='banner-cta'>Saiba Mais</a>
    </div>
  "
)

# Associar uma categoria ao banner2
banner2.categories = [categories.first] if categories.any?

print "."

# Banner 3: Footer com imagem (simulado com HTML)
banner3 = Banner.create!(
  title: "Manutenção de Sistemas Solares",
  description: "Mantenha seu sistema solar funcionando com máxima eficiência. Agende uma revisão.",
  link_url: "https://exemplo.com/manutencao-solar",
  banner_type: :footer,
  status: :active,
  device_target: :all,
  priority: 3,
  starts_at: Time.current,
  ends_at: 1.month.from_now,
  provider: providers.last,
  show_close_button: false,
  display_frequency: 1,
  custom_css: "
    .banner-footer {
      background: linear-gradient(90deg, #ff7b7b 0%, #ff9a56 100%);
      color: white;
      padding: 25px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20px 0;
    }
    .banner-content {
      flex: 1;
    }
    .banner-title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 8px;
    }
    .banner-description {
      font-size: 14px;
      opacity: 0.9;
    }
    .banner-icon {
      font-size: 48px;
      margin-left: 20px;
    }
    @media (max-width: 768px) {
      .banner-footer {
        flex-direction: column;
        text-align: center;
      }
      .banner-icon {
        margin: 15px 0 0 0;
      }
    }
  ",
  custom_html: "
    <div class='banner-footer'>
      <div class='banner-content'>
        <div class='banner-title'>🔧 Manutenção de Sistemas Solares</div>
        <div class='banner-description'>Mantenha seu sistema solar funcionando com máxima eficiência. Agende uma revisão.</div>
      </div>
      <div class='banner-icon'>⚡</div>
    </div>
  "
)

print "."

# Banner 4: Popup promocional
banner4 = Banner.create!(
  title: "Oferta Especial - 20% de Desconto",
  description: "Por tempo limitado! Ganhe 20% de desconto na instalação do seu sistema solar.",
  link_url: "https://exemplo.com/promocao-solar",
  banner_type: :popup,
  status: :active,
  device_target: :desktop,
  priority: 0, # Maior prioridade
  starts_at: Time.current,
  ends_at: 2.weeks.from_now,
  show_close_button: true,
  display_frequency: 3, # Uma vez por dia
  conversion_tracking_code: "<!-- Google Analytics Event -->
<script>
  gtag('event', 'banner_view', {
    'event_category': 'Banner',
    'event_label': 'Popup Promocional',
    'banner_id': '4'
  });
</script>",
  custom_css: "
    .banner-popup {
      background: white;
      border-radius: 15px;
      padding: 30px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      max-width: 500px;
      position: relative;
    }
    .banner-badge {
      background: #ff4757;
      color: white;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
      display: inline-block;
      margin-bottom: 15px;
    }
    .banner-title {
      font-size: 24px;
      font-weight: bold;
      color: #2c3e50;
      margin-bottom: 15px;
    }
    .banner-description {
      font-size: 16px;
      color: #7f8c8d;
      margin-bottom: 25px;
      line-height: 1.5;
    }
    .banner-cta {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 30px;
      border-radius: 25px;
      text-decoration: none;
      font-weight: bold;
      display: inline-block;
      transition: transform 0.2s;
    }
    .banner-cta:hover {
      transform: translateY(-2px);
    }
    .banner-close {
      position: absolute;
      top: 15px;
      right: 15px;
      background: #ecf0f1;
      border: none;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      cursor: pointer;
      font-size: 16px;
      color: #7f8c8d;
    }
  ",
  custom_html: "
    <div class='banner-popup'>
      <div class='banner-badge'>OFERTA LIMITADA</div>
      <div class='banner-title'>🎉 20% de Desconto na Instalação Solar!</div>
      <div class='banner-description'>Aproveite nossa promoção especial e economize ainda mais na sua transição para energia limpa e renovável.</div>
      <a href='#' class='banner-cta'>Quero Aproveitar!</a>
    </div>
  "
)

print "."

# Banner 5: Mobile Sticky
banner5 = Banner.create!(
  title: "Calculadora Solar Gratuita",
  description: "Descubra quanto você pode economizar com energia solar",
  link_url: "https://exemplo.com/calculadora-solar",
  banner_type: :mobile_sticky,
  status: :active,
  device_target: :mobile,
  priority: 1,
  starts_at: Time.current,
  ends_at: 6.months.from_now,
  show_close_button: true,
  display_frequency: 2,
  custom_css: "
    .banner-mobile-sticky {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.2);
    }
    .banner-content {
      flex: 1;
      margin-right: 10px;
    }
    .banner-title {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 2px;
    }
    .banner-description {
      font-size: 12px;
      opacity: 0.9;
    }
    .banner-cta {
      background: rgba(255,255,255,0.2);
      color: white;
      padding: 8px 12px;
      border-radius: 15px;
      text-decoration: none;
      font-size: 12px;
      font-weight: bold;
      white-space: nowrap;
    }
    .banner-close {
      background: rgba(255,255,255,0.2);
      color: white;
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      margin-left: 10px;
      cursor: pointer;
      font-size: 14px;
    }
  ",
  custom_html: "
    <div class='banner-mobile-sticky'>
      <div class='banner-content'>
        <div class='banner-title'>📱 Calculadora Solar Gratuita</div>
        <div class='banner-description'>Descubra quanto você pode economizar</div>
      </div>
      <a href='#' class='banner-cta'>Calcular</a>
    </div>
  "
)

print "."

# Banner 6: Hero com imagem (simulado)
banner6 = Banner.create!(
  title: "Energia Solar para Sua Casa",
  description: "Transforme sua casa em uma usina de energia limpa e renovável. Economia garantida desde o primeiro mês.",
  link_url: "https://exemplo.com/energia-solar-residencial",
  banner_type: :hero,
  status: :active,
  device_target: :all,
  priority: 1,
  starts_at: Time.current,
  ends_at: 3.months.from_now,
  show_close_button: false,
  display_frequency: 1,
  custom_css: "
    .banner-hero {
      background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><rect fill="%234a90e2" width="1200" height="600"/><circle fill="%23f5a623" cx="200" cy="150" r="80"/><rect fill="%23ffffff" x="400" y="200" width="400" height="200" rx="10"/><rect fill="%232c3e50" x="420" y="220" width="360" height="160" rx="5"/></svg>');
      background-size: cover;
      background-position: center;
      color: white;
      padding: 80px 20px;
      text-align: center;
      border-radius: 15px;
      margin: 20px 0;
    }
    .banner-title {
      font-size: 48px;
      font-weight: bold;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }
    .banner-description {
      font-size: 20px;
      margin-bottom: 30px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.6;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    }
    .banner-cta {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 15px 40px;
      border-radius: 30px;
      text-decoration: none;
      font-size: 18px;
      font-weight: bold;
      display: inline-block;
      transition: transform 0.3s, box-shadow 0.3s;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
    .banner-cta:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.3);
    }
    @media (max-width: 768px) {
      .banner-hero {
        padding: 60px 15px;
      }
      .banner-title {
        font-size: 32px;
      }
      .banner-description {
        font-size: 16px;
      }
      .banner-cta {
        font-size: 16px;
        padding: 12px 30px;
      }
    }
  ",
  custom_html: "
    <div class='banner-hero'>
      <div class='banner-title'>🏠 Energia Solar para Sua Casa</div>
      <div class='banner-description'>Transforme sua casa em uma usina de energia limpa e renovável. Economia garantida desde o primeiro mês.</div>
      <a href='#' class='banner-cta'>Solicitar Orçamento Gratuito</a>
    </div>
  "
)

# Associar todas as categorias ao banner hero
banner6.categories = categories if categories.any?

print "."

# Simular algumas impressões e cliques para demonstração
[banner1, banner2, banner3, banner4, banner5, banner6].each do |banner|
  banner.update!(
    impression_count: rand(100..1000),
    click_count: rand(5..50)
  )
end

print " ✓\n"

puts "Banners criados com sucesso!"
puts "- #{Banner.count} banners no total"
puts "- #{Banner.active.count} banners ativos"
puts "- #{Banner.joins(:categories).distinct.count} banners com categorias associadas"
puts "- #{Banner.where.not(provider: nil).count} banners com provedores associados"