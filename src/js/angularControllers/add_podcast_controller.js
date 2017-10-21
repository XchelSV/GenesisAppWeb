app.controller('addPodcastController',function  ($scope, $http, $cookies, podcastUpload) {

	$('#preloader').css("display", "none");
	$('#translate').css("display", "none");

	$scope.create = function(){

		var body = CKEDITOR.instances.textarea1.getData();
		if($scope.title == undefined || body == undefined || $scope.date == undefined){
			
		}
		else{
			var uploadUrl = 'http://'+url+'/api/podcast/'+$cookies.session;
    		var NewPodcast = podcastUpload.uploadPodcastToUrl($scope.title,body,$scope.date,$scope.audio,uploadUrl);
		}
	}	

});