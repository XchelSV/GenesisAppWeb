app.controller('showPodcastController', function ($scope,$http,$cookies){

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

        $scope.delete = function(event){
        	$scope.podcast_id = event.delegateTarget.id;
            $scope.url = '/podcast/delete/'+$scope.podcast_id;
            $scope.title = 'Eliminar Podcast';
        }


    $scope.languaje = {};
    $scope.languaje.from = 'es';
    $scope.languaje.to = 'en';

    $('#translate').click(function(){

        $('#preloader').css("display", "inline");
        for (var i = 0; i < devotionals.length; i++) {

            $.ajax({
                url: "/post/translate",
                type: "POST",
                data: {
                    "text": $('#devotional_title'+devotionals[i]._id).text(),
                    "_id" : devotionals[i]._id,
                    'from' : $scope.languaje.from,
                    'to' : $scope.languaje.to
                }
            })  
            .done(function(data, textStatus, jqXHR) {
                //console.log("HTTP Request Succeeded: " + jqXHR.status);
                $('#devotional_title'+data._id).text(data.text);
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
});
