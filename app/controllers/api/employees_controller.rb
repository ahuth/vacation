class Api::EmployeesController < ApplicationController
  respond_to :json
  before_filter :authenticate_user!
  before_filter :set_group, only: [:index, :create]
  before_filter :set_employee, only: [:update, :destroy]

  def index
    authorize! :read, @group
    @employees = @group.employees
    render json: @employees
  end

  def create
    authorize! :read, @group

    @employee = Employee.new(employee_params)
    @employee.group_id = @group.id

    if @employee.save
      render json: @employee
    else
      render json: { errors: @group.errors.full_messages }, status: :bad_request
    end
  end

  def update
    authorize! :update, @employee

    if @employee.update(employee_params)
      render json: @employee
    else
      render json: { errors: @group.errors.full_messages }, status: :bad_request
    end
  end

  def destroy
    authorize! :destroy, @employee

    @employee.destroy
    render nothing: true
  end

  private

  def set_group
    @group = Group.find(params[:group_id])
  end

  def set_employee
    @employee = Employee.find(params[:id])
  end

  def employee_params
    params.require(:employee).permit(:name, :hired)
  end
end
