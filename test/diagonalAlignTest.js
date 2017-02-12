"use strict";

var assert = require('assert');
var plate = require('./_initialData');
var checkDiagonal = require('../lib/checkDiagonal');

describe('---- Check diagonal align ----', function() {

    it('for 4 pieces to win, it should return true in win object', function() {
        let pieceToWin = 3,
            pieceToPlay = {
                "id": 11,
                "x": 2,
                "y": 3,
                "user": 2,
                "state": 0,
                "weight": 4
            };

        let plateClone = JSON.parse(JSON.stringify(plate.Plate));
        plateClone[3][2] = pieceToPlay;
        
        let result = checkDiagonal(plateClone, pieceToWin, pieceToPlay);

        assert.equal(result.win, true);
        assert.equal(result.user, pieceToPlay.user);
        assert.equal(result.countPiece, 3);

        let sizeFirst = result.winPiece.filter(obj => obj.x == 2 && obj.y == 3 && obj.state == 3).length;
        let sizeSecond = result.winPiece.filter(obj => obj.x == 3 && obj.y == 4 && obj.state == 3).length;
        let sizeThird = result.winPiece.filter(obj => obj.x == 1 && obj.y == 2 && obj.state == 3).length;
        assert.equal(sizeFirst,1);
        assert.equal(sizeSecond,1);
        assert.equal(sizeThird,1);
    });

    it('for 4 pieces to win, it should return false in win object', function() {
        let pieceToWin = 3,
            pieceToPlay = {
                "id": 15,
                "x": 2,
                "y": 4,
                "user": 2,
                "state": 0,
                "weight": 4
            };
        let plateClone = JSON.parse(JSON.stringify(plate.Plate));
        plateClone[4][2] = pieceToPlay;
        let result = checkDiagonal(plateClone, pieceToWin, pieceToPlay);

        assert.equal(result.win, false);
        assert.equal(result.user, pieceToPlay.user);
        assert.equal(result.countPiece, 0);
    });
});
