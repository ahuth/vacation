class Employee < ActiveRecord::Base
  belongs_to :group

  validates :name, presence: true
  validates :hired, presence: true
  validates :group, presence: true
  validates :name, uniqueness: { scope: :group_id, case_sensitive: false }
end
