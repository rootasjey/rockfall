"use strict";

var Piece = require("./model/piece");

/**
 * @param boardGame object with game information
 * @param piece piece to apply weight
 *
 *
 * function to apply physic to a specific piece
 */
function applyWeight(boardGame, piece) {

    //verify input variable
    if (!boardGame.length) throw new Error("undefined boardGame!");
    if (!boardGame[0].length) throw new Error("undefined boardGame!");
    Piece.pieceValidation(piece);

    let xStartPosition = piece.x;
    let yStartPosition = piece.y;
    let pieceWeight = piece.weight;
    let sumWeightPiece = 0;
    if (piece.state == 0) {
        for (let i = yStartPosition - 1; i >= 0; i--) {
            if (i >= 0) {
                let tamponPiece = boardGame[i][xStartPosition];
                if (tamponPiece != 0) {
                    sumWeightPiece += tamponPiece.weight;
                } else {
                    break;
                }
            }
        }
        if (sumWeightPiece > pieceWeight * 2) {
            piece.state = 2;
        }
    }
}

module.exports = applyWeight;