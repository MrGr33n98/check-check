class Api::V1::BaseController < ApplicationController
  protect_from_forgery with: :null_session

  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity
  rescue_from StandardError, with: :internal_server_error

  private

  def not_found(exception)
    render json: { errors: [{ status: '404', title: 'Not Found', detail: exception.message }] }, status: :not_found
  end

  def unprocessable_entity(exception)
    render json: { errors: [{ status: '422', title: 'Unprocessable Entity', detail: exception.message }] }, status: :unprocessable_entity
  end

  def internal_server_error(exception)
    Rails.logger.error("Internal Server Error: #{exception.message} #{exception.backtrace.join("\n")}")
    render json: { errors: [{ status: '500', title: 'Internal Server Error', detail: 'An unexpected error occurred.' }] }, status: :internal_server_error
  end
end

