"use strict";

describe('roundActionCtrl', function () {
    var ctrl;
    var scope;

    beforeEach(module('midgardApp'));

    beforeEach(inject(function ($controller, $rootScope, midgard) {

        scope = $rootScope.$new();

        ctrl = $controller('RoundActionCtrl', {$scope: scope});
    }));


    it("should exist", function(){
        expect(ctrl).toBeDefined();
    });

    it("should have a midgard and egal property", function () {

        expect(ctrl.midgard).toBeDefined();
        expect(ctrl.egal).toBeDefined();
    });
});
