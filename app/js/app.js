"use strict";

var midgardApp = angular.module('midgardApp', []);

midgardApp.filter('lpColor', function () {
    return function (currentLP) {
        var lp;

        if (angular.isNumber(currentLP)) {
            lp = parseInt(currentLP);
            if (lp < 0) {
                return '#ff0000';
            }
            if (lp < 4) {
                return '#ff6600';
            }
            return '#33cc33';
        }
    };
});

midgardApp.directive('masCombatant', function () {
    var getTemplate = function (element, attrs) {
        console.log(angular.toJson(attrs.comb));
        if (attrs.comb.isCurrent()) {
            console.log('detail');
            return 'mas-combatant-detail.html';
        } else {
            console.log('standard');
            return 'mas-combatant.html';
        }
    }

    return {
        restrict: 'E',
        scope: {
            comb: '='
        },
        templateUrl: 'mas-combatant.html'
    };
});

