Vacation::Application.routes.draw do
  devise_for :users
  root "welcome#index"

  namespace :api do
    resources :groups, shallow: true, only: [:index, :create, :update, :destroy] do
      resources :employees, only: [:index, :create, :update, :destroy] do
        resources :requests, only: [:index, :create, :destroy] do
          patch "toggle", on: :member
        end
      end
    end
  end

  get "groups/:id", to: "main#index"
  get "employees/:id", to: "main#index"
end
