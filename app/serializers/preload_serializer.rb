class PreloadSerializer < ActiveModel::Serializer
  embed :ids, include: true

  has_many :groups

  # Serialize only the groups for the current user. Here, 'object' is the
  # current user.
  def groups
    object.groups
  end
end
