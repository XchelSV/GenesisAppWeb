app.controller('devotionalsController', function ($scope,$http,$cookies){
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


    $scope.languaje = {};
    $scope.languaje.from = 'es';
    $scope.languaje.to = 'en';

    $('#translate').click(function(){


            $.ajax({
                url: "/post/translate",
                type: "POST",
                data: {
                    "text": $('#devotional_title'+devotional._id).text(),
                    "_id" : devotional._id,
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


            $.ajax({
                url: "/post/translate",
                type: "POST",
                data: {
                    "text": $('#body').html(),
                    "_id" : devotional._id,
                    'from' : $scope.languaje.from,
                    'to' : $scope.languaje.to
                }
            })  
            .done(function(data, textStatus, jqXHR) {
                //console.log("HTTP Request Succeeded: " + jqXHR.status);
                $('#body').html(data.text);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.log("HTTP Request Failed");
            })
            .always(function() {
                
            });
            

        if ($scope.languaje.from == 'es'){
            $scope.languaje.from = 'en';
            $scope.languaje.to = 'es';
        }
        else{
            $scope.languaje.from = 'es';
            $scope.languaje.to = 'en';   
        }

        
        
    })

});