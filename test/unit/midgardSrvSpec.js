"use strict";

describe('midgard', function () {
    var $httpBackend;
    var midgard;

    beforeEach(module('midgardApp'));
    beforeEach(inject(function (_$httpBackend_, _midgard_) {
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
            }
        );

        midgard = _midgard_;
    }));

    it("should exist", function () {
        expect(midgard).toBeDefined();
    });

    it("should have a property groupList", function () {
        expect(midgard.groupList).toBeDefined();
    });

    it("should have elements in property groupList after load", function () {
        expect(midgard.groupList.length).toBe(0);
        midgard.load();
        expect(midgard.groupList.length).toBe(0);
        $httpBackend.flush();
        expect(midgard.groupList.length).toBe(2);
    });

    it("should use callback with load when present", function () {
        var callbackCalled = false;

        midgard.load(function () {
            callbackCalled = true;
        })

        expect(callbackCalled).toBeFalsy();

        $httpBackend.flush();

        expect(callbackCalled).toBeTruthy();
    });

    describe("roundList after load", function () {
        var roundList;
        beforeEach(function () {
            midgard.load();
            $httpBackend.flush();
            roundList = midgard.roundList();
        });

        it("should exist", function () {
            expect(roundList).toBeDefined();
        });

        it("should have 7 members", function () {
            expect(roundList.length).toBe(7);
        });

        it("should be ordered by rw", function () {
            expect(roundList[0].name).toBe('Joe');
            expect(roundList[1].name).toBe('Ork 2');
            expect(roundList[2].name).toBe('Ork 4');
            expect(roundList[3].name).toBe('Ork 3');
            expect(roundList[4].name).toBe('Ork 5');
            expect(roundList[5].name).toBe('Ork 1');
            expect(roundList[6].name).toBe('Jim');
        });
    });

    describe("nextCombatant after load", function () {
        beforeEach(function () {
            midgard.load();
            $httpBackend.flush();
        })

        it("should exist", function () {
            expect(midgard.nextCombatant).toBeDefined();
        });

        it('should move the first combatant from current to roundListDone', function () {
            midgard.nextCombatant();

            expect(midgard.current().name).toBe('Ork 2');

            expect(midgard.roundListDone().length).toBe(1);
            expect(midgard.roundListDone()[0].name).toBe('Joe');

            expect(midgard.roundListOpen().length).toBe(5);
            expect(midgard.roundListOpen()[0].name).toBe('Ork 4');
            expect(midgard.roundListOpen()[1].name).toBe('Ork 3');
            expect(midgard.roundListOpen()[2].name).toBe('Ork 5');
            expect(midgard.roundListOpen()[3].name).toBe('Ork 1');
            expect(midgard.roundListOpen()[4].name).toBe('Jim');
        })
    });

    describe("roundListDone after load", function () {
        var roundListDone;

        beforeEach(function () {
            midgard.load();
            $httpBackend.flush();
            roundListDone = midgard.roundListDone();
        })

        it("should exist and be empty", function () {
            expect(roundListDone).toBeDefined();
            expect(roundListDone.length).toBe(0);
        });
    });

    describe("current after load", function () {
        var current;

        beforeEach(function () {
            midgard.load();
            $httpBackend.flush();
            current = midgard.current();
        })

        it("should exist and be Joe", function () {
            expect(current).toBeDefined();
            expect(current.name).toBe('Joe');
        });
    });

    describe("roundListOpen after load", function () {
        var roundListOpen;

        beforeEach(function () {
            midgard.load();
            $httpBackend.flush();
            roundListOpen = midgard.roundListOpen();
        })

        it("should exist and have 6 member", function () {
            expect(roundListOpen).toBeDefined();
            expect(roundListOpen.length).toBe(6);
        });
    });

});