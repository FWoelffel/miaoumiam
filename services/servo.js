var piblaster = require("pi-blaster.js");
var async = require("async");

var servo = {

    /**
     * Default waiting time
     * You shall adjust it depending on your servomotor model
     */
    WAIT: 800,
    /**
     * Default pin
     * You shall adjust it depending on your setup
     */
    PIN: 18,
    /**
     * Debug mode
     * If set to true, following code will be verbose
     */
    DEBUG: true,
    /**
     * Servomotor's states enum
     * Each state is pretty self-explanatory
     * You shall set the servo's state to RELEASED when you're done with it
     */
    servoState: {
        LEFT: 0.06,
        CENTER: 0.15,
        RIGHT: 0.24,
        RELEASED: 0
    },

    /**
     * This function rotates the servomotor from left to right
     * @param times Number of movement the servomotor will do
     * @param callback Function called when the servomotor has terminated its rotations
     */
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

    /**
     * This function is a helper to easily set the servomotor's state
     * @param state State to which the servomotor should be set
     * @param callback Function called after the delay defined by the WAIT variable. Since we can't have any feedback on the real state of the servomotor, we assume that it is set to the given state after WAIT ms
     */
    setState : function(state, callback) {
        piblaster.setPwm(servo.PIN, state);
        setTimeout(function() {
            callback();
        }, servo.WAIT);
    }
}

module.exports = servo;
