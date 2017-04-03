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
              $scope.newProject.id="";
              $scope.newProject.titulo="";
              $scope.newProject.resumen="";
              $scope.newProject.objetivo="";
              $scope.newProject.universidad="";
              $scope.newProject.grupo="";
              $scope.newProject.investigador="";
              $scope.newProject.presupuesto="";
        refresh();
    }, 
    function (response) {
    // this function handles error
         $http.post("/api/v1/projects",$scope.newProject).then(function (){
              $scope.newProject.id="";
              $scope.newProject.titulo="";
              $scope.newProject.resumen="";
              $scope.newProject.objetivo="";
              $scope.newProject.universidad="";
              $scope.newProject.grupo="";
              $scope.newProject.investigador="";
              $scope.newProject.presupuesto="";
            refresh();
            });
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
                  $scope.newProject.id="";
                  $scope.newProject.titulo="";
                  $scope.newProject.resumen="";
                  $scope.newProject.objetivo="";
                  $scope.newProject.universidad="";
                  $scope.newProject.grupo="";
                  $scope.newProject.investigador="";
                  $scope.newProject.presupuesto="";
                refresh();
            }, 
            function (response) {
                // this function handles error
                  $scope.newProject.id="";
                  $scope.newProject.titulo="";
                  $scope.newProject.resumen="";
                  $scope.newProject.objetivo="";
                  $scope.newProject.universidad="";
                  $scope.newProject.grupo="";
                  $scope.newProject.investigador="";
                  $scope.newProject.presupuesto="";
                 refresh();
            });
    };
    
    $scope.getProject = function () 
    {
        $http.get("/api/v1/projects/" + $scope.newProject.id).then(
            function (response) {
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
            });
    };
    
    $scope.actualizaProjects = function () 
    {
        $http.put("/api/v1/projects/" + $scope.newProject.id, $scope.newProject).then( function (response) {
                // This function handles success
                 $scope.newProject.id="";
                  $scope.newProject.titulo="";
                  $scope.newProject.resumen="";
                  $scope.newProject.objetivo="";
                  $scope.newProject.universidad="";
                  $scope.newProject.grupo="";
                  $scope.newProject.investigador="";
                  $scope.newProject.presupuesto="";
                refresh();
            }, 
            function (response) {
                // this function handles error
                 $scope.newProject.id="";
                  $scope.newProject.titulo="";
                  $scope.newProject.resumen="";
                  $scope.newProject.objetivo="";
                  $scope.newProject.universidad="";
                  $scope.newProject.grupo="";
                  $scope.newProject.investigador="";
                  $scope.newProject.presupuesto="";
                 refresh();
            });
    };
    
    refresh();
});
