require 'test_helper'

class Api::RequestsControllerTest < ActionController::TestCase
  setup do
    sign_in users(:one)
    @employee = employees(:one)
    @requested = requests(:one)
    @new = { date: 1.week.from_now.to_date, approved: false }
    @new_dates = [1.week.from_now.to_date, 2.weeks.from_now.to_date]
  end

  test "should get index" do
    get :index, employee_id: @employee.id
    assert_response :success
  end

  test "deny index if user is not authorized" do
    sign_out users(:one)
    sign_in users(:two)

    get :index, employee_id: @employee.id
    assert_response :forbidden
  end

  test "should create request" do
    assert_difference("Request.count") do
      post :create, employee_id: @employee.id, request: @new
    end
    assert_response :success
  end

  test "should not create request if parameter missing" do
    assert_difference("Request.count", 0) do
      post :create, employee_id: @employee.id, request: {}
    end
    assert_response :unprocessable_entity
  end

  test "should not create request if model validation fails" do
    assert_difference("Request.count", 0) do
      post :create, employee_id: @employee.id, request: { date: Date.today.to_date }
    end
    assert_response :bad_request
  end

  test "deny create if user is not authorized" do
    sign_out users(:one)
    sign_in users(:two)

    assert_difference("Request.count", 0) do
      post :create, employee_id: @employee.id, request: @update
    end
    assert_response :forbidden
  end

  test "should destroy request" do
    assert_difference("Request.count", -1) do
      delete :destroy, id: @requested
    end
    assert_response :success
  end

  test "deny destroy if user is not authorized" do
    sign_out users(:one)
    sign_in users(:two)

    assert_difference("Request.count", 0) do
      delete :destroy, id: @requested
    end
    assert_response :forbidden
  end

  test "should toggle request approval" do
    assert Request.first.approved
    patch :toggle, id: @requested
    assert_not Request.first.approved
  end

  test "deny toggle if user is not authorized" do
    sign_out users(:one)
    sign_in users(:two)

    assert Request.first.approved
    patch :toggle, id: @requested
    assert Request.first.approved
    assert_response :forbidden
  end

  test "should create many requests" do
    assert_difference("Request.count", 2) do
      post :create_many, employee_id: @employee.id, requests: @new_dates
    end
    assert_response :success
  end

  test "should not create many if missing parameters" do
    assert_difference("Request.count", 0) do
      post :create_many, employee_id: @employee.id, requests: {}
    end
    assert_response :unprocessable_entity
  end

  test "should not create many if model validations fail" do
    assert_difference("Request.count", 0) do
      post :create_many, employee_id: @employee.id, requests: [1.week.from_now.to_date, Date.today.to_date]
    end
    assert_response :bad_request
  end

  test "deny create many if user is not authroized" do
    sign_out users(:one)
    sign_in users(:two)

    assert_difference("Request.count", 0) do
      post :create_many, employee_id: @employee.id, requests: @new_dates
    end
    assert_response :forbidden
  end
end