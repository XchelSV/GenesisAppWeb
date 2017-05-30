var express = require('express');
var router = express.Router();

var Client = require('node-rest-client').Client;
var APIClient = new Client();



router.get('/devotional/list', function(req, res, next) {
	APIClient.get("http://localhost:4000/api/devotional", function (APIData, APIResponse) {
	  res.render('show_devotionals',{devotionals:APIData,type:req.session.type,login:req.session.login});
	})
});

router.get('/devotional/read/:_id', function(req, res, next) {
	var id = req.params._id;
	APIClient.get("http://localhost:4000/api/devotional/"+id, function (APIData, APIResponse) {
	  res.render('devotional',{devotional:APIData,type:req.session.type,login:req.session.login});
	})
});

router.get('/devotional/delete/:_id', function(req, res, next) {
	var id = req.params._id;

	APIClient.get("http://localhost:4000/api/devotional/"+id, function (APIData, APIResponse2) {
		APIClient.delete("http://localhost:4000/api/devotional/"+id+"/"+APIData.img+"/"+APIData.audio+"/"+APIData.video+"/"+req.session.token, function (APIData2, APIResponse) {
			if(APIResponse.statusCode == 200){
		  		res.redirect('/devotional/list');
		  	}
		  	else{
		  		res.render('error',{login:req.session.login});
		  	}
		})
	})
});



router.get('/devotional/create', function(req, res, next) {
  if(req.session.type == true){
	res.render('add_devotional',{login:req.session.login});	
  }	
  else{
  	res.sendStatus(404);
  }

});

module.exports = router;