"use strict";

var assert = require('assert');
var plate = require('./_initialData');
var applyWeight = require('../lib/applyWeight');

describe('---- Check weight ----', function () {

    it('check piece Weight, it should be tag overweight!', function () {

        let pieceToPlay = {
            "id": 13,
            "x": 1,
            "y": 4,
            "userId": 2,
            "state": 0,
            "weight": 4
        };
        let plateClone = JSON.parse(JSON.stringify(plate.Plate));
        plateClone[4][1] = pieceToPlay;
        assert.equal(plateClone[4][1].state, 0);
        applyWeight(plateClone, pieceToPlay);
        assert.equal(plateClone[4][1].state, 2);

    });

    it('check piece physic, it shouldn\'t be tag overweight!', function () {
        let pieceToPlay = {
            "id": 16,
            "x": 3,
            "y": 4,
            "userId": 2,
            "state": 0,
            "weight": 4
        };
        let plateClone = JSON.parse(JSON.stringify(plate.Plate));
        plateClone[4][3] = pieceToPlay;
        applyWeight(plateClone, pieceToPlay);
        assert.equal(plateClone[4][3].state, 0);

    });
});