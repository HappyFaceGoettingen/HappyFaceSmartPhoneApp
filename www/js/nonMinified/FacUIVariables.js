angular.module('hf.FacUIVariables', [])
    .factory('FacUIVariables', ['$ionicLoading', '$timeout', function ($ionicLoading, $timeout) {
        var notFirstTimeLaunch = angular.fromJson(window.localStorage.getItem('notFirstTimeLaunch'));
        var sideMenuEnabled = true;
        var isLoading = false;
        var isGreyedOut = false;
        var greyOutPromise = false;  //the promise, to cancel the greyOut timeout, when a refresh happens before the greyOut has happened
        var extendedNotifications = angular.fromJson(window.localStorage.getItem('extendedNotifications'));

        function setNotFirstTimeLaunch(bool) {
            notFirstTimeLaunch = bool;
            window.localStorage.setItem('notFirstTimeLaunch', angular.toJson(bool))
        }

        function setSideMenuEnabled(bool) {
            sideMenuEnabled = bool;
        }

        function setTimeOutIsGreyedOut(dateString) {
            var currentTime = new Date();
            var lastRefreshDate = new Date(dateString);  //$scope.activeInstance().lastRefreshed is a string, because it is stringyfied by angular.toJson, which saves the instances
            var timeDiff = currentTime.getTime() - lastRefreshDate.getTime();
            if (timeDiff > 1200000){       //20 minutes and the data will be outdated
                isGreyedOut = true;
            }else{
                isGreyedOut = false;
                if (greyOutPromise) {
                    $timeout.cancel(greyOutPromise);
                }
                greyOutPromise = $timeout(function () {
                    isGreyedOut = true;
                }, 1200000 - timeDiff );   //20 minutes and the data will be outdated
            }
        }

        function toggleExtendedNotifications() {
            extendedNotifications = !extendedNotifications;
            window.localStorage.setItem('extendedNotifications', angular.toJson(extendedNotifications));
        }

        //refresh spinner can be showed and hidden from different sources, this counter makes sure
        //it's not hidden when other connections are still running.
        var currentRefreshCount = 0;
        function setIsLoading(bool){
            if (bool){
                currentRefreshCount++;
                isLoading = true;
            }else{
                currentRefreshCount--;
                if (currentRefreshCount <= 0){
                    isLoading = false;
                    currentRefreshCount = 0;
                }
            }
        }

        //network spinner can be showed and hidden from different sources, this counter makes sure
        //it's not hidden when other connections are still running.
        var networkActivityCount = 0;

        function beginLoading(withIonicLoading) {
            if (networkActivityCount == 0) {
                //NetworkActivity.activityStart();
            }
            networkActivityCount++;
            if (withIonicLoading) {
                $ionicLoading.show({
                    template: '<i class="icon ion-ios7-reloading loading-spinner"></i>',
                    animation: 'fade-in'
                });
            }
        }

        function stopLoading(withIonicLoading) {
            if (withIonicLoading) {
                $ionicLoading.hide();
            }
            networkActivityCount--;
            if (networkActivityCount <= 0) {
                //NetworkActivity.activityStop();
                networkActivityCount = 0;
            }
        }


        // From the outside
        return {
            setNotFirstTimeLaunch: function (bool) {
                setNotFirstTimeLaunch(bool);
            },
            getNotFirstTimeLaunch: function () {
                return notFirstTimeLaunch;
            },
            getIsGreyedOut: function () {
                return isGreyedOut;
            },
            setTimeOutIsGreyedOut: function (dateString) {
                setTimeOutIsGreyedOut(dateString);
            },
            setSideMenuEnabled: function (bool) {
                setSideMenuEnabled(bool);
            },
            getSideMenuEnabled: function () {
                return sideMenuEnabled;
            },
            setIsLoading: function (bool) {
                setIsLoading(bool);
            },
            getIsLoading: function () {
                return isLoading;
            },
            beginLoading: function (withIonicLoading) {
                beginLoading(withIonicLoading);
            },
            stopLoading: function (withIonicLoading) {
                stopLoading(withIonicLoading);
            },
            getExtendedNotifications: function () {
                return extendedNotifications;
            },
            toggleExtendedNotifications: function () {
                toggleExtendedNotifications();
            },
            isPlatformIOS: function (){
                return ionic.Platform.isIOS();
            }
        };
    }]);