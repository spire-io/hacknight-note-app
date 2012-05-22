hacknight-note-app
==================

A simple note-saving app using Spire.io identity API

## Register

Register for a Spire.io account at [www.spire.io][spire].

## Set up an application

Once you have a Spire account, you must create an application.
Currently, the easiest way to do this is through one of the client libraries.

We will soon have a web interface for creating new applications.

If you have Node.JS + npm:

    npm install spire.io.js
    node init.js

If you have Ruby:

    gem install spire_io
    ruby init.rb

The script will prompt you for your account secret, which you can find on the [account page][account].

Once the script has created your new application, it will tell you the *application key*.

Put this application key at the top of your application.js file.

## Host the client code

Host index.html, application.js, and spire.io.bundle.js somewhere, and point your browser to it.

[spire]: http://www.spire.io
[account]: http://www.spire.io/account/index.html
