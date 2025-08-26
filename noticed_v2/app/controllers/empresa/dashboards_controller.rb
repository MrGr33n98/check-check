class Empresa::DashboardsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_provider, only: [:show, :update]

  def show
    # The provider is already set by set_provider
  end

  def update
    if @provider.update(provider_params)
      redirect_to empresa_dashboard_path, notice: 'Company information updated successfully.'
    else
      render :show
    end
  end

  private

  def set_provider
    @provider = current_user.provider
    unless @provider
      redirect_to root_path, alert: 'You are not associated with a company.'
    end
  end

  def provider_params
    params.require(:provider).permit(
      :name, :seo_url, :title, :short_description, :country, :address,
      :phone, :members_count, :foundation_year, :revenue,
      social_links: [], tags: []
      # Add other fields that the user can customize from the Provider model
      # Be careful not to expose sensitive fields like status, approval_notes, etc.
    )
  end
end