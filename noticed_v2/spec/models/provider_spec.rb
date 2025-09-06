require 'rails_helper'

RSpec.describe Provider, type: :model do
  before do
    allow_any_instance_of(Provider).to receive(:notify_admins_of_new_provider)
  end

  it 'is invalid without a name' do
    provider = Provider.new
    expect(provider).not_to be_valid
    expect(provider.errors[:name]).to include("can't be blank")
  end

  it 'validates state format' do
    provider = Provider.new(
      name: 'Test',
      country: 'BR',
      foundation_year: 2020,
      members_count: 1,
      status: 'active',
      city: 'City',
      state: 'Invalid',
      tags: []
    )
    expect(provider).not_to be_valid
    expect(provider.errors[:state]).to be_present
  end
end
