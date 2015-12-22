'use strict';

describe("FormBuilderController", function () {
    var conceptSetService = jasmine.createSpyObj('conceptSetService', ['getConceptSetMembers']);
    var scope, controller;
    var spinner = jasmine.createSpyObj('spinner', ['forPromise']);

    beforeEach(function () {
        module('bahmni.admin');

        inject(function ($rootScope,$controller) {
            controller = $controller;
            scope = $rootScope.$new();
        });
        createController();
    });

    function createController() {
        return controller("FormBuilderController", {
            $scope: scope,
            spinner:spinner,
            conceptSetService: conceptSetService
        });
    }

    beforeEach(function () {
    });

    var mockConceptSetService = function (data) {
        conceptSetService.getConceptSetMembers.and.callFake(function () {
            return {
                then: function (callback) {
                    return callback({data: data})
                }
            }
        });
    };

    it('should initialize controller' ,function(){
       createController();
    });

});
