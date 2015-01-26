"use strict";

var Combatant = function (jsonCombatant) {

    if (jsonCombatant) {
        angular.copy(jsonCombatant, this);
    }

    this.remainingHealth = function () {
        return this.currentLp / this.lp * 100;
    };

    this.isCurrent = function () {
        return this.name === 'Jim';
    }
};
