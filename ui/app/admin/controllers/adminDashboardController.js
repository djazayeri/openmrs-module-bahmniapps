'use strict';

angular.module('bahmni.admin')
    .controller('AdminDashboardController', ['$scope', '$state', 'appService', function ($scope, $state, appService) {
            debugger;
            $scope.appExtensions = appService.getAppDescriptor().getExtensions($state.current.data.extensionPointId, "link") || [];
        }]);