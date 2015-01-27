var midgardApp = angular.module('midgardApp');

midgardApp.controller('CombatCtrl', ['$scope', '$http', 'midgard', function ($scope, $http, midgard) {
    var group;

    var getRoundList = function () {
        return midgard.roundList();
    };

    var getRound = function () {
        if (!this.round) {
            var current;
            var roundList;
            var roundListOpen;

            roundList = getRoundList();
            roundListOpen = roundList.slice();
            current = roundListOpen.shift();

            this.round = {
                number: 1,
                current: current,
                roundList: roundList,
                roundListDone: [],
                roundListOpen: roundListOpen
            }
        }

        return this.round;
    };

    $scope.data = {};
    $scope.data.groupList = [];

    $http.get('combats/group.json')
        .then(function (response) {
            var group;
            var comb;
            var i, j;

            $scope.data = response.data;

            for (i = 0; i < $scope.data.groupList.length; i++) {
                group = $scope.data.groupList[i];

                for (j = 0; j < group.memberList.length; j++) {
                    comb = group.memberList[j];
                    group.memberList[j] = new Combatant(comb);
                }
            }

        });

    $scope.load = function () {
        dump('CombatCtrl load entered');
        midgard.load(function(){
            dump('midgard.load callback started');
            $scope.data.roundList = midgard.roundList();
        });
    };

    $scope.roundList = function () {
        var round = midgard.round();

        return round.roundList;
    };

    $scope.roundListOpen = function () {
        var round = getRound();

        return round.roundListOpen;
    };

    $scope.roundListDone = function () {
        var round = getRound();

        return round.roundListDone;
    };
}]);