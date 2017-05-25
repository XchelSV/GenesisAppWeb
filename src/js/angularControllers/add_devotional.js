app.controller('addDevotionalController',function  ($scope, $http, $cookies, devotionalUpload) {

	$scope.create = function(){

		var body = CKEDITOR.instances.textarea1.getData();
		if($scope.title == undefined || body == undefined || $scope.date == undefined){
			
		}
		else{
			var uploadUrl = 'http://localhost:4000/api/devotional/'+$cookies.session;
    		var NewDevotional = devotionalUpload.uploadDevotionalToUrl($scope.title,body,$scope.date,$scope.img,$scope.video,$scope.audio,uploadUrl);
		}
	}	

})