var express = require('express');
var router = express.Router();
var configReader = require('../services/config');
var cron = require('../services/cron');

router.get('/', function(req, res, next) {
    configReader.read(function(config) {
        res.json(config);
    });
});

router.post('/', function(req, res, next) {
    var config = req.body.config;
    configReader.write(config, function() {
        cron.reloadCRONTasks(config);
        res.sendStatus(200);
    })
});

module.exports = router;
