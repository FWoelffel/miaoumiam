var express = require('express');
var router = express.Router();
var configReader = require('../services/config');

router.post('/schedule', function(req, res, next) {
    var date = req.body.date;
    configReader.read(function(config) {
        config.schedule.push(date);
        configReader.write(config, function() {
            res.sendStatus(200);
        })
    });
});

router.get('/schedule', function(req, res, next) {
    configReader.read(function(config) {
        res.json(config.schedule);
    });
});

router.post('/quantity', function(req, res, next) {
    var quantity = req.body.quantity;
    configReader.read(function(config) {
        config.quantity = quantity;
        configReader.write(config, function() {
            res.sendStatus(200);
        })
    });
});

router.get('/quantity', function(req, res, next) {
    configReader.read(function(config) {
        res.json(config.quantity);
    });
});
module.exports = router;
