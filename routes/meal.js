var express = require('express');
var router = express.Router();
var MealController = require('../controllers/meal');

router.get('/feed', function(req, res, next) {
    MealController.feed()
        .then(function f(bool) {
            res.sendStatus(bool ? 200 : 500);
        });

});

module.exports = router;
