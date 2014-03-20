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

  # Rescue from AccessDenied, which happens when a user does not have
  # authorization to interact with a resource.
  rescue_from(CanCan::AccessDenied) do |exception|
    render nothing: true, status: :forbidden
  end

  # Rescue from RecordInvalid, which happens when .save! fails on a model due
  # to validation failure.
  rescue_from(ActiveRecord::RecordInvalid) do |exception|
    errors = ["#{exception}"]
    render json: { errors: errors }, status: :bad_request
  end
end
