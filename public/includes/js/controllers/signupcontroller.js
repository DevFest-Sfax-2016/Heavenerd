 devsworldapp.directive("indexDirective", function() {
    return {
        template : " {{ firstName + \" \" + lastName }}  <h1>Made by a directive!</h1>"
    };
});


devsworldapp.controller("indexcontroller", function($scope) {
    $scope.firstName = "John";
    $scope.lastName= "Doe";

   
});
