module Api
  module V1
    module Auth
      class RegistrationsController < DeviseTokenAuth::RegistrationsController
        before_action :configure_permitted_parameters

        protected

        def configure_permitted_parameters
          devise_parameter_sanitizer.permit(
            :sign_up,
            keys: [
              :name,
              :email,
              :password,
              :password_confirmation,
              :corporate_email,
              :company_name,
              :position
            ]
          )
        end

        def render_create_success
          render json: {
            status: 'success',
            data: resource_data
          }
        end

        private

        def resource_data
          {
            id: @resource.id,
            email: @resource.email,
            name: @resource.name,
            corporate_email: @resource.corporate_email,
            company_name: @resource.company_name,
            position: @resource.position,
            provider: @resource.provider,
            uid: @resource.uid,
            created_at: @resource.created_at,
            updated_at: @resource.updated_at
          }
        end
      end
    end
  end
end