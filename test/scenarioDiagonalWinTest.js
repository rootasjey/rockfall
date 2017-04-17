"use strict";

let assert = require('assert');
let UsersFunction = require('../lib/usersFunction');
let addPieceScript = require('../lib/addPieceScript');
let applyRule = require('../lib/applyRule');

describe('---- Script some plays ----', function () {

    it(' start simulation Diagonal Win', function () {

        //initialization game variable

        //index array piece
        let indexPieceTest = [];

        //player
        let usersTest = [
            { "id": "abd528FC", "name": "Loskarll", "order": 1, "turn": 0, "score": 0, "point": 0, "pieceAction": 0, "pieceActionPerTurn": 1, "weightPiece": [5, 10, 15] },
            { "id": "ef585das", "name": "Oshin", "order": 2, "turn": 0, "score": 0, "point": 0, "pieceAction": 0, "pieceActionPerTurn": 1, "weightPiece": [2, 8, 16] },
            { "id": "ef58ffas", "name": "RootAsJey", "order": 3, "turn": 0, "score": 0, "point": 0, "pieceAction": 0, "pieceActionPerTurn": 1, "weightPiece": [6, 15, 30] }
        ];

        //boardGame
        let boardGameTest = [
            [0, 0, 0, 0, 0, 0], // 0
            [0, 0, 0, 0, 0, 0], // 1
            [0, 0, 0, 0, 0, 0], // 2
            [0, 0, 0, 0, 0, 0], // 3
            [0, 0, 0, 0, 0, 0]  // 4
          // 0  1  2  3  4  5
        ];

        //game rules
        let gameRules = {
            //number of align piece to win
            "nbForWinLine":3
        };

        //1 - First player : {x:0, weight:5}
        UsersFunction.getNextUserToPlay(usersTest);
        let firstUser = usersTest.find(user => user.turn == 1);
        let piece = { "id": 1, "x": 0, "y": 0, "state": 0, "weight": firstUser.weightPiece[0], "user": firstUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, firstUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);
        
        assert.equal(boardGameTest[4][0].id, 1);

        // 2 - Second player : {x:1, weight: 16}
        UsersFunction.getNextUserToPlay(usersTest);
        let secondUser = usersTest.find(user => user.turn == 1);
        piece = { "id": 2, "x": 1, "y": 0, "state": 0, "weight": secondUser.weightPiece[2], "user": secondUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, secondUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);
        
        assert.equal(boardGameTest[4][1].id, 2);

        //3 - Third player : {x:2, weight:30}
        UsersFunction.getNextUserToPlay(usersTest);
        let thirdUser = usersTest.find(user => user.turn == 1);
        piece = { "id": 3, "x": 2, "y": 0, "state": 0, "weight": thirdUser.weightPiece[2], "user": thirdUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, thirdUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);
        
        assert.equal(boardGameTest[4][2].id, 3);

        //4 - First player : {x:3, weigth:15}
        UsersFunction.getNextUserToPlay(usersTest);
        firstUser = usersTest.find(user => user.turn == 1);
        piece = { "id": 4, "x": 3, "y": 0, "state": 0, "weight": firstUser.weightPiece[2], "user": firstUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, firstUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);

        assert.equal(boardGameTest[4][3].id, 4);

        //5 - Second player : {x:2, weight:8}
        UsersFunction.getNextUserToPlay(usersTest);
        thirdUser = usersTest.find(user => user.turn == 1);
        piece = { "id": 5, "x": 2, "y": 0, "state": 0, "weight": thirdUser.weightPiece[1], "user": thirdUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, thirdUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);
        
        assert.equal(boardGameTest[3][2].id, 5);

        //6 - Third player : {x:3, weight:15}
        UsersFunction.getNextUserToPlay(usersTest);
        firstUser = usersTest.find(user => user.turn == 1);
        piece = { "id": 6, "x": 3, "y": 0, "state": 0, "weight": firstUser.weightPiece[1], "user": firstUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, firstUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);

        assert.equal(boardGameTest[3][3].id, 6);

        //7 - First player : {x:1, weight: 15}
        UsersFunction.getNextUserToPlay(usersTest);
        secondUser = usersTest.find(user => user.turn == 1);
        piece = { "id": 7, "x": 1, "y": 0, "state": 0, "weight": secondUser.weightPiece[2], "user": secondUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, secondUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);

        assert.equal(boardGameTest[3][1].id, 7);

        //8 - Second player : {x:3, weight:8}
        UsersFunction.getNextUserToPlay(usersTest);
        firstUser = usersTest.find(user => user.turn == 1);
        piece = { "id": 8, "x": 3, "y": 0, "state": 0, "weight": firstUser.weightPiece[1], "user": firstUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, firstUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);
    
        //assert remain piece
        assert.equal(boardGameTest[4][0].id, 1);
        assert.equal(boardGameTest[4][1].id, 7);
        assert.equal(boardGameTest[4][2].id, 3);
        assert.equal(boardGameTest[4][3].id, 4);
        assert.equal(boardGameTest[3][3].id, 6);
       
        //assert user point
        firstUser = usersTest.find(user => user.order == 1);
        secondUser = usersTest.find(user => user.order == 2);
        thirdUser = usersTest.find(user => user.order == 3);

        assert.equal(firstUser.point, 0);
        assert.equal(secondUser.point, 32);
        assert.equal(thirdUser.point, 0);
    });
});
