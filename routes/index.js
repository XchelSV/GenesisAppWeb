var express = require('express');
var router = express.Router();

var Client = require('node-rest-client').Client;
var APIClient = new Client();


/* GET home page. */
router.get('/', function(req,res,next){
	res.render('home');
});

router.get('/social/list', function(req, res, next) {
	APIClient.get("http://localhost:4000/api/post", function (APIData, APIResponse) {
		if (req.session.token){
			APIClient.get("http://localhost:4000/api/session/user/id/"+req.session.token, function (data, APIResponse) {
				res.render('index', {posts: APIData, session: data});	
			})
		}
		else{
			res.render('index', {posts: APIData, session: req.cookies.temporalSession});	

		}
		
	})	
});

router.get('/post/like/:post_id', function(req,res,next){
	var post_id = req.params.post_id;
	console.log(req.cookies.temporalSession);
	if(req.session.token){
		APIClient.get("http://localhost:4000/api/session/user/id/"+req.session.token, function (data, APIResponse) {
			var args = {
			    data: {phoneId:data.toString() , postId:post_id},
				headers: { "Content-Type": "application/json" }
			};	
		
			APIClient.post("http://localhost:4000/api/post/like", args, function (APIData, APIResponse) {
				if(APIResponse.statusCode == 200){
					res.sendStatus(200);	
				}
				else{
					res.sendStatus(202);	
				}			
			})
		})
	}
	else{
		
		var args = {
			data: {phoneId:req.cookies.temporalSession , postId:post_id},
			headers: { "Content-Type": "application/json" }
		};

		APIClient.post("http://localhost:4000/api/post/like", args, function (APIData, APIResponse) {
			if(APIResponse.statusCode == 200){
				res.sendStatus(200);	
			}
			else{
				res.sendStatus(202);	
			}
		})
	}
});

router.get('/post/pray/:post_id', function(req,res,next){
	var post_id = req.params.post_id;
	if(req.session.token){
		APIClient.get("http://localhost:4000/api/session/user/id/"+req.session.token, function (data, APIResponse) {
			var args = {
			    data: {phoneId:data.toString() , postId:post_id},
				headers: { "Content-Type": "application/json" }
			};	
		
			APIClient.post("http://localhost:4000/api/post/pray", args, function (APIData, APIResponse) {
				if(APIResponse.statusCode == 200){
					res.sendStatus(200);	
				}
				else{
					res.sendStatus(202);	
				}			
			})
	})
	}
	else{
		
		var args = {
			data: {phoneId:req.cookies.temporalSession , postId:post_id},
			headers: { "Content-Type": "application/json" }
		};		
		APIClient.post("http://localhost:4000/api/post/pray", args, function (APIData, APIResponse) {
			if(APIResponse.statusCode == 200){
				res.sendStatus(200);	
			}
			else{
				res.sendStatus(202);	
			}
		})
	}
});

router.get('/devotional/list', function(req, res, next) {
  res.render('show_devotionals');
});

router.get('/place/list', function(req, res, next) {
  APIClient.get("http://localhost:4000/api/place", function (APIData, APIResponse) {
  	res.render('show_places',{places:APIData});	
  })
});

router.get('/user/list', function(req, res, next) {
  res.render('show_users');
});

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
	    		//console.log(JSON.parse(APIData.toString()));
	    		res.clearCookie('temporalSession');
	    		console.log('New Session '+APIData.toString());
	    		req.session.token = APIData.toString();
	    		res.cookie('session', APIData.toString());
	    		res.sendStatus(200);
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

router.get('/place/create', function(req, res, next) {
  if(req.session.token){
  	res.render('add_place');	
  }
  else{
  	res.sendStatus(404);
  }
  
});

router.get('/user/create', function(req, res, next) {
  if(req.session.token){
  	res.render('add_user');
  }	
  else{
  	res.sendStatus(404);
  }
  
});

router.get('/devotional/create', function(req, res, next) {
  if(req.session.token){
	res.render('add_devotional');	
  }	
  else{
  	res.sendStatus(404);
  }

});



module.exports = router;
