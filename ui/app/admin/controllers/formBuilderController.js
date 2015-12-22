'use strict';

angular.module('bahmni.admin')
    .controller('FormBuilderController', ['$scope', 'spinner', 'conceptSetService', function ($scope, spinner, conceptSetService) {

        $scope.formType = 'none';

        $scope.formTitle = null;

        var flattenedArray = [];

        var allTemplates = null;

        $scope.getConceptSetData = function () {
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
                var pattern = new RegExp(".*"+$scope.formTitle+".*", 'i');
                return _.filter(flattenedArray, function(element) {
                    return pattern.test(element);
                });
            });
        };

        function flatten(result) {
            var members = result.setMembers;
            if (members != undefined && members.length > 0) {
                for (var index = 0; index < members.length;) {
                    flatten(members[index++]);
                }
            }
            flattenedArray.push(result.display);
        }
    }
    ]);