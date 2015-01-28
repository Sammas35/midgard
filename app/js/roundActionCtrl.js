"use strict";

var midgardApp = angular.module('midgardApp');

midgardApp.controller('RoundActionCtrl', ['$scope', 'midgard', function ($scope, midgard) {
    $scope.midgard = midgard;

    $scope.noAction = function () {

    }
}]);