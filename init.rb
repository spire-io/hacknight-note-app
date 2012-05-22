require 'rubygems'
require 'spire_io'

appName = "Demo App"

puts "Account Secret: "
secret = gets.chomp

spire = Spire.new()
spire.start(secret)

app = spire.find_or_create_application(appName)
puts "App has been created!"
puts "App key: #{app.key}"
