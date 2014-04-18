class AddDefaultValueToApprovedAttribute < ActiveRecord::Migration
  def change
    change_column :requests, :approved, :boolean, default: true
  end
end
