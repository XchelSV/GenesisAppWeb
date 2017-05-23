app.controller('showPlaceController',function  ($scope, $http, $cookies) {
        
        $scope.session = function(){
            if($cookies.session != undefined){
                return true;
            }
            else{
                return false;
            }
        }
        $scope.sessionType = function(){
            if($scope.userType == 'true'){
                return true;
            }
            else{
                return false;
            }
        }

        
        $scope.place_choosen = function(place_id){

            $scope.place_id_selected = place_id;
            console.log($scope.place_id_selected)

        }

        $scope.delete_place = function(){
            
            $http.delete('/place/'+$scope.place_id_selected).

                success(function (data, status, headers, config) {
                     
                     window.location.reload();

                     
                }).
                error(function (data, status, headers, config) {
                          alert('Error, Place cant be deleted');
                });

        }

    });