app.controller('indexController',function  ($scope, $http, $cookies, fileUpload, uuid, localStorageService) {
        
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
                var uploadUrl = 'http://localhost:4000/api/post/'+$cookies.session;
                var NewPost = fileUpload.uploadFileToUrl($scope.file,$scope.postText, true,false,false ,uploadUrl);
                $scope.postText = undefined;
                $scope.file = undefined;
                $scope.labelFile = undefined;
                $('#modal1').modal('close');
            }
            else{
                var date = new Date();
                var uploadUrl = 'http://localhost:4000/api/post/'+$cookies.session;
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


        $scope.morePosts = function (){


            $http.get('/posts/'+$scope.numberOfPosts).success(function (data, status, headers, config){
            
            if(data.length != 0) {

                for (var l=0; l < data.length; l++) {
                        
                    $scope.posts.push(data[l]);

                }
                

                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].like.length; j++) {
                        if ($cookies.session) {
                            if($cookies.session == data[i].like[j]){
                                localStorageService.set('like'+data[i]._id,true);
                            }
                        }
                        else{
                            if($cookies.temporalSession == data[i].like[j]){
                                localStorageService.set('like'+data[i]._id,true);
                            }
                        }
                    }

                    for (var k = 0; k < data[i].pray4You.length; k++) {
                        if ($cookies.session) {
                            
                            if($cookies.session == data[i].pray4You[k]){
                                localStorageService.set('pray'+data[i]._id,true);
                            }
                        }
                        else{
                            
                            if($cookies.temporalSession == data[i].pray4You[k]){
                                localStorageService.set('pray'+data[i]._id,true);
                            }
                        }
                    }
                }

                $scope.numberOfPosts = $scope.numberOfPosts+data.length;

            }

            })
            .error(function (){
                alert('AJAX more posts error');
            }); 


        }

        $scope.accessToPost = function (user_id){

            
            if($cookies.session != undefined){
                if($cookies.id == user_id){
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                return false;
            }

        }

        $scope.showPostDetails = function (id){

            $http.get('/post/'+id).success(function (data, status, headers, config){
                    
                    $scope.postDetails = data;
                    
                })
                .error(function (){
                    alert('AJAX error in details Post');
                    
                });

        }

        $scope.deletePost = function (id,img){

            $http.delete('/post/'+img+'/'+id).success(function (data, status, headers, config){
                    
                    var postDeleted = angular.element(document.querySelector('#post'+id));
                    postDeleted.removeClass('animated fadeIn');
                    postDeleted.addClass('animated fadeOut');
                    

                    var deleteModal = angular.element(document.querySelector('#deleteModal'));
                    deleteModal.modal('hide');
                    
                })
                .error(function (){
                    alert('AJAX error in details Post');
                    
                });

        }

    });