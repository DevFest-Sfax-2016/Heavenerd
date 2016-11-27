var dashboardapp = angular.module("dashboardapp", ["ngRoute"]);
dashboardapp.config(function($routeProvider) {
    $routeProvider
    .when("/dashboard", {
        templateUrl : "includes/views/dashboard.htm",
        controller : "dashbcontroller"
    })
    .when("/projects", {
        templateUrl : "includes/views/projects.htm",
        controller : "projectscontroller"
    })
    .otherwise({redirectTo : '/dashboard'});
});