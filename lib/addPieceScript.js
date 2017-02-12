"use strict";

var Piece = require("./model/piece");
/**
 * function to add a piece to the boardGame
 */
function addPieceScript(boardGame, indexPiece, piece, user) {

    Piece.pieceValidation(piece);
    if (!boardGame.length) throw new Error("undefined boardGame!");
    if (!boardGame[0].length) throw new Error("undefined boardGame!");

    if (boardGame[0][piece.x] == 0 && user.pieceAction && user.turn && user.id == piece.user && user.weightPiece.indexOf(piece.weight) != -1) {
        piece.y = 0;
        boardGame[0][piece.x] = piece;
        indexPiece.push(piece);
        user.pieceAction -= 1;
    }
}

module.exports = addPieceScript;
