devsworldapp.directive("modalDiv", function() {
    return {
        templateUrl : "includes/views/signin.htm"
    };
});

devsworldapp.controller("signincontroller", function($scope) {

//this.signInButton = document.getElementById('sign-in');
    //this.signInButton.addEventListener('click', this.signIn.bind(this));


    
   $scope.initFirebase = function() {
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();

  this.database = firebase.database();
  this.storage = firebase.storage();
  // Initiates Firebase auth and listen to auth state changes.
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

// Signs-in Dev's World. with Google
$scope.gsignIn = function() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  $scope.checkSetup();
  $scope.initFirebase();
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
};


// Signs-in Dev's World. with Github
$scope.gitsignIn = function() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  $scope.checkSetup();
  $scope.initFirebase();
 
  var provider = new firebase.auth.GithubAuthProvider();
 provider.addScope('repo');
 this.auth.signInWithPopup(provider)
};

// Signs-in Dev's World. with email and password
$scope.gitsignIn = function() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  $scope.checkSetup();
  $scope.initFirebase();
 
  var provider = new firebase.auth.GithubAuthProvider();
 provider.addScope('repo');
 this.auth.signInWithPopup(provider)
};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
$scope.onAuthStateChanged = function(user) {
  if (user) { // User is signed in!
    // Get profile pic and user's name from the Firebase user object.
    var profilePicUrl = user.photoURL;
    var userName = user.displayName;

    // Set the user's profile pic and name.
    this.userPic.style.backgroundImage = 'url(' + (profilePicUrl || '/images/profile_placeholder.png') + ')';
    this.userName.textContent = userName;

    // Show user's profile and sign-out button.
    this.userName.removeAttribute('hidden');
    this.userPic.removeAttribute('hidden');
    this.signOutButton.removeAttribute('hidden');

    // Hide sign-in button.
    this.signInButton.setAttribute('hidden', 'true');

    // We load currently existing chant messages.
    this.loadMessages();
  } else { // User is signed out!
    // Hide user's profile and sign-out button.
    this.userName.setAttribute('hidden', 'true');
    this.userPic.setAttribute('hidden', 'true');
    this.signOutButton.setAttribute('hidden', 'true');

    // Show sign-in button.
    this.signInButton.removeAttribute('hidden');
  }
};

// Returns true if user is signed-in. Otherwise false and displays a message.
$scope.checkSignedInWithMessage = function() {
  // Return true if the user is signed in Firebase
  if (this.auth.currentUser) {
    return true;
  }
   
}

// Signs-out of Dev's World.
$scope.signOut = function() {
  // Sign out of Firebase.
  this.auth.signOut();
};

$scope.checkSetup = function() {
  if (!window.firebase || !(firebase.app instanceof Function) || !window.config) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions.');
  } else if (config.storageBucket === '') {
    window.alert('Your Firebase Storage bucket has not been enabled. Sorry about that. This is ' +
        'actually a Firebase bug that occurs rarely. ' +
        'Please go and re-generate the Firebase initialisation snippet (step 4 of the codelab) ' +
        'and make sure the storageBucket attribute is not empty. ' +
        'You may also need to visit the Storage tab and paste the name of your bucket which is ' +
        'displayed there.');
  }
};


});