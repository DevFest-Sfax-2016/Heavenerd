
dashboardapp.controller("projectscontroller", function($scope) {

    var projectList = this;
    projectList.projects = projects;

       
});

dashboardapp.controller("NewProjectController", function ($location, projects) {

    var editProject = this;
    editProject.save = function () {
        projects.$add(editProject.project).then(function (data) {
            $location.path('/');
        });
    };

});

dashboardapp.controller("EditProjectController", function ($location, $routeParams, projects) {

    var editProject = this;
    var projectId = $routeParams.projectId,
        projectIndex;

    editProject.projects = projects;
    projectIndex = editProject.projects.$indexFor(projectId);
    editProject.project = editProject.projects[projectIndex];

    editProject.destroy = function () {
        editProject.projects.$remove(editProject.project).then(function (data) {
            $location.path('/');
        });
    };

    editProject.save = function () {
        editProject.projects.$save(editProject.project).then(function (data) {
            $location.path('/');
        });
    };

});


