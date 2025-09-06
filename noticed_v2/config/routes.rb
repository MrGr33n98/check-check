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
  
  # API routes
  namespace :api do
    namespace :v1 do
      resources :categories, only: [:index, :show]
      get 'providers/search', to: 'providers#search'
      resources :promotional_banners, only: [:index, :show] do
        member do
          post :click
          post :impression
        end
        collection do
          get 'by_position/:position', to: 'promotional_banners#by_position', as: :by_position
          get 'active', to: 'promotional_banners#active'
        end
      end
    end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'pages#home'
end
