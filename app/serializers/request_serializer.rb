class RequestSerializer < ActiveModel::Serializer
  attributes :id, :date, :approved, :employee_id
end
