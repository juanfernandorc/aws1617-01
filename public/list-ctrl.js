angular.module("ProjectListApp").controller("ListCtrl", function($scope,$http) {
     
    function refresh() {   
    $http.get("/api/v1/projects").then(function (response){
        $scope.projects = response.data;
    });
    }
    
    $scope.addProject = function () {
      console.log($scope.newProject);  
      $http.put("/api/v1/projects/" + $scope.newProject.id, $scope.newProject).then(
    function (response) {
    // This function handles success
    refresh();
    }, 
    function (response) {
    // this function handles error
         $http.post("/api/v1/projects",$scope.newProject).then(function ()
         {
            refresh();
            }
            );
    });
      
    };
    
    $scope.deleteProjects = function () {
      $http.delete("/api/v1/projects").then(function (){
        refresh();
        });
    };
    
    
    $scope.deleteProject = function () 
    {
        $http.delete("/api/v1/projects/" + $scope.newProject.id, $scope.newProject).then(
            function (response) {
                // This function handles success
                refresh();
            }, 
            function (response) {
                // this function handles error
                 refresh();
            });
    };
    
    
    refresh();
});
