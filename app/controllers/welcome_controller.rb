class WelcomeController < ApplicationController
  def index
    # If the user is signed in, show the index action on the main controller,
    # which loads the client side app.
    if user_signed_in?
      @preload = PreloadSerializer.new(current_user, root: false).to_json
      render "main/index"
    end
  end
end
