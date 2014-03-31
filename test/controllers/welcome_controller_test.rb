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
    employee = employees(:one)
    request = requests(:one)

    preload = %Q{{"groups":[{"id":#{group.id},"name":"one","employee_ids":[#{employee.id}]}],"employees":[{"id":#{employee.id},"name":"one","hired":"#{employee.hired}","request_ids":[#{request.id}]}],"requests":[{"id":#{request.id},"date":"#{request.date}","approved":true}],"preload":{"group_ids":[#{group.id}]}}}
    assert_equal preload, assigns(:preload)
  end

  test "should not have preload when signed out" do
    get :index
    assert_not assigns(:preload)
  end
end
