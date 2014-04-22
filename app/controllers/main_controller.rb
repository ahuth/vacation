class MainController < ApplicationController
  before_filter :authenticate_user!

  def index
    @preload = PreloadSerializer.new(current_user, root: false).to_json
  end
end
