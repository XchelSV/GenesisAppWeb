app.controller('editUserController',function  ($scope, $http, $cookies) {
        
        $('#preloader').css("display", "none");
        $('#translate').css("display", "none");
        $scope.session = function(){
            if($cookies.session != undefined){
                return true;
            }
            else{
                return false;
            }
        }
        $scope.id = decodeURIComponent($cookies.id);
        $scope.name = decodeURIComponent($cookies.name);
        $scope.day = decodeURIComponent($cookies.day);
        $scope.month = decodeURIComponent($cookies.month);
        $scope.servicePlace = decodeURIComponent($cookies.servicePlace);
        $scope.biography = decodeURIComponent($cookies.biography);

        

    });

    