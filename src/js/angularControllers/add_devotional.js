app.controller('addDevotionalController',function  ($scope, $http, $cookies, devotionalUpload) {

	$scope.create = function(){

		var body = CKEDITOR.instances.textarea1.getData();
		if($scope.title == undefined || body == undefined || $scope.date == undefined){
			
		}
		else{
			var uploadUrl = 'http://'+url+'/api/devotional/'+$cookies.session;
    		var NewDevotional = devotionalUpload.uploadDevotionalToUrl($scope.title,body,$scope.date,$scope.img,$scope.video,$scope.audio,uploadUrl);
		}
	}	

})

app.controller('editDevotionalController',function  ($scope, $http, $cookies, devotionalPut) {
	var pathArray = window.location.pathname.split( '/' );
	$http.get('http://'+url+'/api/devotional/'+pathArray[3]).success(function (data, status, headers, config){ 
    	$scope.title = data.title;
    	$scope.body = data.body;
    	$scope.date = data.showDate;
    })
    .error(function (){
        alert('AJAX error in Devotionals');        
    });

	$scope.create = function(){

		var body = CKEDITOR.instances.textarea1.getData();
		if($scope.title == undefined || body == undefined || $scope.date == undefined){
			
		}
		else{
			var uploadUrl = 'http://'+url+'/api/devotional/'+pathArray[3]+'/'+$cookies.session;
    		var NewDevotional = devotionalPut.uploadDevotionalToUrl($scope.title,body,$scope.date,$scope.img,$scope.video,$scope.audio,uploadUrl);
		}
	}	

})