"use strict";

var assert = require('assert');
var plate = require('./_initialData');
var addPieceScript = require('../lib/addPieceScript');

describe('---- add piece to party ----', function () {

    it(' add a piece to the game should succed, all rigth!', function () {

        let indexPiece = [],
            piece = {
                "id": 1,
                "x": 1,
                "y": 0,
                "userId": 1,
                "weight": 5,
                "state": 0
            };

        let plateToAddPiece = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ];

        let userToTest = Object.assign({}, plate.Users.get("1"))

        assert.equal(0, indexPiece.length);
        assert.equal(1, plate.Users.get("1").pieceAction);
        assert.equal(0, plateToAddPiece[0][piece.x]);
        addPieceScript(plateToAddPiece, indexPiece, piece, userToTest);
        assert.equal(0, userToTest.pieceAction);
        assert.equal(piece.x, plateToAddPiece[0][piece.x].x);
        assert.equal(1, indexPiece.length);

    });

    it(' add a piece to the game should failed, because user can\'t play', function () {

        let indexPiece = [],
            piece = {
                "id": 1,
                "x": 1,
                "y": 0,
                "userId": 2,
                "weight": 2,
                "state": 0
            };

        let plateToAddPiece = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ];

        let userToTest = Object.assign({}, plate.Users.get("2"))

        assert.equal(0, indexPiece.length);
        addPieceScript(plateToAddPiece, indexPiece, piece, userToTest);
        assert.equal(0, indexPiece.length);

    });

    it(' add a piece to the game should failed, because a piece block the action!', function () {

        let indexPiece = [],
            piece = {
                "id": 1,
                "x": 0,
                "y": 0,
                "userId": 1,
                "weight": 5,
                "state": 0
            };


        let plateToAddPiece = [
            [{
                "id": 1,
                "x": 0,
                "y": 0,
                "userId": 1,
                "state": 0,
                "weight": 4
            }, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ];

        let userToTest = Object.assign({}, plate.Users.get("1"))


        assert.equal(0, indexPiece.length);
        addPieceScript(plateToAddPiece, indexPiece, piece, userToTest);
        assert.equal(0, indexPiece.length);

    });

    it(' add a piece to the game should failed, because it\s not the user turn!', function () {

        let indexPiece = [],
            piece = {
                "id": 1,
                "x": 1,
                "y": 0,
                "userId": 3,
                "weight": 5,
                "state": 0
            };

        let plateToAddPiece = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ];

        let userToTest = Object.assign({}, plate.Users.get("3"))

        assert.equal(0, indexPiece.length);
        addPieceScript(plateToAddPiece, indexPiece, piece, userToTest);
        assert.equal(0, indexPiece.length);

    });


    it(' add a piece to the game should failed, because piece weight doesn\'t match user weight capability!', function () {

        let indexPiece = [],
            piece = {
                "id": 1,
                "x": 1,
                "y": 0,
                "userId": 1,
                "weight": 6,
                "state": 0
            };

        let plateToAddPiece = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ];
        let userToTest = Object.assign({}, plate.Users.get("1"))

        assert.equal(0, indexPiece.length);
        addPieceScript(plateToAddPiece, indexPiece, piece, userToTest);
        assert.equal(0, indexPiece.length);

    });
});