require 'test_helper'

class WelcomeControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get preload when signed in" do
    sign_in users(:one)
    get :index

    group = groups(:one)
    assert_equal assigns(:preload), %Q{{"groups":[{"id":#{group.id},"name":"one"}]}}
  end

  test "should not have preload when signed out" do
    get :index
    assert_not assigns(:preload)
  end
end
