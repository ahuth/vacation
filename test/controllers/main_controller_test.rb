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

  test "should create preload" do
    get :index, id: @group.id

    group = groups(:one)
    employee = employees(:one)
    request = requests(:one)

    preload = {
      groups:    [{ id: group.id, name: "one", employee_ids: [employee.id] }],
      employees: [{ id: employee.id, name: "one", hired: "2014-02-18", group_id: group.id, request_ids: [request.id] }],
      requests:  [{ id: request.id, date: request.date, approved: true, employee_id: employee.id, group_id: group.id }],
    }

    assert_equal preload.to_json, assigns(:preload)
  end
end
