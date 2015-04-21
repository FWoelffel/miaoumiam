var express = require('express');
var router = express.Router();
var configReader = require('../services/config');

router.get('/', function(req, res, next) {
    configReader.read(function(config) {
        res.json(config);
    });
});

router.post('/', function(req, res, next) {
    var config = req.body.config;
    configReader.write(config, function() {
        res.sendStatus(200);
    })
});

router.post('/schedule', function(req, res, next) {
    var date = req.body.date;
    configReader.read(function(config) {
        config.scheduled.push(date);
        configReader.write(config, function() {
            res.sendStatus(200);
        })
    });
});

router.get('/schedule', function(req, res, next) {
    configReader.read(function(config) {
        res.json(config.scheduled);
    });
});

module.exports = router;
