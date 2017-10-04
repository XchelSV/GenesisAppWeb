app.controller('loginController', function ($scope, $http, $cookies){

	
    $scope.login = function(){

    	if($scope.email == null || $scope.pass == null){
    		Materialize.toast('Datos Incompletos', 4000)
    	}
    	else{
	    	var data = {email: $scope.email, pass: $scope.pass};
			$http.post('/authenticate', data ).then(function success (response){
				window.location = "/";
			}, function error (response) {
				if (response.status === 401) {
					Materialize.toast('Correo/Contraseña Erróneo', 4000)
				};
			});
	    }
	}

});