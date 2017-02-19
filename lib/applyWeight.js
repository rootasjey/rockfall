"use strict";

var Piece = require("./model/piece");
var Board = require("./model/board");
/**
 * @param boardGame object with game information
 * @param piece piece to apply weight
 *
 *
 * function to apply physic to a specific piece
 */
function applyWeight(boardGame, piece) {

    //verify input variable
    Board.isValideBoard(boardGame);
    Piece.isValidePiece(piece);

    let xStartPosition = piece.x;
    let yStartPosition = piece.y;
    let pieceWeight = piece.weight;
    let sumOfTopPiece = 0;
    if (piece.state != 0) return;
    for (let yPosition = yStartPosition - 1; yPosition >= 0; yPosition--) {
        let topPiece = boardGame[yPosition][xStartPosition];
        if (topPiece == 0) break;
        sumOfTopPiece += topPiece.weight;
    }
    if (sumOfTopPiece > (pieceWeight * 2)) piece.state = 2;
}


module.exports = applyWeight;