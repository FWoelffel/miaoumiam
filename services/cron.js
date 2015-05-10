var schedule = require('node-schedule');
var servo = require('./servo');

var cron = {

    /**
     * This function parse a date object and return a cron string
     * @param date {Object} The expected date object shall look like this : { minutes: 1, hours: 1, sunday: true, monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, satursday: true}
     * @returns {string} The cron string corresponding to the given date object
     */
    getCRONString: function(date) {
        var cron = '';
        cron += date.minutes + ' ';
        cron += date.hours + ' ';
        cron += '* * ';
        if(date.sunday) cron += '0,';
        if(date.monday) cron += '1,';
        if(date.tuesday) cron += '2,';
        if(date.wednesday) cron += '3,';
        if(date.thursday) cron += '4,';
        if(date.friday) cron += '5,';
        if(date.satursday) cron += '6,';
        if(cron.charAt(cron.length-1) === ',') cron = cron.substring(0, cron.length - 1);
        return cron;
    },

    /**
     * This function remove all scheduled cron tasks, read the given configuration object and reload all its planned tasks
     * @param config {Object} The expected  configuration object shall look like this : {scheduled: [quantity: 1, date: {[date]}]}
     */
    reloadCRONTasks: function(config) {
        for(idx in global.CRON) {
            global.CRON[idx].cancel();
        }
        for(idx in config.scheduled) {
            var quantity = config.scheduled[idx].quantity;
            var date = config.scheduled[idx].date;
            global.CRON.push(schedule.scheduleJob(cron.getCRONString(date), function () {
                servo.rotate(quantity, function() {
                    console.log('CRON Task executed');
                })
            }));
        }
    }

};

module.exports = cron;