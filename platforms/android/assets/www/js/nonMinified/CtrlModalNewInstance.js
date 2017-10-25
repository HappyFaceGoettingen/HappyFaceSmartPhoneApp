angular.module('hf.CtrlModalNewInstance', [])
    .controller('CtrlModalNewInstance', ['FacInstances', 'FacPopup', '$scope', '$ionicActionSheet',
    function (FacInstances, FacPopup, $scope, $ionicActionSheet){

        $scope.instance = {title: "", url: "", webServiceUrl: ""};

        $scope.createInstance = function (instance, doSelect){
            if (ValidUrl(instance.url)){
                FacInstances.createInstance(instance, doSelect);
                instance.title = "";
                instance.url = "";
                instance.webServiceUrl = "";
                $scope.closeThisModal();
            }else{
                FacPopup.showPopupByName('invalidUrl');
            }
        };

        $scope.addPresetInstance = function () {
            $ionicActionSheet.show({
                titleText: 'Add Preset Instance',
                buttons: [
                    { text: 'GoeGrid' },
                    { text: 'KIT T1' },
                    { text: 'KIT T3' },
                    { text: 'CMS T1' },
                    { text: 'Belle' }
                ],
                cancelText: 'Cancel',
                cancel: function () {
//                    console.log('CANCELLED');
                },
                buttonClicked: function (btnindex) {
                    switch (btnindex) {
                        case 0:
                            FacInstances.createInstance(
                                {title: "GoeGrid", url: "http://happyface-goegrid.gwdg.de/category?action=getxml",
                                    webServiceUrl: "http://happyface-goegrid.gwdg.de/webservice/"},
                                true
                            );
                            $scope.closeThisModal();
                            break;
                        case 1:
                            FacInstances.createInstance(
                                {title: "KIT T1", url: "http://ekphappyface.physik.uni-karlsruhe.de/~happyface/gridka/webpage/?action=getxml"},
                                true
                            );
                            $scope.closeThisModal();
                            break;
                        case 2:
                            FacInstances.createInstance(
                                {title: "KIT T3", url: "http://ekphappyface.physik.uni-karlsruhe.de/~happyface/t3-kit/webpage/?action=getxml"},
                                true
                            );
                            $scope.closeThisModal();
                            break;
                        case 3:
                            FacInstances.createInstance(
                                {title: "CMS T1 Production Monitoring", url: "http://ekphappyface.physik.uni-karlsruhe.de/~happyface/cmst1prodmon/webpage/?action=getxml"},
                                true
                            );
                            $scope.closeThisModal();
                            break;
                        case 4:
                            FacInstances.createInstance(
                                {title: "Belle", url: "http://ekphappyface.physik.uni-karlsruhe.de/HappyFace/belle/category?action=getxml"},
                                true
                            );
                            $scope.closeThisModal();
                            break;
                    }
                    return true;
                }
            });
        };

        $scope.closeThisModal = function(){
            $scope.instanceModal.hide();
        };


        function ValidUrl(str) {  //validate if a string is a URL. by Zemljoradnik
            var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
            if(!pattern.test(str)) {
                return false;
            } else {
                return true;
            }
        }
    }]);