"use strict";

var Piece = require("./model/piece");
var UserFunction = require("./usersFunction");
var Board = require("./model/board");
/**
 * function to add a piece to the boardGame
 */
function addPieceScript(boardGame, indexPiece, piece, user) {

    Board.isValid(boardGame);
    Piece.isValid(piece);
    console.log(piece);
    console.log(user);
    console.log(Board.isEmptyCase(boardGame, piece.x, 0));
    console.log(UserFunction.userCanPlay(user, piece));
    console.log(UserFunction.isWeightPresent(user, piece));

    if (Board.isEmptyCase(boardGame, piece.x, 0) && UserFunction.userCanPlay(user, piece) && UserFunction.isWeightPresent(user, piece)) {
        piece.y = 0;
        boardGame[0][piece.x] = piece;
        indexPiece.push(piece);
        user.pieceAction -= 1;
        console.log(boardGame);
    }
}

module.exports = addPieceScript;
