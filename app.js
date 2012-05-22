// TODO: Put your app key here
var APP_KEY = "Ap-qAAB";

// Initialize Spire
var Spire = require('./spire.io.js')
  , spire = new Spire()
  ;

$('document').ready(function () {
  // Authentication Form elements
  var authenticationForm = $('#authenticationForm')
    , loginInput = authenticationForm.find('#login')
    , passwordInput = authenticationForm.find('#password')
    , loginButton = authenticationForm.find('#loginButton')
    , joinButton = authenticationForm.find('#joinButton')
    ;

  // Note form elements
  var noteBox = $('#noteBox')
    , noteList = noteBox.find('#noteList')
    , newNoteForm = noteBox.find('#newNoteForm')
    , newNoteInput = newNoteForm.find('#newNoteInput')
    , createNoteButton = newNoteForm.find('#createNoteButton')
    , logoutButton = noteBox.find('#logoutButton')
    ;

  var myMember = null;

  // Toggle between login form and note view
  function toggleView () {
    loginInput.val('');
    passwordInput.val('');

    authenticationForm.toggle();
    noteBox.toggle();
  }

  // Show all stored notes
  function showNotes () {
    var notes = myMember.profile().notes;

    noteList.html('');

    $(notes).each(function (i, note) {
      noteList.append('<li>' + note + '</li>');
    });
  }

  // Login button listener
  loginButton.click(function (e) {
    e.preventDefault();

    spire.getApplication(APP_KEY, function (err, app) {
      if (err) return console.error(err);
      app.authenticateMember(loginInput.val(), passwordInput.val(), function (err, member) {
        if (err) return alert("Unauthorized!");
        console.log('Authentication Successful');

        myMember = member;
        toggleView();
        showNotes();
      });
    });
  });

  // Join button listener
  joinButton.click(function (e) {
    e.preventDefault();

    spire.getApplication(APP_KEY, function (err, app) {
      if (err) return console.error(err);

      app.createMember(loginInput.val(), passwordInput.val(), function (err, member) {
        if (err && err.status === 409) return alert("User already exists!")
        if (err) return alert("Problem creating user!");
        console.log('Registration Successful');

        myMember = member;
        toggleView();
        showNotes();
      });
    });
  });

  // New note button listener
  createNoteButton.click(function (e) {
    e.preventDefault();

    var profile = myMember.profile();

    profile.notes = profile.notes || [];

    profile.notes.push(newNoteInput.val());

    myMember.update({
      profile: profile
    }, function (err, updatedMember) {
      if (err) return console.error(err);
      console.log("Note saved!");
      newNoteInput.val('').focus();
      showNotes();
    });
  });

  // Logout button listener
  logoutButton.click(function (e) {
    e.preventDefault();

    myMember = null;
    noteList.html('');
    toggleView();
  });
});
