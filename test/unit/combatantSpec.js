"use strict";

describe('Combatant', function () {
    var combatant;

    describe("standard constructor", function () {
        beforeEach(function () {
            combatant = new Combatant();
        })

        it("should work with constructor function", function () {
            expect(combatant).toBeDefined();
        });

        it("should have a remainingHealth function", function () {
            expect(combatant.remainingHealth).toBeDefined();
        });

        it("should have remainingHealth work", function () {
            combatant.lp = 50;
            combatant.currentLp = 25;
            expect(combatant.remainingHealth()).toBe(50);
        });
    });

    describe("copy constructor", function () {
        it("should import json data", function () {
            var source;
            var result;

            source = {
                "name": "Ork 1",
                "rw": 70
            };

            result = new Combatant(source);

            expect(result.name).toBe('Ork 1');
            expect(result.rw).toBe(70);
            expect(result.remainingHealth).toBeDefined();
        });
    });
});