var express = require('express');
var router = express.Router();
var servo = require('../services/servo');

/**
 * POST /feed
 * @param times
 */
router.post('/feed', function(req, res, next) {
    var times = req.body.times;
    servo.rotate(times, function(err){
        if(err) next(err);
        else res.sendStatus(200);
    });

});

module.exports = router;
