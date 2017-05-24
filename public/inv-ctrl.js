angular.module("DatosInv").controller("InvData", function($scope, $http) {
    
    /* 
    function refresh() {  
       getInvData();
    
    */
    
    $scope.getInvData = function(){
        console.log("1");
        $scope.invdata = [];
        console.log("2");
        var apikeyLocal = "e94d752350ca7032b05b3fd44903fd2d";
        var apikeyHeroku = "3f7cfe68209df70691bbc22bd225b8cf";
//heroku        $http.get("https://api.elsevier.com/content/search/author?apikey=" + apikeyHeroku + "&httpaccept=application/json&query=ORCID(" + $scope.searchOrcid + ")")
        $http.get("https://api.elsevier.com/content/search/author?apikey=" + apikeyHeroku + "&query=ORCID(" + $scope.searchOrcid + ")")
        .then(function(response) {
            console.log(JSON.stringify(response.data, null, 4));
            //console.log(JSON.parse(response.data, null));
            $scope.invdata = JSON.stringify(response.data, null, 4);
            $scope.searchOrcid = $scope.searchOrcid;
        }).catch("Error");
    }
    //refresh();
});