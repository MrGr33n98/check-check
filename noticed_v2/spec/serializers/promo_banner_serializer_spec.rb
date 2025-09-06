require 'rails_helper'

RSpec.describe Api::V1::PromoBannerSerializer do
  describe '#as_json' do
    it 'serializes promo banner attributes' do
      banner = PromoBanner.create!(
        title: 'Promo',
        position: 'header',
        background_color: '#000000',
        text_color: '#ffffff',
        priority: 1
      )

      json = described_class.new(banner).as_json

      expect(json[:title]).to eq('Promo')
      expect(json[:position]).to eq('header')
    end
  end
end
