angular.module("DatosInv").controller("InvData", function($scope, $http) {
    
    /* 
    function refresh() {  
       getInvData();
    
    */
    
    $scope.getInvData = function(){
        console.log("1");
        $scope.invdata = [];
        console.log("2");
        //var apikey = "e94d752350ca7032b05b3fd44903fd2d";  // Local
        var apikey = "3f7cfe68209df70691bbc22bd225b8cf"; // Heroku
//heroku        $http.get("https://api.elsevier.com/content/search/author?apikey=" + apikey + "&httpaccept=application/json&query=ORCID(" + $scope.searchOrcid + ")")
        $http.get("https://api.elsevier.com/content/search/author?apikey=" + apikey + "&query=ORCID(" + $scope.searchOrcid + ")")
        .then(function(response) {
            console.log(JSON.stringify(response.data, null, 4));
            //console.log(JSON.parse(response.data, null));
            $scope.invdata = JSON.stringify(response.data, null, 4);
            $scope.searchOrcid = $scope.searchOrcid;
        }).catch("Error");
    }
    //refresh();
});