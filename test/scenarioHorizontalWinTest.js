"use strict";

let assert = require('assert');
let UsersFunction = require('../lib/usersFunction');
let addPieceScript = require('../lib/addPieceScript');
let applyRule = require('../lib/applyRule');

describe('---- Script some plays ----', function () {

    it(' start simulation Horizontal Win', function () {

        //initialization game variable

        //index array piece
        let indexPieceTest = [];

        //player
        let usersTest = new Map();
        usersTest.set("abd528FC",{ "id": "abd528FC", "name": "RootAsJey", "order": 1, "turn": 0, "score": 0, "point": 0, "pieceAction": 0, "pieceActionPerTurn": 1, "weightPiece": [5, 10, 15] });
        usersTest.set("ef585das",{ "id": "ef585das", "name": "Loskarll", "order": 2, "turn": 0, "score": 0, "point": 0, "pieceAction": 0, "pieceActionPerTurn": 1, "weightPiece": [2, 4, 20] });
        usersTest.set("ef58ffas",{ "id": "ef58ffas", "name": "Oshin", "order": 3, "turn": 0, "score": 0, "point": 0, "pieceAction": 0, "pieceActionPerTurn": 1, "weightPiece": [5, 10, 20] });

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

        let piece = { "id": 1, "x": 0, "y": 0, "state": 0, "weight": firstUser.weightPiece[2], "userId": firstUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, firstUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);
        
        assert.equal(boardGameTest[4][0].id, 1);

        // 2 - Second player : {x:1, wieght: 2}
        UsersFunction.getNextUserToPlay(usersTest);
        let secondUser = null;
        usersTest.forEach((user)=>{if(user.turn ==1){secondUser = user}});
        piece = { "id": 2, "x": 1, "y": 0, "state": 0, "weight": secondUser.weightPiece[0], "userId": secondUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, secondUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);
        
        assert.equal(boardGameTest[4][1].id, 2);

        //3 - Third player : {x:2, weight:10}
        UsersFunction.getNextUserToPlay(usersTest);
        let thirdUser = null;
        usersTest.forEach((user)=>{if(user.turn ==1){thirdUser = user}});
        piece = { "id": 3, "x": 2, "y": 0, "state": 0, "weight": thirdUser.weightPiece[1], "userId": thirdUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, thirdUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);
        
        assert.equal(boardGameTest[4][2].id, 3);

        //4 - First player : {x:2, weigth:5}
        UsersFunction.getNextUserToPlay(usersTest);
        usersTest.forEach((user)=>{if(user.turn ==1){firstUser = user}});
        piece = { "id": 4, "x": 1, "y": 0, "state": 0, "weight": firstUser.weightPiece[0], "userId": firstUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, firstUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);

        assert.equal(boardGameTest[4][1].id, 4);

        //5 - Second player : PASS
        secondUser = UsersFunction.getNextUserToPlay(usersTest);

        //6 - Third player : {x:0, weight:20}
        UsersFunction.getNextUserToPlay(usersTest);
        usersTest.forEach((user)=>{if(user.turn ==1){secondUser = user}});
        piece = { "id": 5, "x": 0, "y": 0, "state": 0, "weight": thirdUser.weightPiece[2], "userId": thirdUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, thirdUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);
        
        assert.equal(boardGameTest[3][0].id, 5);

        //7 - First player : {x:2, weight:15}
        UsersFunction.getNextUserToPlay(usersTest);
        usersTest.forEach((user)=>{if(user.turn ==1){firstUser = user}});
        piece = { "id": 6, "x": 2, "y": 0, "state": 0, "weight": firstUser.weightPiece[2], "userId": firstUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, firstUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);

        assert.equal(boardGameTest[3][2].id, 6);

        //8 - Second player : {x:3, weight: 2}
        UsersFunction.getNextUserToPlay(usersTest);
        usersTest.forEach((user)=>{if(user.turn ==1){secondUser = user}});
        piece = { "id": 7, "x": 3, "y": 0, "state": 0, "weight": secondUser.weightPiece[0], "userId": secondUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, secondUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);

        assert.equal(boardGameTest[4][3].id, 7);

        //9 - Third player : {x:3, weight:5}
        UsersFunction.getNextUserToPlay(usersTest);
        usersTest.forEach((user)=>{if(user.turn ==1){thirdUser = user}});
        piece = { "id": 8, "x": 3, "y": 0, "state": 0, "weight": thirdUser.weightPiece[0], "userId": thirdUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, thirdUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);

        assert.equal(boardGameTest[4][3].id, 8);

        //10 -

        //11 - First player : {x:2, weight:10}
        UsersFunction.getNextUserToPlay(usersTest);
        usersTest.forEach((user)=>{if(user.turn ==1){firstUser = user}});
        piece = { "id": 9, "x": 2, "y": 0, "state": 0, "weight": firstUser.weightPiece[1], "userId": firstUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, firstUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);

        assert.equal(boardGameTest[3][2].id, 9);

        //12 -

        //13 - Second player : {x:4, weight:4}
        UsersFunction.getNextUserToPlay(usersTest);
        usersTest.forEach((user)=>{if(user.turn ==1){secondUser = user}});
        piece = { "id": 10, "x": 4, "y": 0, "state": 0, "weight": secondUser.weightPiece[1], "userId": secondUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, secondUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);

        assert.equal(boardGameTest[4][4].id, 10);

        //14 - Third player : {x:4, weight:10}
        UsersFunction.getNextUserToPlay(usersTest);
        usersTest.forEach((user)=>{if(user.turn ==1){thirdUser = user}});
        piece = { "id": 11, "x": 4, "y": 0, "state": 0, "weight": thirdUser.weightPiece[1], "userId": thirdUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, thirdUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);

        assert.equal(boardGameTest[4][4].id, 11);

        //15 -
        
        //16 - First player : {x:3, weight:15}
        UsersFunction.getNextUserToPlay(usersTest);
        usersTest.forEach((user)=>{if(user.turn ==1){firstUser = user}});
        piece = { "id": 12, "x": 3, "y": 0, "state": 0, "weight": firstUser.weightPiece[2], "userId": firstUser.id };
        addPieceScript(boardGameTest, indexPieceTest, piece, firstUser);
        indexPieceTest = applyRule(boardGameTest, indexPieceTest, usersTest, gameRules);
        //assert remain piece
        assert.equal(boardGameTest[4][0].id, 5);
        assert.equal(boardGameTest[4][2].id, 9);
        assert.equal(boardGameTest[4][4].id, 11);
        //assert user point
        usersTest.forEach((user)=>{if(user.order ==1){firstUser = user}});
        usersTest.forEach((user)=>{if(user.order ==2){secondUser = user}});
        usersTest.forEach((user)=>{if(user.order ==3){thirdUser = user}});

        assert.equal(firstUser.point, 50);
        assert.equal(secondUser.point, 8);
        assert.equal(thirdUser.point, 15);
    });
});
