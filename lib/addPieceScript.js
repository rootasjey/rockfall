"use strict";

var Piece = require("./model/piece");
var UserFunction = require("./usersFunction");
var Board = require("./model/board");
/**
 * function to add a piece to the boardGame
 */
function addPieceScript(boardGame, indexPiece, piece, user) {

    Board.isValideBoard(boardGame);
    Piece.isValidePiece(piece);

    if (Board.isEmptyCase(boardGame, piece.x, 0) && UserFunction.isUserCanPlay(user, piece) && UserFunction.isUserHavePieceWeight(user, piece)) {
        piece.y = 0;
        boardGame[0][piece.x] = piece;
        indexPiece.push(piece);
        user.pieceAction -= 1;
    }
}

module.exports = addPieceScript;
