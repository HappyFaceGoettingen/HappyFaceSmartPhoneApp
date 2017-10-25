angular.module('hf.CtrlDetails', [])
    .controller('CtrlDetails', ['FacWebservice', 'FacWebpage', 'FacInstances', 'FacPopup', 'FacUIVariables', '$scope', '$ionicScrollDelegate',
        function (FacWebservice, FacWebpage, FacInstances, FacPopup, FacUIVariables, $scope, $ionicScrollDelegate) {

        // UI stuff
        $scope.isLoading = function () {
            return FacUIVariables.getIsLoading();
        };

        $scope.$on('detailpageload',
            function () {
                $ionicScrollDelegate.scrollTop(false);
                $ionicScrollDelegate.resize();
                if (navigator.connection.type != Connection.NONE) {
                    FacWebservice.setTableContent();
                }
            });

        $scope.isGreyedOut = function () {
            return FacUIVariables.getIsGreyedOut();
        };

        $scope.activeMod = function () {
            return FacWebservice.getActiveModule();
        };


        // Content Stuff
        $scope.downloadModuleDetails = function () {
            FacInstances.refresh();  //refreshing instances, so the outdated sign will not continue to show (if it was visible), when you have refreshed module details
            FacWebservice.setTableContent();
        };

        $scope.openModuleInAppBrowser = function(){
            console.log($scope.activeMod());
            FacWebpage.openModuleInAppBrowser($scope.activeMod());
        };

        $scope.tables = function () {
            return FacWebservice.getTableContent();
        };

        $scope.showWebserviceRowInfo = function (subTableInx, rowInx) {
            FacPopup.showRowInfoPopup(
                $scope.tables()[subTableInx].name,
                $scope.tables()[subTableInx].content[rowInx].column_name,
                $scope.tables()[subTableInx].content[rowInx].column_value
            )
        }
    }]);