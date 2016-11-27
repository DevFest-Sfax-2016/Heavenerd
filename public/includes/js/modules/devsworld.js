var devsworldapp = angular.module("devsworldapp", ["ngRoute"]);
devsworldapp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "includes/views/indexview.htm",
        controller : "indexcontroller"
    })
    .when("/signin", {
        templateUrl : "includes/views/signin.htm",
        controller : "signincontroller"
    })
    .when("/signup", {
        templateUrl : "includes/views/signup.htm",
        controller : "signupcontroller"
    })
    .when("/dashboard", {
        templateUrl : "includes/views/dashboard.htm",
        controller : "dashbcontroller"
    });
});