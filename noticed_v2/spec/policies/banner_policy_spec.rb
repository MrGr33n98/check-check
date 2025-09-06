require 'rails_helper'

RSpec.describe BannerPolicy, type: :policy do
  let(:record) { Banner.new }

  context 'when user is an admin' do
    let(:user) { AdminUser.new }
    subject(:policy) { described_class.new(user, record) }

    it 'permits management actions' do
      expect(policy.index?).to be true
      expect(policy.show?).to be true
      expect(policy.create?).to be true
      expect(policy.update?).to be true
      expect(policy.destroy?).to be true
    end
  end

  context 'when user is a regular user' do
    let(:user) { User.new }
    subject(:policy) { described_class.new(user, record) }

    it 'denies management actions' do
      expect(policy.index?).to be false
      expect(policy.create?).to be false
      expect(policy.update?).to be false
      expect(policy.destroy?).to be false
    end
  end
end
