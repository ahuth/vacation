if Rails.env.development?
  User.create(email: "one@test.com", password: "secretsecret", password_confirmation: "secretsecret")
  Group.create(name: "Plating", user_id: 1)
  Group.create(name: "Heat Treat", user_id: 1)
end
