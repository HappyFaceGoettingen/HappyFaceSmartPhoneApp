angular.module('hf.CtrlModalImpressum', [])
    .controller('CtrlModalImpressum', ['$scope',
    function ($scope) {


        $scope.closeThisModal = function () {
            $scope.impressumModal.hide();
        };

        $scope.openSite = function(str) {
            switch (str){
                case 'goe':
                    window.open('https://www.uni-goettingen.de/de/439238.html', '_system'); //_system opens the operating system's browser
                    break;
                case 'apache':
                    window.open('http://www.apache.org/licenses/LICENSE-2.0', '_system');
                    break;
                case 'mit':
                    window.open('http://opensource.org/licenses/MIT', '_system');
            }
        };
    }]);