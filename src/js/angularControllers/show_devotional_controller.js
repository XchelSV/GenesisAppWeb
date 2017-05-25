app.controller('showDevotionalsController', function ($scope,$http,$cookies){

        $scope.session = function(){
            if($cookies.session != undefined){
                return true;
            }
            else{
                return false;
            }
        }
});
