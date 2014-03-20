class CreateEmployees < ActiveRecord::Migration
  def change
    create_table :employees do |t|
      t.string :name
      t.date :hired
      t.references :group, index: true

      t.timestamps
    end
  end
end
