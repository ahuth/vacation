class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # Rescue from ParametersMissing, which happens when a required parameter is
  # an empty object {}.
  rescue_from(ActionController::ParameterMissing) do |exception|
    errors = ["#{exception}"]
    render json: { errors: errors }, status: :unprocessable_entity
  end
end
