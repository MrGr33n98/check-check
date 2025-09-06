require 'rails_helper'

RSpec.describe User, type: :model do
  it 'is invalid without an email' do
    user = User.new(password: 'password123')
    expect(user).not_to be_valid
    expect(user.errors[:email]).to include("can't be blank")
  end

  it 'sets approved to false by default' do
    user = User.create!(email: 'new@example.com', password: 'password123')
    expect(user.approved).to be_falsey
  end
end
