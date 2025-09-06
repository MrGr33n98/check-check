class ProviderCertification < ApplicationRecord
  belongs_to :provider
  belongs_to :certification

  validates :provider_id, uniqueness: { scope: :certification_id }
end
