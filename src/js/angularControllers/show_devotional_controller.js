app.controller('showDevotionalsController', function ($scope,$http,$cookies){

        $scope.session = function(){
            if($cookies.session != undefined){
                return true;
            }
            else{
                return false;
            }
        }

        $scope.delete = function(event){
        	$scope.devotional_id = event.delegateTarget.id;
            $scope.url = '/devotional/delete/'+$scope.devotional_id;
            $scope.title = 'Eliminar Devocional';
        }
});
