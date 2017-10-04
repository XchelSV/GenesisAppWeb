app.controller('indexController',function  ($scope, $http, $cookies, fileUpload, uuid) {
        
    $scope.session = function(){
        if($cookies.session != undefined){
            return true;
        }
        else{
            return false;
        }
    }
    
    $scope.post = function (){
        if($scope.postText == undefined && $scope.file == undefined){}
        else{
            if($scope.postText == undefined){
                $scope.postText = '';
            }
            if ($scope.file != undefined){
                var date = new Date();
                var uploadUrl = 'http://'+url+'/api/post/'+$cookies.session;
                var NewPost = fileUpload.uploadFileToUrl($scope.file,$scope.postText, true,false,false ,uploadUrl);
                $scope.postText = undefined;
                $scope.file = undefined;
                $scope.labelFile = undefined;
                $('#modal1').modal('close');
            }
            else{
                var date = new Date();
                var uploadUrl = 'http://'+url+'/api/post/'+$cookies.session;
                var NewPost = fileUpload.uploadFileToUrl(undefined, $scope.postText, false,false,false ,uploadUrl);
                $scope.postText = undefined;
                $scope.file = undefined;
                $scope.labelFile = undefined;
                $('#modal1').modal('close');
            }
        }
    }

    $scope.like = function(event){
        
        var post_id = event.delegateTarget.id;
        $http.get('/post/like/'+post_id).success(function (data, status, headers, config){ 
            if(status == 202){
                event.delegateTarget.className = "btn-floating btn-large waves-effect waves-light red tooltipped";
            }
            if(status == 200){
                event.delegateTarget.className = "btn-floating btn-large waves-effect waves-light black tooltipped";
            }
        })
        .error(function (){
            alert('AJAX error in like Post');        
        });

    }        
    $scope.pray = function(event){
        
        var post_id = event.delegateTarget.id;
        $http.get('/post/pray/'+post_id).success(function (data, status, headers, config){ 
            if(status == 202){
                event.delegateTarget.className = "btn-floating btn-large waves-effect waves-light teal tooltipped";
            }
            if(status == 200){
                event.delegateTarget.className = "btn-floating btn-large waves-effect waves-light black tooltipped";
            }
        })
        .error(function (){
            alert('AJAX error in pray Post');        
        });

    }        

    $scope.posts = [];
    $scope.numberOfPosts;


    $scope.delete = function(event){
        $scope.post_id = event.delegateTarget.id;
        $scope.url = '/post/delete/'+$scope.post_id;
        $scope.title = 'Eliminar Publicación';
    }

    $scope.languaje = {};
    $scope.languaje.from = 'es';
    $scope.languaje.to = 'en';

    $('#preloader').css("display", "none");
    $('#translate').click(function(){

        $('#preloader').css("display", "inline");
        for (var i = 0; i < posts.length; i++) {

            $.ajax({
                url: "/post/translate",
                type: "POST",
                data: {
                    "text": $('#body'+posts[i]._id).text(),
                    "_id" : posts[i]._id,
                    'from' : $scope.languaje.from,
                    'to' : $scope.languaje.to
                }
            })  
            .done(function(data, textStatus, jqXHR) {
                //console.log("HTTP Request Succeeded: " + jqXHR.status);
                $('#body'+data._id).text(data.text);
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