angular.module('hf.CtrlModules', [])

    .controller('CtrlModules', ['FacCategories', 'FacInstances', 'FacWebpage', 'FacWebservice', 'FacUIVariables', 'FacRequest', '$scope', '$state', '$rootScope', '$timeout',
        function (FacCategories, FacInstances, FacWebpage, FacWebservice, FacUIVariables, FacRequest, $scope, $state, $rootScope, $timeout) {

            //UI Stuff
            $scope.isLoading = function () {
                return FacUIVariables.getIsLoading();
            };

            $scope.isGreyedOut = function () {
                return FacUIVariables.getIsGreyedOut();
            };

            $scope.activeInstance = function () {
                return FacInstances.getLastActiveInstance();
            };

            $scope.activeCat = function () {
                return $scope.activeInstance().categories.category[FacCategories.getLastActiveCatIndex()];
            };

            //Content stuff

            $scope.refresh = function () {   //refresh button becomes cancel button
                if (!$scope.isLoading()) {
                    FacInstances.refresh();
                } else {
                    FacRequest.cancel();
                }
            };

            $scope.setActiveModule = function (mod) {
                if (!$scope.activeInstance().usingWebservice) {   //if the instance does not use webservice then use inappbrowser to display webpage
                    FacWebpage.openModuleInAppBrowser(mod);
                } else {                  //if it IS using webservice, then navigate to the details page
                    FacWebservice.setActiveModule(mod);
                    $state.go('sidemenu.details');
                    $timeout(function () {
                        $rootScope.$broadcast('detailpageload')
                    }, 100);
                }
            };
        }]);