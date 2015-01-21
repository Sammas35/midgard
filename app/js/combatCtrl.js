var midgardApp = angular.module('midgardApp');

midgardApp.controller('CombatCtrl', ['$scope', '$http', function ($scope, $http) {
    var group;

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

    $scope.roundList = function () {
        var result = [];
        var group;

        for (var i = 0; i < $scope.data.groupList.length; i++) {
            group = $scope.data.groupList[i];
            result = result.concat(group.memberList);
        }

        return result.sort(function (a, b) {
            return b.rw - a.rw;
        });
    }
}]);