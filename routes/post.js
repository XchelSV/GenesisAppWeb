var express = require('express');
var router = express.Router();
var MsTranslator = require('mstranslator');

var Client = require('node-rest-client').Client;
var APIClient = new Client();

router.get('/social/list', function(req, res, next) {
	APIClient.get("http://localhost:4000/api/post", function (APIData, APIResponse) {
		if (req.session.token){
			APIClient.get("http://localhost:4000/api/session/user/id/"+req.session.token, function (data, APIResponse) {
				res.render('index', {posts: APIData, session: data, type:req.session.type,login:req.session.login});	
			})
		}
		else{
			res.render('index', {posts: APIData, session: req.cookies.temporalSession,login:false});	

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

router.get('/post/delete/:post_id', function(req,res,next){

	var id = req.params.post_id;
	if(req.session.token){
		APIClient.get("http://localhost:4000/api/post/"+id, function (data, APIResponse) {
			if (APIResponse.statusCode == 200){
				APIClient.delete("http://localhost:4000/api/post/"+data.img+"/"+id+"/"+req.session.token, function (APIData, APIResponse2) {
					if (APIResponse.statusCode == 200){
						res.redirect('/social/list');
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
	}

});

router.post('/post/translate', function(req,res,next){
	var text = req.body.text;
	var client = new MsTranslator({
	  api_key: "d0c033cbc51d4ec1a09d2f3f27e13ba9"
	}, true);

	var params = {
	  text: text
	  , from: req.body.from
	  , to: req.body.to
	};

	// Don't worry about access token, it will be auto-generated if needed.
	client.translate(params, function(err, data) {
	  res.send({text:data, _id:req.body._id});
	});
})

module.exports = router;