var servo = require('../services/servo');
var Q = require('q');

module.exports = {

    feed: function(times, callback) {
        var deferred = Q.defer();
        servo.rotate(times || 10, function(){
            deferred.resolve(true);
        });
        return deferred.promise;
    }

}