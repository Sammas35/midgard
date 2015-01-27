"use strict";

var midgardApp = angular.module('midgardApp', []);

midgardApp.filter('lpColor', function () {
    return function (currentLP) {
        var lp;

        if (angular.isNumber(currentLP)) {
            lp = parseInt(currentLP);
            if (lp < 4) {
                return '#ff0000';
            }
            return '#33cc33';
        }
    };
});

midgardApp.filter('apColor', function () {
    return function (currentAP) {
        var lp;

        if (angular.isNumber(currentAP)) {
            lp = parseInt(currentAP);
            if (lp === 0) {
                return '#ffffff';
            }
                return '#0000ff';
        }
    };
});

midgardApp.directive('masCombatant', function () {
    return {
        restrict: 'E',
        scope: {
            comb: '='
        },
        templateUrl: 'mas-combatant.html'
    };
});

midgardApp.directive('masRoundaction', ['midgard', function (midgard) {
    return {
        restrict: 'E',
        scope: {
            comb: '='
        },
        templateUrl: 'mas-roundaction.html'
    };
}]);


