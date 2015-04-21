var express = require('express');
var router = express.Router();
var MealController = require('../controllers/meal');

router.post('/feed', function(req, res, next) {
    var times = req.body.times;
    MealController.feed(times)
        .then(function f(bool) {
            res.sendStatus(bool ? 200 : 500);
        });

});

module.exports = router;
