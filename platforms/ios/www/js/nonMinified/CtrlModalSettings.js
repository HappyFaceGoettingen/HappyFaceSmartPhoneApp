angular.module('hf.CtrlModalSettings', [])
    .controller('CtrlModalSettings', ['FacInstances', 'FacUIVariables', 'FacPopup', '$scope',
    function (FacInstances, FacUIVariables, FacPopup, $scope) {

        $scope.isPlatformIOS = function (){
            return FacUIVariables.isPlatformIOS();
        };

        $scope.extendedNotifications = function () {
            return FacUIVariables.getExtendedNotifications();
        };

        $scope.toggleExtendedNotifications = function () {
            FacUIVariables.toggleExtendedNotifications();
        };

        $scope.showPopupByName = function (name) {
            FacPopup.showPopupByName(name)
                .then(function () {
                    $scope.settingsModal.hide();
                    FacInstances.setInstancesToDefault();
                }, function (reason) {
//                    console.log('failed because of: ' + reason);
                });
        };

        $scope.closeThisModal = function () {
            $scope.settingsModal.hide()
        };

    }]);