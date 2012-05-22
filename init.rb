require 'rubygems'
require 'spire_io'

app_name = "Demo App"

puts "Account Secret: "
secret = gets.chomp

spire = Spire.new()
spire.start(secret)

app = spire.find_or_create_application(app_name)
puts "App has been created!"
puts "App key: #{app.key}"
