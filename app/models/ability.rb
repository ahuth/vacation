class Ability
  include CanCan::Ability

  def initialize(user)
    alias_action :create, :read, :update, :destroy, :to => :crud

    can :crud, Group do |group|
      group.has_user?(user)
    end

    can :crud, Employee do |employee|
      employee.group.has_user?(user)
    end

    can :crud, Request do |request|
      request.employee.group.has_user?(user)
    end
  end
end
