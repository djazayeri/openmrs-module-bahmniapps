'use strict';

ddescribe("FormBuilderController", function () {
    var conceptSetService = jasmine.createSpyObj('conceptSetService', ['getConceptSetMembers']);
    var scope, controller;
    var spinner = jasmine.createSpyObj('spinner', ['forPromise']);

    var allObsTemplateData = {
        "results": [
            {
                "uuid": "9d91cb77-3f10-11e4-adec-0800271c1b75",
                "display": "All Observation Templates",
                "setMembers": [
                    {
                        "uuid": "c393fd1d-3f10-11e4-adec-0800271c1b75",
                        "display": "History and Examination",
                        "setMembers": [
                            {
                                "uuid": "c3949eb6-3f10-11e4-adec-0800271c1b75",
                                "display": "Chief Complaint Data"
                            },
                            {
                                "uuid": "c398a4be-3f10-11e4-adec-0800271c1b75",
                                "display": "Chief Complaint Notes"
                            }
                        ]
                    }
                ]
            }
        ]
    };

    beforeEach(function () {
        module('bahmni.admin');

        inject(function ($rootScope, $controller) {
            controller = $controller;
            scope = $rootScope.$new();
        });
        createController();
    });

    function createController() {
        return controller("FormBuilderController", {
            $scope: scope,
            spinner: spinner,
            conceptSetService: conceptSetService
        });
    }

    it('should initialize controller', function () {
        createController();
    });

    it('should select form name based on search param', function () {
        scope.formTitle = "Chief"
        conceptSetService.getConceptSetMembers.and.returnValue(specUtil.createFakePromise(allObsTemplateData));
        expect(scope.getConceptSetData().data).toEqual(['Chief Complaint Data', 'Chief Complaint Notes']);
    });

    it('should throw error if form title is existing', function () {
        scope.formTitle = "Chief Complaint Data"
        conceptSetService.getConceptSetMembers.and.returnValue(specUtil.createFakePromise(allObsTemplateData));
        scope.getConceptSetData();
        scope.build();
        expect(scope.errors.formTitle).toEqual("errorFormTitleExist");
    });
});
