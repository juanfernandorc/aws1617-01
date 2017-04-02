angular.module("ProjectListApp").controller("ListCtrl", function($scope,$http) {
     
    function refresh() {   
    $http.get("/api/v1/projects").then(function (response){
        $scope.projects = response.data;
    });
    }
    
    $scope.addProject = function () {
      console.log($scope.newProject);  
      $http.post("/api/v1/projects",$scope.newProject).then(function (){
        refresh();
        });
    };
    
    refresh();
});
