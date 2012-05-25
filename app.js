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
      var html = '<li>' + note + '<a href="#" id="note-' + i + '">Delete note</a></li>';
      noteList.append(html);

      // Delete note listener
      $('#note-' + i).click(function (e) {
        e.preventDefault();
        notes.splice(i, 1);
        updateNotes(notes);
      });
    });
  }

  // Update the profile with the new note list
  function updateNotes (newNotes) {
    var profile = myMember.profile();
    profile.notes = newNotes;

    myMember.update({
      profile: profile
    }, function (err, updatedMember) {
      if (err) return console.error(err);
      console.log("Note deleted!");
      showNotes();
    });
  }

  // Login button listener
  loginButton.click(function (e) {
    e.preventDefault();

    var login = loginInput.val();
    var password = passwordInput.val();

    if (!login.length || !password.length) {
      alert("Please enter a valid login and password.");
      return;
    }

    spire.getApplication(APP_KEY, function (err, app) {
      if (err) return console.error(err);
      app.authenticateMember(login, password, function (err, member) {
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

    var login = loginInput.val();
    var password = passwordInput.val();

    if (!login.length || !password.length) {
      alert("Please enter a valid login and password.");
      return;
    }

    spire.getApplication(APP_KEY, function (err, app) {
      if (err) return console.error(err);

      app.createMember(login, password, function (err, member) {
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

    var newNote = newNoteInput.val();
    if (!newNote.length) {
      alert('Please enter a note');
      return;
    }

    var notes = myMember.profile().notes || [];
    notes.push(newNoteInput.val());
    newNoteInput.val('').focus();

    updateNotes(notes);
  });

  // Logout button listener
  logoutButton.click(function (e) {
    e.preventDefault();

    myMember = null;
    noteList.html('');
    toggleView();
  });
});
