class WelcomeController < ApplicationController
  def index
    if user_signed_in?
      @preload = PreloadSerializer.new(current_user, root: false).to_json
    end
  end
end
