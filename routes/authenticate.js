var express = require('express');
var router = express.Router();

var Client = require('node-rest-client').Client;
var APIClient = new Client();



router.get('/login', function(req, res, next) {
  if(req.session.token){
  	res.redirect('/');
  }
  else{
  	res.render('login');
  }
});

router.post('/authenticate', function(req,res,next){

	var args = {
	    data: req.body,
	    headers: { "Content-Type": "application/json" }
	};
	
	APIClient.post("http://localhost:4000/api/login", args, function (APIData, APIResponse) {
	    
	    if(APIResponse.statusCode == 404){
	    	res.sendStatus(401);
	    }
	    else{
	    	if(APIResponse.statusCode == 200){
	    		
				APIClient.get("http://localhost:4000/api/session/user/id/"+APIData.toString(), function (data, APIResponse) {
					APIClient.get("http://localhost:4000/api/user/profile/"+data, function (UserData, APIResponse) {
						res.clearCookie('temporalSession');
			    		console.log('New Session '+APIData.toString()+ "  Type User:"+UserData.type);
			    		req.session.login = true;
			    		req.session.token = APIData.toString();
			    		req.session.type = UserData.type;
			    		res.cookie('session', APIData.toString());
			    		res.sendStatus(200);
					})
				})
	    	}
	    }
	    
	});					

})

router.get('/logout', function(req, res, next) {
  APIClient.get("http://localhost:4000/api/logout/"+req.session.token, function (APIData, APIResponse) {
	   if(APIResponse.statusCode == 401){
	   		res.sendStatus(404);
	   }
	   else{
	   	if(APIResponse.statusCode == 200){
		   	req.session.destroy(function(err){
		   		res.clearCookie('session');
		   		res.redirect('/');
		   	})
		}
	   }
  });
});

module.exports = router;