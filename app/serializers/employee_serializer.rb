class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :name, :hired
  has_many :requests
end
