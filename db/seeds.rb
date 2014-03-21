if Rails.env.development?
  User.create(email: "one@test.com", password: "secretsecret", password_confirmation: "secretsecret")
  Group.create(name: "Plating", user_id: 1)
  Group.create(name: "Heat Treat", user_id: 1)
  Employee.create(name: "Andrew", hired: 1.day.ago.to_date, group_id: 1)
  Request.create(date: Date.today.to_date, approved: true, employee_id: 1)
end
