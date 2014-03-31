class PreloadSerializer < ActiveModel::Serializer
  attributes :groups, :employees, :requests

  def groups
    ActiveModel::ArraySerializer.new(group_array, each_serializer: GroupSerializer)
  end

  def employees
    ActiveModel::ArraySerializer.new(employee_array, each_serializer: EmployeeSerializer)
  end

  def requests
    ActiveModel::ArraySerializer.new(request_array, each_serializer: RequestSerializer)
  end

  private

  def group_array
    object.groups
  end

  def employee_array
    group_array.map { |group| group.employees }.flatten
  end

  def request_array
    employee_array.map { |employee| employee.requests }.flatten
  end
end
