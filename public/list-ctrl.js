angular.module("ProjectListApp").controller("ListCtrl", function($scope,$http) {
     
    function refresh() {   
    $http.get("/api/v1/projects").then(function (response){
        $scope.projects = response.data;
        });
    }
    function reset(){
              $scope.newProject.id="";
              $scope.newProject.titulo="";
              $scope.newProject.resumen="";
              $scope.newProject.objetivo="";
              $scope.newProject.universidad="";
              $scope.newProject.grupo="";
              $scope.newProject.investigador="";
              $scope.newProject.presupuesto="";
    }
    
    $scope.addProject = function () {
      console.log($scope.newProject);  
      $http.put("/api/v1/projects/" + $scope.newProject.id, $scope.newProject).then(
    function (response) {
    // This function handles success
        reset();
        refresh();
    }, 
    function (response) {
    // this function handles error
         $http.post("/api/v1/projects",$scope.newProject).then(function (){
             reset();
            refresh();
            });
    });
      
    };
    
    $scope.deleteProjects = function () {
      $http.delete("/api/v1/projects").then(function (){
                 reset();
        refresh();
        });
    };
    
    
    $scope.deleteProject = function () 
    {
        $http.delete("/api/v1/projects/" + $scope.newProject.id, $scope.newProject).then(
            function (response) {
                // This function handles success
                 reset();
                refresh();
            }, 
            function (response) {
                // this function handles error
                 reset();
                 refresh();
            });
    };
    
    $scope.getProject = function () 
    {
        $http.get("/api/v1/projects/" + $scope.newProject.id).then(function (response) {
                 // This function handles success
                var resultProjects = response.data;
                $scope.projects = [];
                $scope.projects = resultProjects;
            }
            ,
            function (response) {
                // this function handles error
                $scope.projects = [];
            });
    };

    $scope.getProjects = function () 
    {
        $http.get("/api/v1/projects").then(function (response) {
                 $scope.projects = response.data;
                 reset();
            });
    };
    
    $scope.actualizaProjects = function () 
    {
        $http.put("/api/v1/projects/" + $scope.newProject.id, $scope.newProject).then( function (response) {
                // This function handles success
                reset();
                refresh();
            }, 
            function (response) {
                // this function handles error
                 reset();
                 refresh();
            });
    };
    
    refresh();
});
