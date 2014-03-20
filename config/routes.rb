Vacation::Application.routes.draw do
  devise_for :users
  root "welcome#index"

  namespace :api do
    resources :groups, shallow: true, except: [:new, :edit, :show] do
      resources :employees, except: [:new, :edit, :show] do
        resources :requests, except: [:new, :edit, :show, :update] do
          patch "toggle", on: :member
        end
      end
    end
  end
end
