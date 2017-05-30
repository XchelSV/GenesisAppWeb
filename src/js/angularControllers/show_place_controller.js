app.controller('showPlaceController',function  ($scope, $http, $cookies) {
        
    $scope.session = function(){
        if($cookies.session != undefined){
            return true;
        }
        else{
            return false;
        }
    }

    $scope.delete = function(event){
        $scope.place_id = event.delegateTarget.id;
        $scope.url = '/place/delete/'+$scope.place_id;
        $scope.title = 'Eliminar Área';
    }
        
});