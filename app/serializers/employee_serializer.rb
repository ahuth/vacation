class EmployeeSerializer < ActiveModel::Serializer
  embed :ids, include: true

  attributes :id, :name, :hired, :group_id
  has_many :requests
end
