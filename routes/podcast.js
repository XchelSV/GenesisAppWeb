var express = require('express');
var router = express.Router();

var Client = require('node-rest-client').Client;
var APIClient = new Client();

router.get('/podcast/create', function(req, res, next) {
  if(req.session.type == true){
	res.render('add_podcast',{login:req.session.login});	
  }	
  else{
  	res.redirect('/');
  }

});


router.get('/podcast/list', function(req, res, next) {
	APIClient.get("http://localhost:4000/api/podcast", function (APIData, APIResponse) {
		res.render('show_podcast',{podcasts:APIData,type:req.session.type,login:req.session.login});
	})
});

router.get('/podcast/delete/:_id', function(req, res, next) {
	var id = req.params._id;
	if(req.session.type == true){
			APIClient.delete("http://localhost:4000/api/podcast/"+id+"/"+req.session.token, function (APIData2, APIResponse) {
				if(APIResponse.statusCode == 200){
			  		res.redirect('/podcast/list');
			  	}
			  	else{
			  		res.render('error',{login:req.session.login});
			  	}
			})
	}
	else{
		res.redirect('/');
	}
});

module.exports = router;