var midgardApp = angular.module('midgardApp');

midgardApp.controller('CombatCtrl', ['$scope', 'midgard', function ($scope, midgard) {

    midgard.load();

    $scope.midgard = midgard;
}]);