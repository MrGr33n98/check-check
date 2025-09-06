class Certification < ApplicationRecord
  has_many :provider_certifications
  has_many :providers, through: :provider_certifications
end
