var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/social/list', function(req, res, next) {
  res.render('index');
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
  res.render('login');
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
