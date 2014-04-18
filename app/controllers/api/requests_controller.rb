class Api::RequestsController < ApplicationController
  respond_to :json
  before_filter :authenticate_user!
  before_filter :set_employee, only: [:index, :create]
  before_filter :set_request, only: [:destroy, :toggle]

  def index
    authorize! :read, @employee
    @requests = @employee.requests
    render json: @requests
  end

  def create
    authorize! :read, @employee
    @request = Request.new(request_params)
    @request.employee_id = @employee.id

    if @request.save
      render json: @request
    else
      render json: { errors: @request.errors.full_messages }, status: :bad_request
    end
  end

  def destroy
    authorize! :destroy, @request
    @request.destroy
    render nothing: true
  end

  def toggle
    authorize! :update, @request
    @request.approved = !@request.approved

    if @request.save
      render json: @request
    else
      render json: { errors: @request.errors.full_messages }, status: :bad_request
    end
  end

  private

  def set_employee
    @employee = Employee.find(params[:employee_id])
  end

  def set_request
    @request = Request.find(params[:id])
  end

  def request_params
    params.require(:request).permit(:date, :approved)
  end
end
