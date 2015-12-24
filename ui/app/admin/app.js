'use strict';

angular.module('admin', ['httpErrorInterceptor', 'bahmni.admin', 'bahmni.common.routeErrorHandler', 'bahmni.common.conceptSet', 'ngSanitize', 'bahmni.common.uiHelper', 'bahmni.common.config', 'bahmni.common.i18n', 'pascalprecht.translate', 'ngCookies', 'angularFileUpload'])
    .config(['$stateProvider', '$httpProvider', '$urlRouterProvider', '$bahmniTranslateProvider', function ($stateProvider, $httpProvider, $urlRouterProvider, $bahmniTranslateProvider) {
        $urlRouterProvider.otherwise('/dashboard');
    $stateProvider.state('admin', {
        abstract: true,
        template: '<ui-view/>',
        resolve: {
            initialize: 'initialization'
        }
    }).state('admin.dashboard',
        {   url: '/dashboard',
            templateUrl: 'views/adminDashboard.html',
            controller: 'AdminDashboardController',
            data: {
                backLinks: [{label: "Home", accessKey: "h", url: "../home/", icon: "fa-home"}],
                extensionPointId: 'org.bahmni.admin.dashboard'
            }
        })
        .state('admin.csv',
        {   url: '/csv',
            templateUrl: 'views/csvupload.html',
            controller: 'CSVUploadController'

        })
        .state('admin.csvExport',
        {   url: '/csvExport',
            templateUrl: 'views/csvexport.html',
            controller: 'CSVExportController'
        })
        .state('admin.formBuilder', {
            abstract: true,
            controller: 'FormBuilderController',
            controllerAs: 'formBuilder',
            template: "<div ui-view='home'></div><div ui-view='editor'></div>",
        })
        .state('admin.formBuilder.home',
        {   url: '/formbuilder/home',
            views: {
                home: {
                    templateUrl: 'views/formIndex.html',
                }
            }
        })
        .state('admin.formBuilder.editor',
        {   url: '/formbuilder/editor',
            views: {
                editor: {
                    templateUrl: 'views/formBuilder.html',
                }
            }
        });
    $httpProvider.defaults.headers.common['Disable-WWW-Authenticate'] = true;
    $bahmniTranslateProvider.init({app: 'admin', shouldMerge: true});
}]).
    run(function ($rootScope, $templateCache) {
        //Disable caching view template partials
        $rootScope.$on('$viewContentLoaded', function () {
                $templateCache.removeAll();
            }
        )
    });