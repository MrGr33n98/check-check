class Api::V1::BaseController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :doorkeeper_authorize!, if: :doorkeeper_installed?
  
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity
  
  private
  
  def current_user
    if doorkeeper_installed?
      @current_user ||= User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
    else
      super
    end
  end
  
  def doorkeeper_installed?
    defined?(Doorkeeper)
  end
  
  def not_found(exception)
    render json: { error: exception.message }, status: :not_found
  end
  
  def unprocessable_entity(exception)
    render json: { error: exception.message }, status: :unprocessable_entity
  end
end