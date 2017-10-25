cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.red_folder.phonegap.plugin.backgroundservice/www/backgroundService.js",
        "id": "com.red_folder.phonegap.plugin.backgroundservice.BackgroundService",
        "pluginId": "com.red_folder.phonegap.plugin.backgroundservice"
    },
    {
        "file": "plugins/com.wearecocoon.cordova.plugin.networkactivity/www/NetworkActivity.js",
        "id": "com.wearecocoon.cordova.plugin.networkactivity.NetworkActivity",
        "pluginId": "com.wearecocoon.cordova.plugin.networkactivity",
        "clobbers": [
            "window.NetworkActivity"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification.js",
        "id": "de.appplant.cordova.plugin.local-notification.LocalNotification",
        "pluginId": "de.appplant.cordova.plugin.local-notification",
        "clobbers": [
            "plugin.notification.local"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.inappbrowser/www/inappbrowser.js",
        "id": "org.apache.cordova.inappbrowser.inappbrowser",
        "pluginId": "org.apache.cordova.inappbrowser",
        "clobbers": [
            "window.open"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.statusbar/www/statusbar.js",
        "id": "org.apache.cordova.statusbar.statusbar",
        "pluginId": "org.apache.cordova.statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/org.transistorsoft.cordova.plugin.background.fetch/www/BackgroundFetchService.js",
        "id": "org.transistorsoft.cordova.plugin.background.fetch.BackgroundFetchService",
        "pluginId": "org.transistorsoft.cordova.plugin.background.fetch",
        "clobbers": [
            "plugins.backgroundFetch"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "id": "cordova-plugin-network-information.network",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "id": "cordova-plugin-network-information.Connection",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "Connection"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.red_folder.phonegap.plugin.backgroundservice": "2.0.0",
    "com.wearecocoon.cordova.plugin.networkactivity": "1.0.0",
    "cordova-plugin-device": "1.1.7-dev",
    "de.appplant.cordova.plugin.local-notification": "0.8.0dev",
    "org.apache.cordova.inappbrowser": "0.3.3",
    "org.apache.cordova.statusbar": "0.1.3",
    "org.transistorsoft.cordova.plugin.background.fetch": "2.0.0",
    "cordova-plugin-network-information": "1.2.1"
}
// BOTTOM OF METADATA
});