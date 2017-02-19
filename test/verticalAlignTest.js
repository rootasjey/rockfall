"use strict";

var assert = require('assert');
var plate = require('./_initialData');
var checkVertical = require('../lib/checkVertical');

describe('---- Check vertical align ----', function () {

    it('for 4 pieces to win, it should return true in win object', function () {
        let pieceToWin = 4,
            pieceToPlay = {
                "id": 1,
                "x": 0,
                "y": 1,
                "user": 1,
                "weight": 5,
                "state": 0
            };
        let result = checkVertical(plate.Plate, pieceToWin, pieceToPlay);

        assert.equal(result.win, true);
        assert.equal(result.user, pieceToPlay.user);
        assert.equal(result.count, 5);

        let winPiece = result.winPiece;
        for (let i = 0, length = winPiece.length; i < length; i++) {
            assert.equal(winPiece[i].x, 0);
            assert.equal(winPiece[i].state, 3);
        }
    });

    it('for 4 pieces to win, it should return false in win object', function () {
        let pieceToWin = 4,
            pieceToPlay = {
                "id": 1,
                "x": 1,
                "y": 3,
                "user": 2,
                "weight": 5,
                "state": 0
            };
        let result = checkVertical(plate.Plate, pieceToWin, pieceToPlay);
        assert.equal(result.win, false);
        assert.equal(result.user, pieceToPlay.user);
        assert.equal(result.count, 3);
    });
});