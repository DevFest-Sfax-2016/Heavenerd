devsworldapp.directive("loginModalDiv", function() {
    return {
        templateUrl : "includes/views/signin.htm"
    };
});

devsworldapp.directive("signUpModalDiv", function() {
    return {
        templateUrl : "includes/views/signup.htm"
    };
});

devsworldapp.controller("indexcontroller", function($scope) {


   

   $scope.initFirebase = function() {

    // init UI components
    this.signInButton = document.getElementById('lgnbtn');
    this.signUpButton = document.getElementById('sgnbtn');
    this.signOutButton = document.getElementById('lgtbtn');
    this.userPic = document.getElementById('user-pic');
  this.userName = document.getElementById('user-name');
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();
  // Initiates Firebase auth and listen to auth state changes.
  this.auth.onAuthStateChanged($scope.onAuthStateChanged.bind(this));
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
    
  // Sign in Firebase using popup auth and Github as the identity provider.
  $scope.checkSetup();
  $scope.initFirebase();
 
  var provider = new firebase.auth.GithubAuthProvider();
 provider.addScope('repo');
 this.auth.signInWithPopup(provider);
};

// Signs-in Dev's World. with email and password
$scope.nsignIn = function() {
 
  // Sign in Firebase using mail and password as the identity provider.
  $scope.checkSetup();
  $scope.initFirebase();
 
 var email = $scope.useremail ;
 var password =$scope.userpwd ;

 this.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  window.alert(errorMessage);
});



};


// Signs-up Dev's World. with Google
$scope.gsignUp = function() {
  // Sign up Firebase using popup auth and Google as the identity provider.
  $scope.checkSetup();
  $scope.initFirebase();
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
};


// Signs-up Dev's World. with Github
$scope.gitsignUp = function() {
  // Sign up Firebase using popup auth and Github as the identity provider.
  $scope.checkSetup();
  $scope.initFirebase();
 
  var provider = new firebase.auth.GithubAuthProvider();
 provider.addScope('repo');
 this.auth.signInWithPopup(provider);
};

// Signs-up Dev's World. with email and password
$scope.nsignUp = function() {
    
  // Sign up Firebase using mail and password as the identity provider.
  $scope.checkSetup();
  $scope.initFirebase();
 
 var email = $scope.useremail ;
 var password = $scope.userpwd ;

 this.auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  window.alert(errorMessage);
});


};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
$scope.onAuthStateChanged = function(user) {
  if (user) { // User is signed in!
   
    $scope.initFirebase();

    // Show  sign-out button.
   this.signOutButton.removeAttribute('hidden');

    // Hide sign-in button.
    this.signInButton.setAttribute('hidden', 'true');
    this.signUpButton.setAttribute('hidden', 'true');



 // Get profile pic and user's name from the Firebase user object.
    var profilePicUrl = user.photoURL;
    var userName = user.displayName;

     // Set the user's profile pic and name.
    this.userPic.style.backgroundImage = 'url(' + (profilePicUrl || '/includes/images/profile_placeholder.jpg') + ')';
    this.userName.textContent = userName;

    // We load currently existing chant messages.
    //this.loadMessages();

    // Show user's profile 
     this.userName.removeAttribute('hidden');
    this.userPic.removeAttribute('hidden');


     //$state.go('/')
  }
   else
    { // User is signed out!

    
    // Hide user's profile 
    this.userName.setAttribute('hidden', 'true');
    this.userPic.setAttribute('hidden', 'true');
    
    
    // Hide sign-out button.
    
    this.signOutButton.setAttribute('hidden', 'true');

    // Show sign-in button.
    this.signInButton.removeAttribute('hidden');
    this.signUpButton.removeAttribute('hidden');
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
  $scope.checkSetup();
  $scope.initFirebase();
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