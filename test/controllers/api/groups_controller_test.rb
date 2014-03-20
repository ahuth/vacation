require 'test_helper'

class Api::GroupsControllerTest < ActionController::TestCase
  setup do
    sign_in users(:one)
    @group = groups(:one)
    @update = { name: "new name" }
  end

  test "should get index" do
    get :index
    assert_response :success
  end

  test "should create group" do
    assert_difference("Group.count") do
      post :create, group: @update
    end
    assert_response :success
  end

  test "should not create group if parameter missing" do
    assert_difference("Group.count", 0) do
      post :create, group: {}
    end
    assert_response :unprocessable_entity
  end

  test "should not create group if model validation fails" do
    assert_difference("Group.count", 0) do
      post :create, group: { name: "one" }
    end
    assert_response :bad_request
  end

  test "should update group" do
    patch :update, id: @group, group: @update
    assert_response :success
    assert_equal "new name", Group.first.name
  end

  test "should not update group if missing parameters" do
    patch :update, id: @group, group: {}
    assert_response :unprocessable_entity
  end

  test "should not update group if model validations fail" do
    post :create, group: @update
    patch :update, id: Group.last, group: { name: "one" }
    assert_response :bad_request
  end

  test "deny update if user is not authorized" do
    sign_out users(:one)
    sign_in users(:two)

    patch :update, id: @group, group: @update
    assert_response :forbidden
  end

  test "should destroy group" do
    assert_difference("Group.count", -1) do
      delete :destroy, id: @group
    end
    assert_response :success
  end

  test "deny destroy if user is not authorized" do
    sign_out users(:one)
    sign_in users(:two)

    assert_difference("Group.count", 0) do
      delete :destroy, id: @group
    end
    assert_response :forbidden
  end
end
