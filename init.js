var rl = require ('readline');

var Spire = require('spire.io.js');
var spire = new Spire();

var appName = "Demo App";

function getAccountSecret (cb) {
  var i = rl.createInterface(process.stdin, process.stdout, null);
  i.question("Account Secret: ", function (input) {
    var secret = input;

    // These two lines together allow the program to terminate. Without
    // them, it would run forever.
    i.close();
    process.stdin.destroy();

    cb(null, secret);
  });
}

function getDemoApp (secret, cb) {
  // Login with account secret
  spire.start(secret, function (err, session) {
    if (err) return cb(err);

    // See if the application already exists
    spire.session.applicationByName(appName, function (err, app) {
      if (app) return cb (null, app);

      // Create a new application
      spire.session.createApplication(appName, function (err, app) {
        cb(null, app);
      });
    });
  });
}

getAccountSecret(function (err, secret) {
  getDemoApp(secret, function (err, app) {
    if (err) return console.error(err);

    console.log("App has been created!");
    console.log("App key: " + app.key());
  });
});
