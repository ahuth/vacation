class Group < ActiveRecord::Base
  belongs_to :user
  has_many :employees, dependent: :destroy

  validates :name, presence: true
  validates :name, uniqueness: { scope: :user_id, case_sensitive: false }

  def has_user?(user)
    self.user == user
  end
end
