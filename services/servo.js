var piblaster = require("pi-blaster.js");
var async = require("async");

var servo = {

    WAIT: 800,
    PIN: 18,
    DEBUG: true,
    servoState: {
        LEFT: 0.06,
        CENTER: 0.15,
        RIGHT: 0.24,
        RELEASED: 0
    },

    rotate: function(times, callback) {
        var n = 0;
        async.whilst(
            function () { return n < times; },
            function (next) {
                if(n % 2 == 1) {
                    if (servo.DEBUG) console.log("n : " + n + " -> Left");
                    n++;
                    servo.setState(servo.servoState.LEFT, next);
                }
                else {
                    if (servo.DEBUG) console.log("n : " + n + " -> Right");
                    n++;
                    servo.setState(servo.servoState.RIGHT, next);
                }

            },
            function (err) {
                servo.setState(servo.servoState.RELEASED, function() {
                    if (servo.DEBUG) console.log("Servo released");
                    callback(true);
                });
            }
        );
    },

    setState : function(state, callback) {
        piblaster.setPwm(servo.PIN, state);
        setTimeout(function() {
            callback();
        }, servo.WAIT);
    }
}

module.exports = servo;
