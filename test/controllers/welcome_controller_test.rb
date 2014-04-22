require 'test_helper'

class WelcomeControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get preload when signed in" do
    sign_in users(:one)
    get :index
    assert assigns(:preload)
  end

  test "should not have preload when signed out" do
    get :index
    assert_not assigns(:preload)
  end

  test "should render correct template when signed in" do
    sign_in users(:one)
    get :index
    assert_template "main/index"
  end

  test "should render correct template when signed out" do
    get :index
    assert_template "welcome/index"
  end
end
