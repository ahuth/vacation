class EmployeeSerializer < ActiveModel::Serializer
  embed :ids, include: true

  attributes :id, :name, :hired
  has_many :requests
end
