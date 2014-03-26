class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :employees

  def employees
    object.employees.order(:name)
  end
end
