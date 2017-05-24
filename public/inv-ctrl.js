angular.module("DatosInv").controller("InvData", function($scope, $http) {
    
    /* 
    function refresh() {  
       getInvData();
    
    */
    
    $scope.getInvData = function(){
        console.log("1");
        $scope.invdata = [];
        console.log("2");
        $http.get("https://api.elsevier.com/content/search/author?apikey=3f7cfe68209df70691bbc22bd225b8cf&query=ORCID(" + $scope.searchOrcid + ")")
        .then(function(response) {
            console.log("3: " + response.data);
            $scope.invdata = response.data;
        }).catch("Error");
    }
    //refresh();
});