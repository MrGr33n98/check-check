require 'rails_helper'

RSpec.describe Category, type: :model do
  it 'is invalid without a name' do
    category = Category.new
    expect(category).not_to be_valid
    expect(category.errors[:name]).to include("can't be blank")
  end

  it 'limits promotional_text to 160 characters' do
    text = 'a' * 161
    category = Category.new(name: 'Energy', promotional_text: text)
    expect(category).not_to be_valid
    expect(category.errors[:promotional_text]).to be_present
  end
end
