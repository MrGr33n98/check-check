# frozen_string_literal: true

class ProviderCategory < ApplicationRecord
  # se sua tabela for `provider_categories` (recomendado), isto é suficiente.
  # Se o nome da tabela for outro, descomente e ajuste:
  # self.table_name = "provider_categories"

  belongs_to :provider,  inverse_of: :provider_categories
  belongs_to :category,  inverse_of: :provider_categories

  validates :provider_id,  presence: true
  validates :category_id,  presence: true
  validates :category_id,  uniqueness: { scope: :provider_id }
end
