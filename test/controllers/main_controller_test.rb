require 'test_helper'

class MainControllerTest < ActionController::TestCase
  setup do
    sign_in users(:one)
    @group = groups(:one)
  end

  test "should get index" do
    get :index, id: @group.id
    assert_response :success
  end

  test "should redirect if user is not logged in" do
    sign_out users(:one)
    get :index, id: @group.id
    assert_response :redirect
  end
end
