class CreatePromotionalBanners < ActiveRecord::Migration[7.0]
  def change
    create_table :promotional_banners do |t|
      # Conteúdo do banner
      t.string :title, null: false, limit: 200
      t.string :background_color, null: false, default: '#f97316'
      t.string :text_color, null: false, default: '#ffffff'
      t.string :link_url, null: false
      
      # Controle de exibição
      t.integer :display_order, null: false, default: 1
      t.boolean :active, null: false, default: true
      t.string :position, null: false, default: 'homepage'
      
      # Associação com empresa
      t.references :provider, null: true, foreign_key: true
      
      # Parâmetros UTM para rastreamento
      t.string :utm_source, limit: 100
      t.string :utm_medium, limit: 100
      t.string :utm_campaign, limit: 100
      t.string :utm_content, limit: 100
      t.string :utm_term, limit: 100
      
      # Metadados
      t.text :notes # Notas internas para o admin
      t.datetime :start_date # Data de início (opcional)
      t.datetime :end_date # Data de fim (opcional)
      
      # Métricas básicas
      t.integer :clicks_count, default: 0
      t.integer :impressions_count, default: 0
      
      t.timestamps
    end
    
    # Índices para performance
    add_index :promotional_banners, :active
    add_index :promotional_banners, :display_order
    add_index :promotional_banners, :position
    add_index :promotional_banners, [:active, :position, :display_order], name: 'index_promotional_banners_active_position_order'
    add_index :promotional_banners, :provider_id
    add_index :promotional_banners, [:start_date, :end_date], name: 'index_promotional_banners_date_range'
    add_index :promotional_banners, :created_at
  end
end