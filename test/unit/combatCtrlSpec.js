"use strict";

describe("CombatCtrl", function () {
    var ctrl;
    var scope;
    var $httpBackend;

    beforeEach(module("midgardApp"));
    beforeEach(inject(function ($rootScope, $controller, _$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('combats/group.json').
            respond({
                "groupList": [{
                    "name": "Die Guten",
                    "memberList": [{
                        "name": "Jim"
                    }, {
                        "name": "Joe"
                    }]
                }, {
                    "name": "Die Bösen",
                    "memberList": [{
                        "name": "Ork 1"
                    }, {
                        "name": "Ork 2"
                    }, {
                        "name": "Ork 3"
                    }, {
                        "name": "Ork 4"
                    }, {
                        "name": "Ork 5"
                    }]
                }]
            }
        );

        scope = $rootScope.$new();
        ctrl = $controller('CombatCtrl', {$scope: scope});
    }));

    it("should exist", function () {
        $httpBackend.flush();
        expect(ctrl).toBeDefined();
    });

    it("should have 2 groups", function () {
        $httpBackend.flush();
        expect(scope.data.groupList.length).toBe(2);
    });

    it("should have group 1 with 2 people", function () {
        var group;
        $httpBackend.flush();

        group = scope.data.groupList[0];
        expect(group).toBeDefined();
        expect(group.memberList.length).toBe(2);
    });

    it("should have group 2 with 5 people", function () {
        var group;
        $httpBackend.flush();

        group = scope.data.groupList[1];
        expect(group).toBeDefined();
        expect(group.memberList.length).toBe(5);
    });
});
