angular.module('hf.FacPopup', [])
    .factory('FacPopup', ['$ionicPopup', '$q', function ($ionicPopup, $q) {
        var isThereActivePopup = false; //don't show two popups at once
        function showPopupByName(name, instanceTitle) {
            var deferred = $q.defer();
            if (!isThereActivePopup) {
                isThereActivePopup = true;
                switch (name) {
                    case 'firstRun':
                        $ionicPopup.show({
                            title: 'HappyFace Meta-Monitoring',
                            content: '<p align="center">It seems you are using HappyFace for the first time.<br>' +
                                'Do you want to set the monitored instances to default?</p>',
                            buttons: [
                                {   text: 'No',
                                    type: 'button button-clear button-positive',
                                    onTap: function (e) {
                                        isThereActivePopup = false;
                                        deferred.reject();
                                    }
                                },
                                {
                                    text: 'Yes',
                                    type: 'button button-clear button-balanced',
                                    onTap: function (e) {
//                                        FacInstances.setInstancesToDefault();
                                        isThereActivePopup = false;
                                        deferred.resolve();
//                            e.preventDefault();
                                    }
                                }
                            ]
                        });
                        break;
                    case 'invalidUrl':
                        $ionicPopup.show({
                            title: 'Invalid URL',
                            content: '<p align="center">The provided URL does not point to a HappyFace instance\'s xml.' +
                                '<br>A proper URL ends with<br>\'?action=getxml\'.</p>',
                            buttons: [
                                {   text: 'OK',
                                    type: 'button button-clear button-positive',
                                    onTap: function (e) {
                                        isThereActivePopup = false;
                                        deferred.resolve();
                                    }
                                }
                            ]
                        });
                        break;
                    case 'errorWhileAdding':
                        $ionicPopup.show({
                            title: 'Error While Adding<br>' + '\'' + instanceTitle + '\'',
                            content: '<p align="center">There is no internet connection,<br>' +
                                'the server does not respond<br>or the provided URL has an invalid format.</p>',
                            buttons: [
                                {   text: 'OK',
                                    type: 'button button-clear button-positive',
                                    onTap: function (e) {
                                        isThereActivePopup = false;
                                        deferred.resolve();
                                    }
                                }
                            ]
                        });
                        break;
                    case 'errorWhileRefreshing':
                        $ionicPopup.show({
                            title: 'Error While Refreshing',
                            content: '<p align="center">There is no active instance,<br>select one from the menu ' +
                                '<i class="icon ion-ios7-albums-outline"></i>.</p>',
                            buttons: [
                                {   text: 'OK',
                                    type: 'button button-clear button-positive',
                                    onTap: function (e) {
                                        isThereActivePopup = false;
                                        deferred.resolve();
                                    }
                                }
                            ]
                        });
                        break;
                    case 'noInternet':
                        $ionicPopup.show({
                            title: 'Error While Loading',
                            content: '<p align="center">There is no internet connection,<br>' + 'the server does not respond or <br>' +
                                'the timeout has been reached.</p>',
                            buttons: [
                                {   text: 'OK',
                                    type: 'button button-clear button-positive',
                                    onTap: function (e) {
                                        isThereActivePopup = false;
                                        deferred.resolve();
                                    }
                                }
                            ]
                        });
                        break;
                    case 'resetInstances?':
                        $ionicPopup.show({
                            title: 'Reset the Instances to Default?',
                            buttons: [
                                {   text: 'Cancel',
                                    type: 'button button-clear button-positive',
                                    onTap: function (e) {
                                        isThereActivePopup = false;
                                        deferred.reject();
                                    }
                                },
                                {
                                    text: 'Reset',
                                    type: 'button button-clear button-assertive',
                                    onTap: function (e) {
//                                        FacInstances.setInstancesToDefault();
                                        isThereActivePopup = false;
                                        deferred.resolve();
//                            e.preventDefault();
                                    }
                                }
                            ]
                        });
                        break;
                    case 'webserviceReturnedEmpty':
                        $ionicPopup.show({
                            title: 'Tables Empty',
                            content: '<p align="center">Webservice returned<br>empty content.</p>',
                            buttons: [
                                {   text: 'OK',
                                    type: 'button button-clear button-positive',
                                    onTap: function (e) {
                                        isThereActivePopup = false;
                                        deferred.resolve();
                                    }
                                }
                            ]
                        });
                        break;
                    case 'noInternetOrServerWrong':
                        $ionicPopup.show({
                            title: 'Error While Loading',
                            content: '<p align="center">There is no internet connection,<br>the server does not respond<br>or the timeout has been reached.</p>',
                            buttons: [
                                {   text: 'OK',
                                    type: 'button button-clear button-positive',
                                    onTap: function (e) {
                                        isThereActivePopup = false;
                                        deferred.resolve();
                                    }
                                }
                            ]
                        });
                        break;
                }
            }
            return deferred.promise;
        }

        function showRowInfoPopup(subTableName, key, value){
//            if (!isThereActivePopup) {        //not needed here, cause this info popup is not shown programmatically
//                isThereActivePopup = true;
                if (value.length != 0) {  //if value string is empty, then display "Empty" instead of an empty string
                    $ionicPopup.show({
                        title: subTableName,
                        content: '<p align="center" style="font-weight: bold">' + key + ':</p>' + '<p align="center">' + value + '</p>',
                        buttons: [
                            {   text: 'OK',
                                type: 'button button-clear button-positive',
                                onTap: function (e) {
//                                    isThereActivePopup = false;
                                }
                            }
                        ]
                    });
                }else{
                    $ionicPopup.show({
                        title: subTableName,
                        content: '<p align="center" style="font-weight: bold">' + key + ':</p>' + '<p align="center"' +
                            'style="color: lightgrey;font-style: italic">Empty</p>',
                        buttons: [
                            {   text: 'OK',
                                type: 'button button-clear button-positive',
                                onTap: function (e) {
//                                    isThereActivePopup = false;
                                }
                            }
                        ]
                    });
                }
//            }
        }

        return {
            showPopupByName: function (name, instanceTitle) {
                return showPopupByName(name, instanceTitle);
            },
            showRowInfoPopup: function(subTableName, key, value){
                showRowInfoPopup(subTableName, key, value);
            }
        }
    }]);