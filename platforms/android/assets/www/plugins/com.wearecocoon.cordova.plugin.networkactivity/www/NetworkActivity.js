cordova.define("com.wearecocoon.cordova.plugin.networkactivity.NetworkActivity", function(require, exports, module) { var exec = require('cordova/exec');

var NetworkActivity = function(){
	this.serviceName = "NetworkActivity";
};

NetworkActivity.prototype.activityStart = function() {
	exec(null, null, "NetworkActivity", "activityStart", []);
};

NetworkActivity.prototype.activityStop = function() {
	exec(null, null, "NetworkActivity", "activityStop", []);
};

module.exports = new NetworkActivity();
});
