var express = require('express');
var router = express.Router();

var Client = require('node-rest-client').Client;
var APIClient = new Client();



router.get('/user/list', function(req, res, next) {
	APIClient.get("http://localhost:4000/api/user", function (APIData, APIResponse) {
		res.render('show_users',{users:APIData,type:req.session.type,login:req.session.login});
	})
});

router.get('/user/delete/:_id', function(req, res, next) {
	var id = req.params._id;
	APIClient.delete("http://localhost:4000/api/user/"+id+"/"+req.session.token, function (APIData2, APIResponse) {
		if(APIResponse.statusCode == 200){
		  	res.redirect('/user/list');
		}
		else{
		  	res.render('error');
		}
	})
});

router.get('/user/edit/:id', function(req, res, next) {
  var id = req.params.id;
  if(req.session.type == true){
  	APIClient.get("http://localhost:4000/api/place", function (APIData, APIResponse) {
  		APIClient.get("http://localhost:4000/api/user/profile/"+id, function (APIUser, APIResponse) {
  			res.render('edit_user',{user:APIUser,places:APIData,session:req.session.token,login:req.session.login});
  		})
  	})
  }	
  else{
  	res.sendStatus(404);
  }
});

router.get('/user/create', function(req, res, next) {
  if(req.session.type == true){
  	APIClient.get("http://localhost:4000/api/place", function (APIData, APIResponse) {
  		res.render('add_user',{places:APIData,session:req.session.token,login:req.session.login});
  	})
  }	
  else{
  	res.sendStatus(404);
  }
});

module.exports = router;