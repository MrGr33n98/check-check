class AddBannerImageToProviders < ActiveRecord::Migration[7.0]
  def change
    # ActiveStorage já gerencia os attachments automaticamente
    # Não é necessário adicionar colunas para has_one_attached
    # Esta migration serve apenas como registro da mudança
  end
end