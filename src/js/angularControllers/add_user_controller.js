app.controller('addUserController',function  ($scope, $http, $cookies) {
        
        $('#preloader').css("display", "none");
        $scope.session = function(){
            if($cookies.session != undefined){
                return true;
            }
            else{
                return false;
            }
        }
});

    