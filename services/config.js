var fs = require('fs');

var config = {
    CONFIG_PATH: '../config.json',
    DEFAULT_CONFIG: {
        quantity: 10,
        schedule: []
    },
    read: function(callback) {
        var path = __dirname + '/' + config.CONFIG_PATH;
        fs.exists(path, function (exists) {
            if(!exists) {
                config.write(config.DEFAULT_CONFIG, function() {
                    callback(config.DEFAULT_CONFIG);
                });
            }
            callback(JSON.parse(fs.readFileSync(path)));
        });
    },
    write: function(cfg, callback) {
        var path = __dirname + '/' + config.CONFIG_PATH;
        fs.writeFileSync(path, JSON.stringify(cfg));
        callback();
    }
}

module.exports = config;