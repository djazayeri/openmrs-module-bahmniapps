'use strict';

angular.module('bahmni.admin')
    .controller('FormBuilderController', ['$scope', 'spinner', 'conceptSetService', '$state', function ($scope, spinner, conceptSetService, $state) {

        $scope.formType = 'none';

        $scope.formTitle = null;
        $scope.errors = {};
        console.log($scope.formTitle);

        var flattenedArray = [];

        var allTemplates = null;

        $scope.getConceptSetData = function () {
            clearValidationErrors();
            var numberOfLevels = 2;
            var fields = ['uuid', 'display'];
            var customRepresentation = Bahmni.ConceptSet.CustomRepresentationBuilder.build(fields, 'setMembers', numberOfLevels);
            return conceptSetService.getConceptSetMembers({
                name: "All Observation Templates",
                v: "custom:" + customRepresentation
            }).then(function (response) {
                allTemplates = response.data.results[0];
                flattenedArray = [];
                flatten(allTemplates);
                var pattern = new RegExp(".*" + $scope.formTitle + ".*", 'i');
                return _.filter(flattenedArray, function (element) {
                    return pattern.test(element);
                });
            });
        }

        var flatten = function(result) {
            var members = result.setMembers;
            if (members != undefined && members.length > 0) {
                for (var index = 0; index < members.length;) {
                    flatten(members[index++]);
                }
            }
            flattenedArray.push(result.display);
        }

        $scope.build = function () {
            if (validate()) {
                $state.go("admin.formBuilder.editor")
            }
        };

        var clearValidationErrors = function(){
            $scope.errors = {};
        }

        var validate = function () {
            clearValidationErrors();
            if (_.contains(flattenedArray, $scope.formTitle)) {
                $scope.errors.formTitle = "errorFormTitleExist";
                return false;
            }
            return true;
        };
    }]);