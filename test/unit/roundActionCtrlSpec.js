"use strict";

describe('roundActionCtrl', function () {
    var ctrl;
    var scope;
    var $httpBackend;

    beforeEach(module('midgardApp'));

    beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
         $httpBackend = _$httpBackend_;

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

        ctrl = $controller('RoundActionCtrl', {$scope: scope});
    }));

    it("should exist", function(){
        expect(ctrl).toBeDefined();
    });

    it("should have a midgard property", function () {
        expect(scope.midgard).toBeDefined();
        scope.midgard.load();
        $httpBackend.flush();
        expect(scope.midgard.groupList.length).toBe(2);
    });

    describe("noAction", function () {
        it("should exist", function () {
            expect(scope.noAction).toBeDefined();
        });

        it("should change to the next combatant", function () {
            scope.midgard.load();
            $httpBackend.flush();
            expect(scope.midgard.roundListDone.length).toBe(0);
            expect(scope.midgard.current.name).toBe('Joe');
            expect(scope.midgard.roundListOpen.length).toBe(6);
            scope.noAction();
            expect(scope.midgard.roundListDone.length).toBe(1);
            expect(scope.midgard.current.name).toBe('Ork 2');
            expect(scope.midgard.roundListOpen.length).toBe(5);
        });
    });
});
