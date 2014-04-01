class RequestSerializer < ActiveModel::Serializer
  attributes :id, :date, :approved, :employee_id, :group_id
  def group_id
    object.employee.group.id
  end
end
