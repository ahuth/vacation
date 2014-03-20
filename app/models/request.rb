class Request < ActiveRecord::Base
  belongs_to :employee

  validates :date, presence: true
  validates :employee, presence: true
  validates :date, uniqueness: { scope: :employee_id }
end
