app.controller('showUsersController', function ($scope,$http,$cookies){

        $scope.session = function(){
            if($cookies.session != undefined){
                return true;
            }
            else{
                return false;
            }
        }

        $scope.delete = function(event){
        	$scope.user_id = event.delegateTarget.id;
            $scope.url = '/user/delete/'+$scope.user_id;
            $scope.title = 'Eliminar Misionero';
        }
});
