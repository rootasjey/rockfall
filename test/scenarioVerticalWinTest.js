"use strict";

let assert = require('assert');
let UsersFunction = require('../lib/usersFunction');
let addPieceScript = require('../lib/addPieceScript');
let applyRule = require('../lib/applyRule');

describe('---- Script some plays ----', function () {

    it(' start simulation Vertical Win', function () {

        //initialization game variable

        //index array piece
        let indexPieceTest = [];

        //player

        let usersTest = new Map();
        usersTest.set("abd528FC", { "id": "abd528FC", "name": "Loskarll", "order": 1, "turn": 0, "score": 0, "point": 0, "pieceAction": 0, "pieceActionPerTurn": 1, "weightPiece": [5, 10, 15] });
        usersTest.set("ef585das", { "id": "ef585das", "name": "RootAsJey", "order": 2, "turn": 0, "score": 0, "point": 0, "pieceAction": 0, "pieceActionPerTurn": 1, "weightPiece": [2, 4, 20] });
        usersTest.set("ef58ffas",{ "id": "ef58ffas", "name": "Oshin", "order": 3, "turn": 0, "score": 0, "point": 0, "pieceAction": 0, "pieceActionPerTurn": 1, "weightPiece": [5, 20, 30] });

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
            "nbAlignPieceToWin":4
        };

        //1 - First player : {x:0, weight:15}
        UsersFunction.getNextUserToPlay(usersTest);
        let firstUser = null; 
        usersTest.forEach((user)=>{if(user.turn ==1){firstUser = user}});
        let piece = { "id": 1, "x": 0, "y": 0, "state": 0, "weight": firstUser.weightPiece[2], "user": firstUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, firstUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);
        
        assert.equal(boardGameTest[4][0].id, 1);

        // 2 - Second player : {x:1, wieght: 2}
        UsersFunction.getNextUserToPlay(usersTest);
        let secondUser = null;
        usersTest.forEach((user)=>{if(user.turn ==1){secondUser = user}});
        piece = { "id": 2, "x": 1, "y": 0, "state": 0, "weight": secondUser.weightPiece[0], "user": secondUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, secondUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);
        
        assert.equal(boardGameTest[4][1].id, 2);

        //3 - Third player : {x:0, weight:20}
        UsersFunction.getNextUserToPlay(usersTest);
        let thirdUser = null;
        usersTest.forEach((user)=>{if(user.turn ==1){thirdUser = user}});
        piece = { "id": 3, "x": 0, "y": 0, "state": 0, "weight": thirdUser.weightPiece[1], "user": thirdUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, thirdUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);
        
        assert.equal(boardGameTest[3][0 ].id, 3);

        //4 - First player : {x:2, weigth:15}
        UsersFunction.getNextUserToPlay(usersTest);
        usersTest.forEach((user)=>{if(user.turn ==1){firstUser = user}});
        piece = { "id": 4, "x": 2, "y": 0, "state": 0, "weight": firstUser.weightPiece[2], "user": firstUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, firstUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);

        assert.equal(boardGameTest[4][2].id, 4);

        //5 - Second player : {x:3, weight:20}
        UsersFunction.getNextUserToPlay(usersTest);
        usersTest.forEach((user)=>{if(user.turn ==1){secondUser = user}});
        piece = { "id": 5, "x": 3, "y": 0, "state": 0, "weight": secondUser.weightPiece[2], "user": secondUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, secondUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);
        
        assert.equal(boardGameTest[4][3].id, 5);

        //6 - Third player : {x:1, weight:30}
        UsersFunction.getNextUserToPlay(usersTest);
        usersTest.forEach((user)=>{if(user.turn ==1){thirdUser = user}});
        piece = { "id": 6, "x": 1, "y": 0, "state": 0, "weight": thirdUser.weightPiece[2], "user": thirdUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, thirdUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);

        assert.equal(boardGameTest[4][1].id, 6);

        //7

        //8 - First player : {x:2, weight: 10}
        UsersFunction.getNextUserToPlay(usersTest);
        usersTest.forEach((user)=>{if(user.turn ==1){firstUser = user}});
        piece = { "id": 7, "x": 2, "y": 0, "state": 0, "weight": firstUser.weightPiece[1], "user": firstUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, firstUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);

        assert.equal(boardGameTest[3][2].id, 7);

        //9 - Second player : {x:3, weight:20}
        UsersFunction.getNextUserToPlay(usersTest);
        usersTest.forEach((user)=>{if(user.turn ==1){secondUser = user}});
        piece = { "id": 8, "x": 3, "y": 0, "state": 0, "weight": secondUser.weightPiece[2], "user": secondUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, secondUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);

        assert.equal(boardGameTest[3][3].id, 8);

        //10 - Third player PASS
        UsersFunction.getNextUserToPlay(usersTest);

        //11 - First player : {x:2, weight:5}
        UsersFunction.getNextUserToPlay(usersTest);
        usersTest.forEach((user)=>{if(user.turn ==1){firstUser = user}});
        piece = { "id": 9, "x": 2, "y": 0, "state": 0, "weight": firstUser.weightPiece[0], "user": firstUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, firstUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);

        assert.equal(boardGameTest[2][2].id, 9);

        //12 - Second player : {x:3, weight:4}
        UsersFunction.getNextUserToPlay(usersTest);
        usersTest.forEach((user)=>{if(user.turn ==1){secondUser = user}});
        piece = { "id": 10, "x": 3, "y": 0, "state": 0, "weight": secondUser.weightPiece[1], "user": secondUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, secondUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);

        assert.equal(boardGameTest[2][3].id, 10);

        //13 - Third player : {x:1, weight:20}
        UsersFunction.getNextUserToPlay(usersTest);
        usersTest.forEach((user)=>{if(user.turn ==1){thirdUser = user}});
        piece = { "id": 11, "x": 1, "y": 0, "state": 0, "weight": thirdUser.weightPiece[1], "user": thirdUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, thirdUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);

        assert.equal(boardGameTest[3][1].id, 11);
        
        //14 - First player : {x:2, weight:5}
        UsersFunction.getNextUserToPlay(usersTest);
        usersTest.forEach((user)=>{if(user.turn ==1){firstUser = user}});
        piece = { "id": 12, "x": 2, "y": 0, "state": 0, "weight": firstUser.weightPiece[0], "user": firstUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, firstUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);
        //assert remain piece
        assert.equal(boardGameTest[4][0].id, 1);
        assert.equal(boardGameTest[4][1].id, 6);
        assert.equal(boardGameTest[4][3].id, 5);
        assert.equal(boardGameTest[3][0].id, 3);
        assert.equal(boardGameTest[3][1].id, 11);
        assert.equal(boardGameTest[3][3].id, 8);
        assert.equal(boardGameTest[2][3].id, 10);
        //assert user point
        usersTest.forEach((user)=>{if(user.order == 1){firstUser = user}});
        usersTest.forEach((user)=>{if(user.order == 2){secondUser = user}});
        usersTest.forEach((user)=>{if(user.order == 3){thirdUser = user}});

        assert.equal(firstUser.point, 35);
        assert.equal(secondUser.point, 2);
        assert.equal(thirdUser.point, 0);
    });
});
