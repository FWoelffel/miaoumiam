var schedule = require('node-schedule');
var servo = require('./servo');

var cron = {

    getCRONString: function(date) {
        //[MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK] [YEAR (optional)]
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
        if(date.satursday) cron += '6';
        console.log(cron);
        return cron;
    },

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