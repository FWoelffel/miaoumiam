var express = require('express');
var router = express.Router();
var configReader = require('../services/config');
var cron = require('../services/cron');

/**
 * GET /config
 */
router.get('/config', function(req, res, next) {
    configReader.read(function(err, config) {
        if (err) {
            next(err);
        }
        else {
            res.json(config);
        }
    });
});

/**
 * POST /config
 * @param config
 */
router.post('/config', function(req, res, next) {
    var config = req.body.config;
    configReader.write(config, function(err) {
        if (err) {
            next(err);
        }
        else {
            cron.reloadCRONTasks(config);
            res.sendStatus(200);
        }
    })
});

module.exports = router;
