var midgardApp = angular.module('midgardApp');

midgardApp.factory('midgard', ['$http', function ($http) {
    var midgard = {};

    midgard.round = undefined;

    midgard.groupList = [];

    var getRoundList = function () {
        var result = [];
        var group;

        for (var i = 0; i < midgard.groupList.length; i++) {
            group = midgard.groupList[i];
            result = result.concat(group.memberList);
        }

        return result.sort(function (a, b) {
            return b.rw - a.rw;
        });
    };

    midgard.getRound = function () {
        if (!midgard.round) {
            var current;
            var roundList;
            var roundListOpen;

            roundList = getRoundList();
            roundListOpen = roundList.slice();
            current = roundListOpen.shift();

            midgard.round = {
                number: 1,
                current: current,
                roundList: roundList,
                roundListDone: [],
                roundListOpen: roundListOpen
            }
        }

        return midgard.round;
    }

    var initRound = function () {
        midgard.roundNumber = 1;

        midgard.roundList = getRoundList();
        midgard.roundListDone = [];
        midgard.roundListOpen = midgard.roundList.slice();
        midgard.current = midgard.roundListOpen.shift();
    };

    midgard.groupList = [];

    midgard.load = function (callback) {
        $http.get('combats/group.json')
            .then(function (response) {
                var group;
                var comb;
                var i, j;

                dump('groups loaded');

                midgard.groupList = response.data.groupList;

                for (i = 0; i < midgard.groupList.length; i++) {
                    group = midgard.groupList[i];

                    for (j = 0; j < group.memberList.length; j++) {
                        comb = group.memberList[j];
                        group.memberList[j] = new Combatant(comb);
                    }
                }

                initRound();

                if(callback) {
                    callback();
                }
            });
    };

    midgard.roundList = [];

    midgard.nextCombatant = function () {
        midgard.roundListDone.push(midgard.current);
        midgard.current = midgard.roundListOpen.shift();
    }

    return midgard;
}])
;
