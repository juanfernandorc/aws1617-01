angular.module('UniversityListApp').controller('Universities', function($scope, $http) {
    $http.get("https://aws1617-04.herokuapp.com/api/v1/universities").
        then(function(response) {
            console.log("1");
            $scope.universities = response.data;
        });
    
    $scope.getUniversity = function(){
        console.log("-- " + $scope.selectedUniversity.acronym);
        if(typeof $scope.selectedUniversity != 'undefined'){
            console.log("2 " + $scope.selectedUniversity.acronym);
            $scope.university_name = $scope.selectedUniversity.name;
            getGroups();
        }else{
            $scope.university_name = "";
            $scope.groups = {};
            $scope.projects = {};
        }
        
    }
    
    function getGroups() {
        $scope.groups = {};
        $scope.group_name = "";
        $scope.selectedGroup = null;
        $scope.projects = {};
        $http.get("https://aws1617-03.herokuapp.com/api/v1/groups", { headers: {'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlEwUkJNemt5T1RWQlEwWTFNVFZDUlRjelJUZ3hRMFF4TkVSRVFqWkdOemcyTVVNMk0wWTFSUSJ9.eyJpc3MiOiJodHRwczovL2Rhbmk4YXJ0LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwNzkxNjcwNjI2ODczMjAyNDAwOSIsImF1ZCI6IkVSQnR5eHNpNUpUQ09UWGU3dHFweHpIVWZaV0VLTktUIiwiZXhwIjoxNDk1NDEzMTU0LCJpYXQiOjE0OTUzNzcxNTQsIm5vbmNlIjoidHJHOUNqTElZRmh5d0c3aWtqNi5jd0kweklOMHRkNEkiLCJhdF9oYXNoIjoiSVVhUXdQcEhlbWhQWC04dWJDUFFnQSJ9.s1kGD4e6W8f5QyIZo6gx17WmUMHqi7lsCq8HNmXitlWOyLmRIgT0dGpTWkZivdRwhBCIza66i8HjTnekmelJG8u9D8XMwRddvRbLoBeuTdgQFb-EZ8F_3yGEpOmfk7Mo1-svVIOF5tI8ZGpVlUfhVzhtAgOf4yQsglcNl7LxmpnwKhGmZHrMwPgMQziGwgeZez11sv5mlQECXQqOK9UUIikxnV94cbIk0Q_Hliz8KIyKC9eMj_xCxTOz2Y-OXzkXEiDIr23-0uj10J4yuWU-3iBdJxyK16rnozQtVbEh_Q6GJiFrOoFi2MWE6hNICX6DQNotpbkI4Q74QYq4xscKdQ'}})
        .then(function(response) {
            console.log("3");
            $scope.groups = response.data;
        });
        
    }
    
    $scope.getProjects = function(){
        console.log("-- " + $scope.selectedGroup);
        if(typeof $scope.selectedGroup.name != 'undefined'){
            $http.get("/api/v1/projects").then(function(response) {
                $scope.projects = response.data;
                $scope.group_name = $scope.selectedGroup.name;
            });
        }else{
            $scope.group_name = "";
            $scope.projects = {};
        }
        
    }
});