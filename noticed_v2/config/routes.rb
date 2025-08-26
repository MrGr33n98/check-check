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
      resources :providers
    end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'pages#home'
end
