var midgardApp = angular.module('midgardApp');

midgardApp.factory('midgard', ['$http', function ($http) {
    var midgard = {};

    dump('Start of midgard service');

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

    var getRound = function () {
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

    midgard.groupList = [];

    midgard.load = function (callback) {
        dump('midgard.load started');
        $http.get('combats/group.json')
            .then(function (response) {
                var group;
                var comb;
                var i, j;

                dump('midgard.load promise.then entered');

                midgard.groupList = response.data.groupList;

                for (i = 0; i < midgard.groupList.length; i++) {
                    group = midgard.groupList[i];

                    for (j = 0; j < group.memberList.length; j++) {
                        comb = group.memberList[j];
                        group.memberList[j] = new Combatant(comb);
                    }
                }

                if(callback) {
                    dump('calls callback inside midgard.load')
                    callback();
                    dump('callback inside midgard.load called')
                }
            });
    };

    midgard.roundList = function () {
        var round = getRound();

        return round.roundList;
    }

    midgard.roundListDone = function () {
        var round = getRound();

        return round.roundListDone;
    }

    midgard.current = function () {
        var round = getRound();

        return round.current;
    }

    midgard.roundListOpen = function () {
        var round = getRound();

        return round.roundListOpen;
    }

    midgard.nextCombatant = function () {
        var round = getRound();

        round.roundListDone.push(round.current);
        round.current = round.roundListOpen.shift();
    }

    return midgard;
}])
;
