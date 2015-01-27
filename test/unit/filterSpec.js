"use strict";

describe('lpColor', function () {

    beforeEach(module('midgardApp'));

    describe("convert different values", function () {
        var input = [-1, 0, 3, 4, 9, 18];
        var expected = ['#ff0000', '#ff0000', '#ff0000', '#33cc33', '#33cc33', '#33cc33'];
        it("", inject(function (lpColorFilter) {
            for (var i = 0; i < input.length; i++) {
                expect(lpColorFilter(input[i])).toBe(expected[i]);
            }
        }));
    });
});

describe('apColor', function () {

    beforeEach(module('midgardApp'));

    describe("convert different values", function () {
        var input = [0, 3, 5, 90];
        var expected = ['#ffffff', '#0000ff', '#0000ff', '#0000ff'];
        it("", inject(function (apColorFilter) {
            for (var i = 0; i < input.length; i++) {
                expect(apColorFilter(input[i])).toBe(expected[i]);
            }
        }));
    });
});


