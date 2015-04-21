var express = require('express');
var router = express.Router();
var configReader = require('../services/config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
