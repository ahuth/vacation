class WelcomeController < ApplicationController
  def index
    # If the user is signed in, render the `show` template with a data preload.
    # Otherwise, render the `index` template, which is a welcome screen.
    if user_signed_in?
      @preload = PreloadSerializer.new(current_user, root: false).to_json
      render :show if user_signed_in?
    end
  end
end
