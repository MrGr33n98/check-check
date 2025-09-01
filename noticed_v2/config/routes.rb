Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  get 'users/profile'
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  get 'u/:id', to: 'users#profile', as: 'user'

  # /post/1/comments/4
  resources :posts do
    resources :comments
  end

  get 'home', to: 'pages#home'
  get 'about', to: 'pages#about'
  get 'categorias', to: 'public/categories#index' # New route for category page

  namespace :empresa do
    get 'dashboard', to: 'dashboards#show'
    patch 'dashboard', to: 'dashboards#update'
  end
  
  # Banner routes
  resources :banners, only: [:index, :show] do
    member do
      post :click
      post :impression
    end
    collection do
      get 'by_position/:position', to: 'banners#by_position', as: :by_position
    end
  end

  # API routes
  namespace :api do
    namespace :v1 do
      resources :categories
      resources :solutions do
        resources :leads, shallow: true
      end
      resources :reviews
      resources :leads
      resources :members
      resources :product_accesses
      resources :sponsoreds
      resources :articles, param: :id
      resources :providers do
        resources :analytics, only: [:index, :create, :update]
        collection do
          get :search
        end
      end
      
      # Banner API routes
      resources :banners, only: [:index, :show] do
        member do
          post :click
          post :impression
        end
        collection do
          get 'by_position/:position', to: 'banners#by_position'
        end
      end
      
      # CTA Banner API routes
      get 'cta_banner', to: 'cta_banners#show'
      
      # Promotional Banners API routes
      resources :promotional_banners, only: [:index, :show] do
        member do
          post :click
          post :impression
        end
        collection do
          get 'active', to: 'promotional_banners#active'
          get 'by_position/:position', to: 'promotional_banners#by_position'
        end
      end
      
      # Dynamic Banners API routes
      resources :dynamic_banners, only: [:index] do
        member do
          post :click
          post :impression
        end
        collection do
          get :active
        end
      end
      
      # Analytics routes
      resources :analytics, only: [:index, :create, :update] do
        collection do
          get :summary
          get :dashboard
        end
      end
      
      # Solar Companies API routes
      resources :solar_companies, only: [:index, :show]
    end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'pages#home'
end
