class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email, default: "", null: false

      t.timestamps
    end
  end
end
