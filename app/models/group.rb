class Group < ActiveRecord::Base
  belongs_to :user

  validates :name, presence: true
  validates :name, uniqueness: { scope: :user_id, case_sensitive: false }

  def has_user?(user)
    self.user == user
  end
end
