var app = angular.module('Genesis',['ngRoute', 'ngCookies','angular-uuid','angular-loading-bar','cfp.loadingBarInterceptor']);
    
    //var url = 'localhost:4000';
    var url = 'xchelsvz.me:4000';
    app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        
        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.latencyThreshold = 50;

     
     }]);
    
    app.directive('fileModel', ['$parse', function ($parse) {
         return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                
                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        }
    }]);

    app.directive('onFinishRender', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit(attr.onFinishRender);
                    });
                }
            }
        }
    });

    app.service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function(file,text,img,video,audio, uploadUrl){
            var fd = new FormData();
            fd.append('image', file);
            fd.append('body',text);
            fd.append('img',img);
            fd.append('video',video);
            fd.append('audio',audio);

            var date = new Date();
            fd.append('date',date);

            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(data, status, headers, config){
                window.location = "/social/list";
            })
            .error(function(){
            });
        }
    }]);

    app.service('devotionalUpload', ['$http', function ($http) {
        this.uploadDevotionalToUrl = function(title,text,showDate,img,video,audio, uploadUrl){
            var fd = new FormData();
            fd.append('title', title);
            fd.append('body',text);
            fd.append('showDate',showDate);
            fd.append('img',img);
            fd.append('video',video);
            fd.append('audio',audio);

            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(data, status, headers, config){
                window.location = "/devotional/list";
            })
            .error(function(){
                alert('Error al Guardar');
            });
        }
    }]);

    app.service('devotionalPut', ['$http', function ($http) {
        this.uploadDevotionalToUrl = function(title,text,showDate,img,video,audio, uploadUrl){
            var fd = new FormData();
            fd.append('title', title);
            fd.append('body',text);
            fd.append('showDate',showDate);
            fd.append('img',img);
            fd.append('video',video);
            fd.append('audio',audio);

            $http.put(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(data, status, headers, config){
                window.location = "/devotional/list";
            })
            .error(function(){
                alert('Error al Guardar');
            });
        }
    }]);

    app.service('podcastUpload', ['$http', function ($http) {
        this.uploadPodcastToUrl = function(title,text,showDate,audio, uploadUrl){
            var fd = new FormData();
            fd.append('title', title);
            fd.append('body',text);
            fd.append('showDate',showDate);
            fd.append('audio',audio);

            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(data, status, headers, config){
                window.location = "/podcast/list";
            })
            .error(function(){
                alert('Error al Guardar');
            });
        }
    }]);