angular.module('hf.CtrlCategories', [])
    .controller('CtrlCategories', ['FacUIVariables' , 'FacInstances' , 'FacCategories', 'FacRequest', '$scope',
    function (FacUIVariables, FacInstances, FacCategories, FacRequest, $scope) {
        // UI stuff
        $scope.isLoading = function () {
            return FacUIVariables.getIsLoading();
        };

        $scope.isGreyedOut = function () {
            return FacUIVariables.getIsGreyedOut();
        };

        $scope.ct = function () {
            return FacUIVariables.getBackgroundFetchCounter();
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

        $scope.refresh = function () {
            if (!$scope.isLoading()) {      //refresh button becomes cancel button when loading
                FacInstances.refresh();
            }else{
                FacRequest.cancel();
            }
        };

        $scope.setInstancesToDefault = function () {
            $scope.activeInstance = [];
            FacInstances.setInstancesToDefault();
        };

        $scope.selectCat = function (index) {
            FacUIVariables.setSideMenuEnabled(false);
            FacCategories.setLastActiveCatIndex(index);
        };
    }]);