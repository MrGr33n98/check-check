require 'rails_helper'

RSpec.describe 'Promotional Banners API', type: :request do
  let(:valid_attributes) do
    {
      title: 'Promo',
      background_color: '#FFFFFF',
      text_color: '#000000',
      link_url: 'http://example.com',
      display_order: 1,
      active: true
    }
  end

  describe 'GET /api/v1/promotional_banners' do
    it 'returns banners' do
      PromotionalBanner.create!(valid_attributes)

      get '/api/v1/promotional_banners'

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json['data'].first['title']).to eq('Promo')
    end
  end

  describe 'GET /api/v1/promotional_banners/:id' do
    it 'returns a banner' do
      banner = PromotionalBanner.create!(valid_attributes)

      get "/api/v1/promotional_banners/#{banner.id}"

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json['data']['id']).to eq(banner.id)
    end
  end

  describe 'api_data' do
    it 'does not execute additional queries when associations are preloaded' do
      provider = Provider.create!(
        name: 'Provider',
        country: 'US',
        foundation_year: 2000,
        members_count: 10,
        status: 'active',
        city: 'NY',
        state: 'NY'
      )

      PromotionalBanner.create!(valid_attributes.merge(provider: provider))

      banners = PromotionalBanner.active.includes(:provider, icon_attachment: :blob).to_a
      queries = []
      callback = lambda do |_, _, _, _, payload|
        queries << payload[:sql] unless payload[:name] == 'SCHEMA'
      end

      ActiveSupport::Notifications.subscribed(callback, 'sql.active_record') do
        banners.map(&:api_data)
      end

      expect(queries).to be_empty
    end
  end
end
