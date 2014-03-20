require 'test_helper'

class Api::EmployeesControllerTest < ActionController::TestCase
  setup do
    sign_in users(:one)
    @group = groups(:one)
    @employee = employees(:one)
    @update = { name: "Test", hired: Date.today.to_date }
  end

  test "should get index" do
    get :index, group_id: @group.id
    assert_response :success
  end

  test "deny index if user is not authorized" do
    sign_out users(:one)
    sign_in users(:two)

    get :index, group_id: @group.id
    assert_response :forbidden
  end

  test "should create employee" do
    assert_difference("Employee.count") do
      post :create, group_id: @group.id, employee: @update
    end
    assert_response :success
  end

  test "should not create employee if missing parameters" do
    assert_difference("Employee.count", 0) do
      post :create, group_id: @group.id, employee: {}
    end
    assert_response :unprocessable_entity
  end

  test "should not create employee if model validations fail" do
    assert_difference("Employee.count", 0) do
      post :create, group_id: @group.id, employee: { name: "One", hired: Date.today.to_date }
    end
    assert_response :bad_request
  end

  test "deny create if user is not authorized" do
    sign_out users(:one)
    sign_in users(:two)

    assert_difference("Employee.count", 0) do
      post :create, group_id: @group.id, employee: @update
    end
    assert_response :forbidden
  end

  test "should update employee" do
    patch :update, id: @employee, employee: @update
    assert_response :success
    assert_equal "Test", Employee.first.name
  end

  test "should not update employee if missing params" do
    patch :update, id: @employee, employee: {}
    assert_response :unprocessable_entity
  end

  test "should not update employee if model validations fail" do
    post :create, group_id: @group.id, employee: @update
    patch :update, id: Employee.last.id, employee: { name: "one" }
    assert_response :bad_request
  end

  test "deny update if user is not authorized" do
    sign_out users(:one)
    sign_in users(:two)

    patch :update, id: @employee, employee: @update
    assert_response :forbidden
  end

  test "should destroy employee" do
    assert_difference("Employee.count", -1) do
      delete :destroy, id: @employee
    end
    assert_response :success
  end

  test "deny destroy if user is not authorized" do
    sign_out users(:one)
    sign_in users(:two)

    assert_difference("Employee.count", 0) do
      delete :destroy, id: @employee
    end
    assert_response :forbidden
  end
end
