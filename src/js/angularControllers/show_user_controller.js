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


        $scope.languaje = {};
        $scope.languaje.from = 'es';
        $scope.languaje.to = 'en';

        $('#preloader').css("display", "none");
        $('#translate').click(function(){

            $('#preloader').css("display", "inline");
            for (var i = 0; i < users.length; i++) {

                $.ajax({
                    url: "/post/translate",
                    type: "POST",
                    data: {
                        "text": $('#text'+users[i]._id).html(),
                        "_id" : users[i]._id,
                        'from' : $scope.languaje.from,
                        'to' : $scope.languaje.to
                    }
                })  
                .done(function(data, textStatus, jqXHR) {
                    //console.log("HTTP Request Succeeded: " + jqXHR.status);
                    $('#text'+data._id).html(data.text);
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    console.log("HTTP Request Failed");
                })
                .always(function() {
                    
                });
                
            }

            if ($scope.languaje.from == 'es'){
                $scope.languaje.from = 'en';
                $scope.languaje.to = 'es';
            }
            else{
                $scope.languaje.from = 'es';
                $scope.languaje.to = 'en';   
            }

            setTimeout(function(){
                $('#preloader').css("display", "none");
            }, 6000);
            
        })

    $scope.open_modal = function(e){
        $('#modal1').modal('open');
        var user = e.currentTarget.id;
        for (var i = 0; i < users.length; i++) {
            if(users[i]._id == user){
                $scope.name = users[i].name;
                $scope.biography = users[i].biography;
                break;
            }
        }
    }   
});
