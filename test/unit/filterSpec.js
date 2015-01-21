"use strict";

describe('lpColor', function () {

    beforeEach(module('midgardApp'));

    describe("convert different values", function () {
        var input = [-1, 0, 3, 4, 9, 18];
        var expected = ['#ff0000', '#ff6600', '#ff6600', '#33cc33', '#33cc33', '#33cc33'];
        it("", inject(function (lpColorFilter) {
            for (var i = 0; i < input.length; i++) {
                expect(lpColorFilter(input[i])).toBe(expected[i]);
            }
        }));
    });
});


