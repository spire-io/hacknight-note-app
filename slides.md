# Creating Serverless Apps with Spire.io

Nicolas LaCasse

LA Hack Night

May 23, 2012

- - -

# What is "Serverless" ?

- - -

# You want Serverless.

- Fast prototyping
- Scalable
- Secure

- - -

# Where Spire.io comes in.

- - -

# Spire.io makes APIs.

- Identity
  - Create and authenticate users
- Messaging
  - Send messages to thousands of clients in real-time
- Data (coming soon)

- - -

# Spire.io is Secure.

- Capability security (principle of least priviledge)
- All traffic in HTTPS
- No need to put password or secret in your client side code

- - -

# Spire.io is Scalable.

- Built with Node.JS, Redis, and JRuby
- Distributed architecture
  - Can add more workers as load increases
  
- - -

# Let's build a simple app!

https://github.com/spire-io/hacknight-note-app


http://iriecycle.net/hacknight/

  - Register a new user
  - Log in existing users
  - Store notes in each user's profile

- - -

https://github.com/spire-io/hacknight-note-app

# Setup: 
1. Register for a Spire.io account<br>
   _http://www.spire.io_
  
2. Create Spire Application<br>

    Node.JS: npm install spire.io.js; node init.js<br>
    Ruby: gem install spire_io; ruby init.rb



