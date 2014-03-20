require 'test_helper'

class AbilityTest < ActiveSupport::TestCase
  setup do
    @user1 = Ability.new(users(:one))
    @user2 = Ability.new(users(:two))
  end

  test "users can create groups" do
    assert @user1.can?(:create, Group)
    assert @user2.can?(:create, Group)
  end

  test "users can only read their groups" do
    assert @user1.can?(:read, groups(:one))
    assert @user2.cannot?(:read, groups(:one))
  end

  test "users can only update their groups" do
    assert @user1.can?(:update, groups(:one))
    assert @user2.cannot?(:update, groups(:one))
  end

  test "users can only destroy their groups" do
    assert @user1.can?(:destroy, groups(:one))
    assert @user2.cannot?(:destroy, groups(:one))
  end

  test "users can only read their employees" do
    assert @user1.can?(:read, employees(:one))
    assert @user2.cannot?(:read, employees(:one))
  end

  test "users can only update their employees" do
    assert @user1.can?(:update, employees(:one))
    assert @user2.cannot?(:update, employees(:one))
  end

  test "users can only destroy their employees" do
    assert @user1.can?(:destroy, employees(:one))
    assert @user2.cannot?(:destroy, employees(:one))
  end

  test "users can only read their requests" do
    assert @user1.can?(:read, requests(:one))
    assert @user2.cannot?(:read, requests(:one))
  end

  test "users can only update their requests" do
    assert @user1.can?(:update, requests(:one))
    assert @user2.cannot?(:update, requests(:one))
  end

  test "users can only destroy their requests" do
    assert @user1.can?(:destroy, requests(:one))
    assert @user2.cannot?(:destroy, requests(:one))
  end
end
