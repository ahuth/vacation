class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :employees, embed: :ids
end
