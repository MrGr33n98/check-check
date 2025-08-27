# Provider Banner Images Seeds
# This file adds default banner images to existing providers

puts "Adding banner images to providers..."

# Sample banner images URLs (using placeholder service)
banner_images = [
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80", # Solar panels on roof
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80", # Solar farm
  "https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80", # Modern solar installation
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80", # Solar panels with sky
  "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80", # Green energy concept
  "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80", # Solar technology
  "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80", # Renewable energy
  "https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80", # Solar field
  "https://images.unsplash.com/photo-1548337138-e87d889cc369?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80", # Clean energy
  "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80"  # Solar innovation
]

# Logo images URLs (using placeholder service)
logo_images = [
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80", # Tech logo style
  "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80", # Green tech
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80", # Solar symbol
  "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80", # Energy icon
  "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80", # Innovation logo
  "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80", # Renewable logo
  "https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80", # Solar logo
  "https://images.unsplash.com/photo-1548337138-e87d889cc369?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80", # Clean logo
  "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80", # Innovation
  "https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"  # Modern tech
]

# Update existing providers with banner and logo images
Provider.all.each_with_index do |provider, index|
  begin
    # Skip if provider already has a banner image
    if provider.banner_image.attached?
      puts "Provider #{provider.name} already has a banner image, skipping..."
      next
    end

    # Select banner and logo images (cycle through available images)
    banner_url = banner_images[index % banner_images.length]
    logo_url = logo_images[index % logo_images.length]

    # Download and attach banner image
    require 'open-uri'
    
    begin
      banner_file = URI.open(banner_url)
      provider.banner_image.attach(
        io: banner_file,
        filename: "banner_#{provider.seo_url}.jpg",
        content_type: 'image/jpeg'
      )
      puts "✓ Banner image attached to #{provider.name}"
    rescue => e
      puts "✗ Failed to attach banner image to #{provider.name}: #{e.message}"
    end

    # Download and attach logo image if not present
    unless provider.logo.attached?
      begin
        logo_file = URI.open(logo_url)
        provider.logo.attach(
          io: logo_file,
          filename: "logo_#{provider.seo_url}.jpg",
          content_type: 'image/jpeg'
        )
        puts "✓ Logo image attached to #{provider.name}"
      rescue => e
        puts "✗ Failed to attach logo image to #{provider.name}: #{e.message}"
      end
    end

    # Add some additional provider data if missing
    if provider.description.blank?
      provider.update!(
        description: "#{provider.title} - #{provider.short_description}. Empresa especializada em soluções de energia solar com foco em inovação e sustentabilidade.",
        rating: rand(3.5..5.0).round(1),
        price_range: ["$", "$$", "$$$"].sample,
        services: ["Instalação Solar", "Consultoria", "Manutenção", "Monitoramento"].sample(rand(2..4)),
        certifications: ["INMETRO", "ANEEL", "ISO 9001"].sample(rand(1..3))
      )
      puts "✓ Additional data added to #{provider.name}"
    end

  rescue => e
    puts "✗ Error processing provider #{provider.name}: #{e.message}"
  end
end

# Create additional sample providers with banner images if we have less than 10
if Provider.count < 10
  additional_providers = [
    {
      name: "SolarTech Inovação",
      seo_url: "solartech-inovacao",
      title: "Tecnologia Solar Avançada",
      short_description: "Soluções tecnológicas para energia solar",
      country: "Brazil",
      address: "Rua da Tecnologia, 100 - Belo Horizonte, MG",
      phone: "(31) 3333-4444",
      members_count: 25,
      foundation_year: 2020,
      revenue: "R$ 1-5M",
      social_links: ["https://linkedin.com/company/solartech-inovacao"],
      tags: ["Tecnologia", "Inovação", "Solar"]
    },
    {
      name: "EcoSolar Brasil",
      seo_url: "ecosolar-brasil",
      title: "Energia Limpa e Sustentável",
      short_description: "Especialistas em energia solar sustentável",
      country: "Brazil",
      address: "Av. Verde, 200 - Curitiba, PR",
      phone: "(41) 4444-5555",
      members_count: 40,
      foundation_year: 2017,
      revenue: "R$ 5-10M",
      social_links: ["https://facebook.com/ecosolar", "https://instagram.com/ecosolar"],
      tags: ["Sustentabilidade", "Energia Limpa", "Consultoria"]
    },
    {
      name: "PowerSun Solutions",
      seo_url: "powersun-solutions",
      title: "Soluções Completas em Energia Solar",
      short_description: "Do projeto à instalação, soluções completas",
      country: "Brazil",
      address: "Rua do Sol, 300 - Salvador, BA",
      phone: "(71) 5555-6666",
      members_count: 60,
      foundation_year: 2014,
      revenue: "R$ 10-50M",
      social_links: ["https://linkedin.com/company/powersun"],
      tags: ["Instalação", "Projeto", "Manutenção"]
    }
  ]

  additional_providers.each_with_index do |provider_data, index|
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
      p.description = "#{provider_data[:title]} - #{provider_data[:short_description]}. Empresa especializada em soluções de energia solar."
      p.rating = rand(3.5..5.0).round(1)
      p.price_range = ["$", "$$", "$$$"].sample
      p.services = ["Instalação Solar", "Consultoria", "Manutenção", "Monitoramento"].sample(rand(2..4))
      p.certifications = ["INMETRO", "ANEEL", "ISO 9001"].sample(rand(1..3))
    end

    if provider.persisted? && !provider.banner_image.attached?
      begin
        # Use different images for new providers
        banner_index = (Provider.count + index) % banner_images.length
        logo_index = (Provider.count + index) % logo_images.length
        
        banner_url = banner_images[banner_index]
        logo_url = logo_images[logo_index]

        # Attach banner
        banner_file = URI.open(banner_url)
        provider.banner_image.attach(
          io: banner_file,
          filename: "banner_#{provider.seo_url}.jpg",
          content_type: 'image/jpeg'
        )

        # Attach logo
        logo_file = URI.open(logo_url)
        provider.logo.attach(
          io: logo_file,
          filename: "logo_#{provider.seo_url}.jpg",
          content_type: 'image/jpeg'
        )

        puts "✓ New provider created with images: #{provider.name}"
      rescue => e
        puts "✗ Error creating provider #{provider.name}: #{e.message}"
      end
    end
  end
end

puts "\n=== Provider Banner Seeds Completed! ==="
puts "Total providers: #{Provider.count}"
puts "Providers with banner images: #{Provider.joins(:banner_image_attachment).count}"
puts "Providers with logos: #{Provider.joins(:logo_attachment).count}"

puts "\n💡 Note: Images are from Unsplash and are for demonstration purposes."
puts "   Replace with actual company images in production."