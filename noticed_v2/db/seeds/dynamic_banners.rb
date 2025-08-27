# Dynamic Banners Seeds
# This file creates sample dynamic banners for demonstration purposes

puts "Creating Dynamic Banners..."

# Clear existing banners
DynamicBanner.destroy_all

# Sample banner data
banners_data = [
  {
    title: "Energia Solar Residencial",
    description: "Economize até 95% na sua conta de luz com energia solar. Financiamento em até 120x!",
    link_url: "/energia-solar-residencial",
    display_order: 1,
    active: true,
    image_filename: "solar-residential.jpg"
  },
  {
    title: "Empresas de Energia Solar Certificadas",
    description: "Encontre as melhores empresas de energia solar da sua região. Orçamentos gratuitos!",
    link_url: "/empresas",
    display_order: 2,
    active: true,
    image_filename: "solar-companies.jpg"
  },
  {
    title: "Simulador de Economia Solar",
    description: "Descubra quanto você pode economizar com energia solar. Simulação gratuita em 2 minutos!",
    link_url: "/simulador",
    display_order: 3,
    active: true,
    image_filename: "solar-calculator.jpg"
  },
  {
    title: "Financiamento Solar Facilitado",
    description: "Instale energia solar sem entrada. Parcelas que cabem no seu bolso!",
    link_url: "/financiamento",
    display_order: 4,
    active: true,
    image_filename: "solar-financing.jpg"
  },
  {
    title: "Energia Solar Comercial",
    description: "Reduza os custos operacionais da sua empresa com energia solar. Consultoria gratuita!",
    link_url: "/energia-solar-comercial",
    display_order: 5,
    active: false, # This one is inactive for testing
    image_filename: "solar-commercial.jpg"
  }
]

# Create banners
banners_data.each_with_index do |banner_data, index|
  banner = DynamicBanner.create!(
    title: banner_data[:title],
    description: banner_data[:description],
    link_url: banner_data[:link_url],
    display_order: banner_data[:display_order],
    active: banner_data[:active]
  )
  
  # Create a sample image using a placeholder service
  # In production, you would upload actual images
  image_url = "https://picsum.photos/800/400?random=#{index + 1}"
  
  begin
    # Download and attach the image
    require 'open-uri'
    
    image_io = URI.open(image_url)
    banner.image.attach(
      io: image_io,
      filename: banner_data[:image_filename],
      content_type: 'image/jpeg'
    )
    
    puts "✓ Created banner: #{banner.title} (#{banner.active? ? 'Active' : 'Inactive'})"
  rescue => e
    puts "⚠ Warning: Could not attach image for '#{banner.title}': #{e.message}"
    puts "  Banner created without image."
  end
end

active_count = DynamicBanner.active.count
total_count = DynamicBanner.count

puts "\n" + "="*50
puts "Dynamic Banners Seeds Complete!"
puts "Total banners created: #{total_count}"
puts "Active banners: #{active_count}"
puts "Inactive banners: #{total_count - active_count}"
puts "="*50 + "\n"

# Display instructions
puts "📋 Next Steps:"
puts "1. Run 'rails db:migrate' if you haven't already"
puts "2. Start your Rails server: 'rails server'"
puts "3. Access ActiveAdmin at: http://localhost:3000/admin"
puts "4. Go to 'Banners Dinâmicos' tab to manage banners"
puts "5. Visit your frontend to see the banners in action"
puts "\n💡 Note: Sample images are from picsum.photos"
puts "   Replace with your own images in production."