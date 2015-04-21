var express = require('express');
var router = express.Router();

router.post('/schedule', function(req, res, next) {

    var date = req.body.date;
    console.log(JSON.stringify(date));
    // TODO Save date

});

module.exports = router;
