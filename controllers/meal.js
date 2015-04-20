var servo = require('../services/servo');
var Q = require('q');

module.exports = {

    feed: function(callback) {
        var deferred = Q.defer();
        servo.rotate(10, function(){
            deferred.resolve(true);
        });
        return deferred.promise;
    }

}