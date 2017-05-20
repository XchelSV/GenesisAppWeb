var express = require('express');
var router = express.Router();

var Client = require('node-rest-client').Client;
var APIClient = new Client();


/* GET home page. */
router.get('/', function(req,res,next){
	res.redirect('/social/list');
});

router.get('/social/list', function(req, res, next) {
	APIClient.get("http://localhost:4000/api/post", function (APIData, APIResponse) {
		res.render('index', {posts: APIData});
	})	
});

router.get('/devotional/list', function(req, res, next) {
  res.render('show_devotionals');
});

router.get('/place/list', function(req, res, next) {
  res.render('show_places');
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
	    		res.clearCookie('temporalSession', { path: '/social' });
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
  res.render('add_place');
});

router.get('/user/create', function(req, res, next) {
  res.render('add_user');
});

router.get('/devotional/create', function(req, res, next) {
  res.render('add_devotional');
});



module.exports = router;
