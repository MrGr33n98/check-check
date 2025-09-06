require 'rails_helper'

RSpec.describe Api::V1::ProviderSerializer do
  describe '#as_json' do
    it 'serializes provider attributes' do
      provider = Provider.create!(
        name: 'Test Co',
        country: 'BR',
        foundation_year: 2020,
        members_count: 5,
        status: 'active',
        city: 'Sao Paulo',
        state: 'SP'
      )

      json = described_class.new(provider).as_json

      expect(json[:id]).to eq(provider.id)
      expect(json[:name]).to eq('Test Co')
      expect(json[:status]).to eq('active')
    end
  end
end
