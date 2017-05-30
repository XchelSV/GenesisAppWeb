var express = require('express');
var router = express.Router();

var Client = require('node-rest-client').Client;
var APIClient = new Client();



router.get('/place/list', function(req, res, next) {
  APIClient.get("http://localhost:4000/api/place", function (APIData, APIResponse) {
  	res.render('show_places',{places:APIData,type:req.session.type});	
  })
});


router.get('/place/create', function(req, res, next) {
  if(req.session.type === true){
  	res.render('add_place');	
  }
  else{
  	res.sendStatus(404);
  }
});

router.get('/place/delete/:id',function(req,res,next){
	if(req.session.token){
		var id = req.params.id;
		var token = req.session.token
		APIClient.delete("http://localhost:4000/api/place/"+id+"/"+token, function (APIData, APIResponse) {
			if (APIResponse.statusCode == 200){
				res.redirect('/place/list');
			}
			else{
				res.render('error');
			}
		});
	}
	else{
		res.render('error');
	}
});

module.exports = router;