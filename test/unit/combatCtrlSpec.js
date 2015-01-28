"use strict";

describe('combatCtrl', function () {
    var ctrl;
    var scope;

    beforeEach(module('midgardApp'));
    beforeEach(inject(function ($controller, $rootScope, midgard) {

        scope = $rootScope.$new();

        ctrl = $controller('CombatCtrl', {$scope: scope, midgard: midgard});
    }));


    it("should exist", function(){
        expect(ctrl).toBeDefined();
    });

    it("should have a midgard property", function () {

        expect(scope.midgard).toBeDefined();
    });
});


describe("CombatCtrl", function () {
    var ctrl;
    var scope;

    beforeEach(module('midgardApp'));

    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller, midgard) {
        var $httpBackend = _$httpBackend_;

        $httpBackend.expectGET('combats/group.json').
            respond({
                "groupList": [{
                    "name": "Die Guten",
                    "memberList": [{
                        "name": "Jim",
                        "rw": 68
                    }, {
                        "name": "Joe",
                        "rw": 85
                    }]
                }, {
                    "name": "Die Bösen",
                    "memberList": [{
                        "name": "Ork 1",
                        "rw": 70
                    }, {
                        "name": "Ork 2",
                        "rw": 74
                    }, {
                        "name": "Ork 3",
                        "rw": 72
                    }, {
                        "name": "Ork 4",
                        "rw": 73
                    }, {
                        "name": "Ork 5",
                        "rw": 71
                    }]
                }]
            });

        scope = $rootScope.$new();

        ctrl = $controller('CombatCtrl', {$scope: scope, $http: $httpBackend, midgard: midgard});

        $httpBackend.flush();
    }));

    it("should exist", function () {
        expect(ctrl).toBeDefined();
    });

    it("should have an midgard instance", function () {
        expect(scope.midgard).toBeDefined();
    });
});
