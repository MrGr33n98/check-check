require 'csv'

puts "Populando empresas de energia solar..."

# Limpar dados existentes
SolarCompany.destroy_all

# Ler e processar o CSV
csv_file = Rails.root.join('solar_companies.csv')

CSV.foreach(csv_file, headers: true) do |row|
  SolarCompany.create!(
    name: row['name'],
    title: row['title'],
    short_description: row['short_description'],
    country: row['country'],
    address: row['address'],
    phone: row['phone'],
    foundation_year: row['foundation_year'].to_i,
    members_count: row['members_count'].to_i,
    revenue: row['revenue'],
    social_links: row['social_links'],
    tags: row['tags'],
    status: row['status']
  )
end

puts "#{SolarCompany.count} empresas de energia solar criadas com sucesso!"