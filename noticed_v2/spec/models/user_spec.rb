require 'rails_helper'

RSpec.describe User, type: :model do
  it 'is invalid without an email' do
    user = User.new(name: 'Test User', password: 'password')
    expect(user).not_to be_valid
    expect(user.errors[:email]).to include("can't be blank")
  end

  it 'sets approved to false by default' do
    user = User.create!(email: 'new@example.com', name: 'New User', password: 'password123')
    expect(user.approved).to be_falsey
  end

  it 'is invalid without a name' do
    user = User.new(email: 'test@example.com', password: 'password')
    expect(user).not_to be_valid
    expect(user.errors[:name]).to include("can't be blank")
  end

  it 'validates uniqueness of email' do
    User.create!(email: 'unique@example.com', name: 'Existing', password: 'password')
    user = User.new(email: 'unique@example.com', name: 'Another', password: 'password')
    expect(user).not_to be_valid
    expect(user.errors[:email]).to include('has already been taken')
  end
end
