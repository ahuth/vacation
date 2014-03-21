class WelcomeController < ApplicationController
  def index
    if user_signed_in?
      @preload = make_preload.to_json
    end
  end

  private

  def make_preload
    groups = current_user.groups
    {
      groups: ActiveModel::ArraySerializer.new(groups, each_serializer: GroupSerializer)
    }
  end
end
