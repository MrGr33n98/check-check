module Api
  module V1
    module Auth
      class SessionsController < DeviseTokenAuth::SessionsController
        def render_create_success
          render json: {
            status: 'success',
            data: resource_data
          }
        end

        def render_create_error_not_confirmed
          render json: {
            status: 'error',
            errors: [I18n.t('devise.failure.unconfirmed')]
          }, status: :unauthorized
        end

        def render_create_error_bad_credentials
          render json: {
            status: 'error',
            errors: [I18n.t('devise_token_auth.sessions.bad_credentials')]
          }, status: :unauthorized
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