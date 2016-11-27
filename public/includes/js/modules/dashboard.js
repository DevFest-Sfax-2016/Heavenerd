var dashboardapp = angular.module("dashboardapp", ["ngRoute", "firebase"]).value('fbURL', 'https://devfest-6a58a.firebaseio.com/');


dashboardapp.service('fbRef', function (fbURL) {
    return new Firebase(fbURL)
});


dashboardapp.service('fbAuth', function ($q, $firebase, $firebaseAuth, fbRef) {
    var auth;
    return function () {
        if (auth) return $q.when(auth);
        var authObj = $firebaseAuth(fbRef);
        if (authObj.$getAuth()) {
            return $q.when(auth = authObj.$getAuth());
        }
        var deferred = $q.defer();
        authObj.$authAnonymously().then(function (authData) {
            auth = authData;
            deferred.resolve(authData);
        });
        return deferred.promise;
    }
});

dashboardapp.service('Projects', function ($q, $firebase, fbRef, fbAuth, projectListValue) {
    var self = this;
    this.fetch = function () {
        if (this.projects) return $q.when(this.projects);
        return fbAuth().then(function (auth) {
            var deferred = $q.defer();
            var ref = fbRef.child('projects-fresh/' + auth.auth.uid);
            var $projects = $firebase(ref);
            ref.on('value', function (snapshot) {
                if (snapshot.val() === null) {
                    $projects.$set(projectListValue);
                }
                self.projects = $projects.$asArray();
                deferred.resolve(self.projects);
            });

            //Remove projects list when no longer needed.
            ref.onDisconnect().remove();
            return deferred.promise;
        });
    };
});

dashboardapp.config(function ($routeProvider) {

    var resolveProjects = {
        projects: function (Projects) {
            return Projects.fetch();
        }
    };

    $routeProvider
    .when("/", {
        templateUrl : "includes/views/dashboard.htm",
        controller : "dashbcontroller"
    })
        .when("/projects", {
        templateUrl : "includes/views/projects.htm",
        controller : "projectscontroller"
        })
        .when('/edit/:projectId', {
            controller: 'EditProjectController as editProject',
            templateUrl: 'detail.html',
            resolve: resolveProjects
        })
        .when('/new', {
        controller: 'NewProjectController as editProject',
        templateUrl: 'detail.html',
        resolve: resolveProjects
        })
        .when("/friends", {
            templateUrl: "includes/views/friends.htm",
            controller: "friendscontroller"
        })
        .otherwise({redirectTo : '/'});
});