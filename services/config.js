var fs = require('fs');

var config = {

    /**
     * Default configuration file's path
     */
    CONFIG_PATH: '../config.json',
    /**
     * Default empty config
     */
    DEFAULT_CONFIG: {
        scheduled: []
    },

    /**
     * This function read the configuration file and give the configuration object to the callback
     * @param callback Function expecting an error or null as first parameter and null or the configuration object as a second parameter
     */
    read: function(callback) {
        var path = __dirname + '/' + config.CONFIG_PATH;
        fs.exists(path, function (exists) {
            if(!exists) {
                config.write(config.DEFAULT_CONFIG, function() {
                    callback(null, config.DEFAULT_CONFIG);
                });
            }
            else {
                var cfg = JSON.parse(fs.readFileSync(path));
                if(config.checkIntegrity(cfg)) {
                    callback(null, cfg);
                }
                else {
                    callback(new Error('Invalid configuration.'), null);
                }
            }
        });
    },

    /**
     * This function writes the given configuration to the server
     * @param cfg The configuration to be saved
     * @param callback This function expect one parameter only in case of error
     */
    write: function(cfg, callback) {
        if (config.checkIntegrity(cfg)) {
            var path = __dirname + '/' + config.CONFIG_PATH;
            fs.writeFileSync(path, JSON.stringify(cfg));
            callback();
        }
        else {
            callback(new Error('Invalid configuration.'));
        }
    },

    /**
     * This function check if a given configuration object is valid
     * @param cfg The configuration object to be tested
     * @returns {boolean} True if the configuration is valid, false otherwise
     */
    checkIntegrity: function(cfg) {
        if (cfg.scheduled == undefined) return false;
        for(var idx in cfg.scheduled) {
            var scheduled = cfg.scheduled[idx];
            if (scheduled.quantity == undefined) return false;
            if (!(!isNaN(parseInt(scheduled.quantity)) && isFinite(scheduled.quantity))) return false;
            scheduled.quantity = parseInt(scheduled.quantity);
            if (scheduled.quantity <= 0) return false;
            var date = scheduled.date;
            if (date.hours == undefined)  return false
            if (!(!isNaN(parseInt(date.hours)) && isFinite(date.hours))) return false;
            date.hours = parseInt(date.hours);
            if (date.hours >= 24 || date.hours < 0) return false;
            if (date.minutes == undefined)  return false
            if (!(!isNaN(parseInt(date.minutes)) && isFinite(date.minutes))) return false;
            date.minutes = parseInt(date.minutes);
            if (date.minutes >= 60 || date.minutes < 0);
            if (date.monday == undefined || (date.monday != true && date.monday != false)) return false;
            if (date.tuesday == undefined || (date.tuesday !== true && date.tuesday !== false)) return false;
            if (date.wednesday == undefined || (date.wednesday !== true && date.wednesday !== false)) return false;
            if (date.thursday == undefined || (date.thursday !== true && date.thursday !== false)) return false;
            if (date.friday == undefined || (date.friday !== true && date.friday !== false)) return false;
            if (date.satursday == undefined || (date.satursday !== true && date.satursday !== false)) return false;
            if (date.sunday == undefined || (date.sunday !== true && date.sunday !== false)) return false;
            if (date.monday === false && date.tuesday === false && date.wednesday === false && date.thursday === false && date.friday === false && date.satursday === false && date.sunday === false) return false;
        }
        return true;
    }
}

module.exports = config;