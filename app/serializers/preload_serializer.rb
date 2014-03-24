class PreloadSerializer < ActiveModel::Serializer
  has_many :groups
  def groups
    object.groups.order(:name)
  end
end
