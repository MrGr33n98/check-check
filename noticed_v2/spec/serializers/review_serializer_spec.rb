require 'rails_helper'

RSpec.describe Api::V1::ReviewSerializer do
  describe '#as_json' do
    it 'serializes review attributes' do
      user = User.create!(email: 'user@example.com', password: 'password')
      review = Review.create!(user: user, rating: 4, title: 'Good', comment: 'Nice', status: 'approved')

      json = described_class.new(review).as_json

      expect(json[:rating]).to eq(4)
      expect(json[:title]).to eq('Good')
      expect(json[:user_id]).to eq(user.id)
    end
  end
end
