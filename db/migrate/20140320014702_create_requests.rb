class CreateRequests < ActiveRecord::Migration
  def change
    create_table :requests do |t|
      t.date :date
      t.boolean :approved
      t.references :employee, index: true

      t.timestamps
    end
  end
end
