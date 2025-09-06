module Api
  module V1
    module Auth
      class RegistrationsController < DeviseTokenAuth::RegistrationsController
        before_action :configure_permitted_parameters, only: [:create]

        protected

        def configure_permitted_parameters
          devise_parameter_sanitizer.permit(
            :sign_up,
            keys: %i[name email password password_confirmation corporate_email company_name position]
          )
        end
      end
    end
  end
end