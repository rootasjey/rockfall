"use strict";

var Piece = require("./model/piece");
var Board = require("./model/board");
/**
 * @param boardGame object with game information
 * @param piece piece to apply physic
 *
 * function to apply physic to a specific piece
 */
function applyPhysic(boardGame, piece) {

    //verify input variable
    Board.isValide(boardGame);
    Piece.isValide(piece);

    let xStartPosition = piece.x;
    let yStartPosition = piece.y;
    let yNextPosition = yStartPosition + 1;
    if (isNextYCaseAreNotInBoard(yNextPosition, boardGame)) return;
    if (Board.isEmptyCase(boardGame, xStartPosition, yNextPosition))
        boardGame[yStartPosition][xStartPosition].state = 1;
}

/**
 * function to check if position +1 on y axe of a piece is still board game length
 */
function isNextYCaseAreNotInBoard(nextYposition, boardGame) {
    return nextYposition >= boardGame.length;
}

module.exports = applyPhysic;
