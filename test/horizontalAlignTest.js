"use strict";

var assert = require('assert');
var plate = require('./_initialData');
var checkHorizontal = require('../lib/checkHorizontal');

describe('---- Check horizontal align ----', function() {

    it('for 4 pieces to win, it should return true in win object', function() {
        let pieceToWin = 4,
            pieceToPlay = {
                x: 1,
                y: 1,
                user: 1
            };
        let result = checkHorizontal(plate.Plate, pieceToWin, pieceToPlay);
        assert.equal(result.win, true);
        assert.equal(result.user, pieceToPlay.user);
        assert.equal(result.count, 4);
        let winPiece = result.winPiece;
        for(let i = 0, length = winPiece.length; i < length;i++){
          assert.equal(winPiece[i].y, 1);
          assert.equal(winPiece[i].state, 3);
        }
    });

    it('for 4 pieces to win, it should return false in win object', function() {
        let pieceToWin = 4,
            pieceToPlay = {
                x: 1,
                y: 4,
                user: 2
            };
        let result = checkHorizontal(plate.Plate, pieceToWin, pieceToPlay);
        assert.equal(result.win, false);
        assert.equal(result.user, pieceToPlay.user);
        assert.equal(result.count, 3);
    });
});
