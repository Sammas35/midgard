var midgardApp = angular.module('midgardApp');

midgardApp.controller('CombatCtrl', ['$scope', '$http', function ($scope, $http) {
    var group;

    $http.get('combats/group.json')
        .then(function (response) {
            //console.log(JSON(response.data));
            $scope.data = response.data;
        });
}]);