app.controller('homeController',function  ($scope, $http, $cookies, fileUpload, uuid) {
    
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

    if ($cookies.session == undefined) {
        if ($cookies.temporalSession == undefined) {
            $cookies.temporalSession = uuid.v4();
        }
    }
});