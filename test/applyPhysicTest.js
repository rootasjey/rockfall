"use strict";

var assert = require('assert');
var plate = require('./_initialData');
var applyPhysic = require('../lib/applyPhysic');

describe('---- Check physic ----', function() {

    it('check piece physic, it should "fall" ', function() {

        let pieceToPlay = {
            "id":4,
            "x": 2,
            "y": 1,
            "user": 1,
            "state": 0,
            "weight": 4
        };

        let plateClone = JSON.parse(JSON.stringify(plate.Plate));

        assert.equal(plateClone[1][2].state, 0);
        applyPhysic(plateClone, pieceToPlay);
        assert.equal(plateClone[1][2].state, 1);

    });

    it('check piece physic, it shouldn\'t "fall" ', function() {
        let pieceToPlay = {
            "id":10,
            "x": 1,
            "y": 3,
            "user": 2,
            "state": 0,
            "weight": 4
        };
        let plateClone = JSON.parse(JSON.stringify(plate.Plate));

        applyPhysic(plateClone, pieceToPlay);
        assert.equal(plateClone[3][1].state, 0);

    });
});
