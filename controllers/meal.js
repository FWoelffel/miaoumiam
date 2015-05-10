var servo = require('../services/servo');
var Q = require('q');

module.exports = {

    /**
     * This function call the servomotor service and makes it rotate the given amount of times
     * @param times The amount of time the servomotor shall rotate
     * @returns {*|promise} Returns a promise
     */
    feed: function(times) {
        var deferred = Q.defer();
        servo.rotate(times || 10, function(){
            deferred.resolve();
        });
        return deferred.promise;
    }

}