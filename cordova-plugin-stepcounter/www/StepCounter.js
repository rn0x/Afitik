var exec = require('cordova/exec');

var StepCounter = {
    start: function(successCallback, errorCallback) {
        exec(successCallback, errorCallback, "StepCounter", "start", []);
    },
    stop: function(successCallback, errorCallback) {
        exec(successCallback, errorCallback, "StepCounter", "stop", []);
    },
    getStepCount: function(successCallback, errorCallback) {
        exec(successCallback, errorCallback, "StepCounter", "getStepCount", []);
    }
};

module.exports = StepCounter;
