"use strict";

describe("CombatCtrl", function () {
    var ctrl;
    var scope;
    var $httpBackend;
    var midgard;

    beforeEach(module("midgardApp"));
    beforeEach(inject(function ($rootScope, $controller, _$httpBackend_, _midgard_) {
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

        scope = $rootScope.$new();
        midgard = _midgard_;
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

    describe("roundList", function () {
        var roundList;
        beforeEach(function () {
            $httpBackend.flush();
            roundList = scope.roundList();
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

    describe("roundListDone", function () {
        var roundListDone;
        beforeEach(function () {
            roundListDone = scope.roundListDone();
        });

        it("should have no members", function () {
            expect(roundListDone.length).toBe(0);
        });
    });

    describe("roundListOpen", function () {
        var roundListOpen;
        beforeEach(function () {
            roundListOpen = scope.roundListOpen();
        });

        it("should have six members: all but Joe", function () {
            expect(roundListOpen.length).toBe(6);
            expect(roundListOpen[0].name).toBe('Ork 2');
            expect(roundListOpen[1].name).toBe('Ork 4');
            expect(roundListOpen[2].name).toBe('Ork 3');
            expect(roundListOpen[3].name).toBe('Ork 5');
            expect(roundListOpen[4].name).toBe('Ork 1');
            expect(roundListOpen[5].name).toBe('Jim');
        });
    });

    describe("group 1", function () {
        var group;

        beforeEach(function () {
            $httpBackend.flush();
            group = scope.data.groupList[0];
        });

        it("should have 2 people", function () {
            expect(group).toBeDefined();
            expect(group.name).toBe('Die Guten');
            expect(group.memberList.length).toBe(2);
        });

        describe("Jim and Joe", function () {
            var rwList = [68, 85];
            var nameList = ['Jim', 'Joe'];
            var member;

            beforeEach(function () {
                member = group.memberList;
            });
            describe("should have a RW", function () {
                it(" of ", function () {
                    for (var i = 0; i < member.length; i++) {
                        expect(member[i].rw).toBe((rwList[i]));
                    }
                });
            });

            describe("should have a name ", function () {
                it(" of ", function () {
                    for (var i = 0; i < member.length; i++) {
                        expect(member[i].name).toBe((nameList[i]));
                    }
                });
            });

            describe("should have a remainingHealth function", function () {
                it("", function () {
                    for (var i = 0; i < member.length; i++) {
                        expect(member[i].remainingHealth).toBeDefined();
                    }
                });
            });
        });
    });

    describe("group 2", function () {
        var group;

        beforeEach(function () {
            $httpBackend.flush();
            group = scope.data.groupList[1];
        });

        it("should have 5 people", function () {
            expect(group).toBeDefined();
            expect(group.name).toBe('Die Bösen');
            expect(group.memberList.length).toBe(5);
        });

        describe("each Ork", function () {
            var rwList = [70, 74, 72, 73, 71];
            var nameList = ['Ork 1', 'Ork 2', 'Ork 3', 'Ork 4', 'Ork 5'];
            var member;

            beforeEach(function () {
                member = group.memberList;
            })

            describe("should have a RW", function () {
                it(" of 70", function () {
                    for (var i = 0; i < member.length; i++) {
                        expect(member[i].rw).toBe((rwList[i]));
                    }
                });
            });

            describe("should have a name ", function () {
                it(" of ", function () {
                    for (var i = 0; i < member.length; i++) {
                        expect(member[i].name).toBe((nameList[i]));
                    }
                });
            });
        });
    });
});
