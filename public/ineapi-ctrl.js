angular.module("INEListApp").controller("INEData", function($scope, $http) {
    
        
    function refresh() {  
       getOperacionesDisponibles();
    }
    
    function getOperacionesDisponibles() {
        //console.log("1");
        $scope.operations = {};
        //console.log("2");
        $http.get("https://servicios.ine.es/wstempus/js/ES/OPERACIONES_DISPONIBLES")
        .then(function(response) {
            //console.log("3");
            $scope.operations = response.data;
            //console.log("4: " + response.data.length);
        }).catch("No array");
    }
    
    refresh();
});