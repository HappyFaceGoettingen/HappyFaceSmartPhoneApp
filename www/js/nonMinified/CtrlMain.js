angular.module('hf.CtrlMain', [])
    .controller('CtrlMain', ['FacBackgroundRefresh', 'FacInstances', 'FacUIVariables', 'FacPopup', '$ionicSideMenuDelegate', '$rootScope',
    function (FacBackgroundRefresh, FacInstances, FacUIVariables, FacPopup, $ionicSideMenuDelegate, $rootScope) {
        // deviceReady
        ionic.Platform.ready(function () {
            document.addEventListener("resume", function () { //every time the app is resumed, e.g. when the user switches to it from another app
                FacUIVariables.setTimeOutIsGreyedOut(FacInstances.getLastActiveInstance().lastRefreshed); //.lastRefreshed is a string, because it is stringyfied by angular.toJson, which saves the instances
                FacInstances.conditionalRefresh();
                $rootScope.$apply();        //the 'Outdated' slogan would not appear immediately without this
            }, false);
            FacUIVariables.setSideMenuEnabled(true);
            //Check if it is first launch
            if (FacUIVariables.getNotFirstTimeLaunch()) {
                if (FacInstances.getLastActiveInstance().length == 0) { //open side menu when no active instance
                    $ionicSideMenuDelegate.toggleLeft();
                }
            } else {
                FacPopup.showPopupByName('firstRun')
                    .then(function () {
                        FacInstances.setInstancesToDefault();
                    }, function (reason) {
//                    console.log('failed because of: ' + reason);
                    });
                FacUIVariables.setNotFirstTimeLaunch(true);
                $ionicSideMenuDelegate.toggleLeft();
            }
            FacInstances.conditionalRefresh();
            // Background Fetch on iOS
            if (FacUIVariables.isPlatformIOS()) {
                FacBackgroundRefresh.initializeBackgroundFetch();
            }
            //Check if current data is outdated
            FacUIVariables.setTimeOutIsGreyedOut(FacInstances.getLastActiveInstance().lastRefreshed); //.lastRefreshed is a string, because it is stringyfied by angular.toJson, which saves the instances
            $rootScope.$apply();        //the 'Outdated' slogan would not appear immediately without this
        });
    }]);