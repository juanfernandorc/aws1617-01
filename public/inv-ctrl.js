angular.module("DatosInv").controller("InvData", function($scope, $http) {
    
        
    function refresh() {  
       getInvData();
    }
    
    function getInvData() {
        $scope.invdata = [];
        $http.get("http://api.elsevier.com/content/search/author?apikey=3f7cfe68209df70691bbc22bd225b8cf&query=ORCID(" + "0000-0002-8763-0819" + ")")
        .then(function(response) {
            $scope.invdata = response.data;
        }).catch("Error");
    }
    refresh();
});