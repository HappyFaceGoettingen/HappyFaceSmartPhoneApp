angular.module('hf.CtrlSideMenu', [])
    .controller('CtrlSideMenu', ['FacUIVariables', 'FacInstances', 'FacRequest', '$scope', '$ionicNavBarDelegate', '$ionicSideMenuDelegate', '$ionicScrollDelegate', '$ionicModal', '$state', '$timeout',
        function (FacUIVariables, FacInstances, FacRequest, $scope, $ionicNavBarDelegate, $ionicSideMenuDelegate, $ionicScrollDelegate, $ionicModal, $state, $timeout) {
            // UI stuff
            $scope.sideMenuEnabled = function () {
                return FacUIVariables.getSideMenuEnabled();
            };

            $scope.goBack = function () {
                $ionicNavBarDelegate.back();
                $timeout(function () {  //wait for the next $digest cycle with enabling the side menu
                    if ($state.is('sidemenu.categories')) {  //when then transition goes to categories
                        FacUIVariables.setSideMenuEnabled(true);
                    }
                })
            };

            // Modals
            $ionicModal.fromTemplateUrl('templates/new-instance.html', function (modal) {
                $scope.instanceModal = modal;
            }, {
                scope: $scope,
                animation: "slide-in-up"
            });

            $ionicModal.fromTemplateUrl('templates/about.html', function (modal) {
                $scope.impressumModal = modal;
            }, {
                scope: $scope,
                animation: "slide-in-right"
            });

            $ionicModal.fromTemplateUrl('templates/settings.html', function (modal) {
                $scope.settingsModal = modal;
            }, {
                scope: $scope,
                animation: "slide-in-up"
            });

            $scope.showModal = function (string) {
                switch (string) {
                    case 'instance':
                        $scope.instanceModal.show();
                        break;
                    case 'impressum':
                        $scope.impressumModal.show();
                        break;
                    case 'settings':
                        $scope.settingsModal.show();
                        break;
                }
            };


            // Content stuff
            // Load or initialize instances
            $scope.instances = function () {
                return FacInstances.all();
            };

            // Grab the last active, or the first instance
            $scope.activeInstance = function () {
                return FacInstances.getLastActiveInstance();
            };

            // Called to select the given instance
            $scope.selectInstance = function (index) {
                FacRequest.cancel();
                FacInstances.setLastActiveInstance(index);
                $ionicSideMenuDelegate.toggleLeft();
                $ionicScrollDelegate.scrollTop(false);
                $ionicScrollDelegate.resize();
                FacUIVariables.setTimeOutIsGreyedOut(FacInstances.getLastActiveInstance().lastRefreshed); //.lastRefreshed is a string, because it is stringyfied by angular.toJson, which saves the instances
                FacInstances.conditionalRefresh();
                console.log(index + ' selected')
            };

            $scope.removeInstance = function (instance) {
                FacInstances.removeInstance(instance);
                if ((instance == $scope.activeInstance()) || ($scope.instances().length == 0)) { //if removed instance was active or no instances remain,
                    FacInstances.setLastActiveInstance(-1);  //delete active instance (-1 is code for that)
                }
            };
        }]);