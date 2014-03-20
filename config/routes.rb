Vacation::Application.routes.draw do
  devise_for :users
  root "welcome#index"

  namespace :api do
    resources :groups, shallow: true, except: [:new, :edit, :show] do
      resources :employees, except: [:new, :edit, :show]
    end
  end
end
