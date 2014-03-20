class Api::GroupsController < ApplicationController
  respond_to :json
  before_filter :authenticate_user!
  before_filter :set_group, only: [:update, :destroy]

  def index
    @groups = current_user.groups
    render json: @groups
  end

  def create
    authorize! :create, Group
    @group = Group.new(group_params)
    @group.user_id = current_user.id

    if @group.save
      render json: @group
    else
      render json: { errors: @group.errors.full_messages }, status: :bad_request
    end
  end

  def update
    authorize! :update, @group

    if @group.update(group_params)
      render json: @group
    else
      render json: { errors: @group.errors.full_messages }, status: :bad_request
    end
  end

  def destroy
    authorize! :destroy, @group
    @group.destroy
    render nothing: true
  end

  private

  def set_group
    @group = Group.find(params[:id])
  end

  def group_params
    params.require(:group).permit(:name)
  end
end
