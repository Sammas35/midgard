"use strict";

describe('roundActionCtrl', function () {
    var ctrl;
    var scope;

    beforeEach(module('midgardApp'));

    beforeEach(inject(function ($controller, $rootScope) {

        scope = $rootScope.$new();

        ctrl = $controller('RoundActionCtrl', {$scope: scope});
    }));

    it("should exist", function(){
        expect(ctrl).toBeDefined();
    });

    it("should have a midgard and egal property", function () {
        expect(scope.midgard).toBeDefined();
    });

    describe("noAction", function () {
        it("should exist", function () {
            expect(scope.noAction).toBeDefined();
        });

        it("should change to the next combatant", function () {
            scope.midgard.load();
            expect(scope.midgard.roundList.length).toBe(6);
        });
    });
});
