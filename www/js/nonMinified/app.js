angular.module('hf', ['ionic', 'hf.BackgroundRefresh', 'hf.CtrlCategories', 'hf.CtrlDetails', 'hf.CtrlMain', 'hf.CtrlModalNewInstance',
    'hf.CtrlModalImpressum', 'hf.CtrlModalSettings', 'hf.CtrlModules', 'hf.CtrlSideMenu', 'hf.FacCategories', 'hf.FacInstances', 'hf.FacPopup',
    'hf.FacRequest', 'hf.FacUIVariables', 'hf.FacWebpage', 'hf.FacWebservice'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('sidemenu', {
                url: "/sidemenu",
                abstract: true,
                templateUrl: "templates/side-menu.html",
                controller: 'CtrlSideMenu'
            })
            .state('sidemenu.categories', {
                url: "/categories",
                views: {
                    'view-content': {
                        templateUrl: "templates/categories.html",
                        controller: 'CtrlCategories'
                    }
                }
            })
            .state('sidemenu.modules', {
                url: "/modules",
                views: {
                    'view-content': {
                        templateUrl: "templates/modules.html",
                        controller: 'CtrlModules'
                    }
                }
            })
            .state('sidemenu.details', {
                url: "/details",
                views: {
                    'view-content': {
                        templateUrl: "templates/details.html",
                        controller: 'CtrlDetails'
                    }
                }
            });
        $urlRouterProvider.otherwise("/sidemenu/categories");
    }]);