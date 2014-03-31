class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :name, :hired, :group_id
  has_many :requests, embed: :ids
end
