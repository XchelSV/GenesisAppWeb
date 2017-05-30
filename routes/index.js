var express = require('express');
var router = express.Router();

var Client = require('node-rest-client').Client;
var APIClient = new Client();


/* GET home page. */
router.get('/', function(req,res,next){
	
	res.render('home',{login:req.session.login});
});


module.exports = router;
