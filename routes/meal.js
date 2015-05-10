var express = require('express');
var router = express.Router();
var MealController = require('../controllers/meal');

/**
 * POST /feed
 * @param times
 */
router.post('/feed', function(req, res, next) {
    var times = req.body.times;
    MealController.feed(times)
        .catch(function error() {
            res.sendStatus(500)
        })
        .then(function f() {
            res.sendStatus(200);
        });

});

module.exports = router;
