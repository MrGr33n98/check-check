# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]

  # POST /resource/sign_in
  def create
    self.resource = warden.authenticate!(auth_options)
    set_flash_message!(:notice, :signed_in)
    sign_in(resource_name, resource)
    yield resource if block_given?
    render json: {
      status: { code: 200, message: 'Logged in successfully.' },
      user: current_user # Assuming current_user is serialized correctly
    }
  end

  # DELETE /resource/sign_out
  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    set_flash_message! :notice, :signed_out if signed_out
    yield if block_given?
    render json: {
      status: { code: 200, message: 'Logged out successfully.' }
    }
  end

  protected

  def respond_to_on_json
    render json: {
      status: { code: 200, message: 'Logged in successfully.' },
      user: current_user
    }
  end

  def respond_to_on_json_failure
    render json: {
      status: { code: 401, message: 'Invalid credentials.' }
    }, status: :unauthorized
  end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
