"use strict";

var Piece = require("./model/piece");
var Board = require("./model/board");

/**
 * @param boardGame object with game information
 * @param nbForWinLine number horizontal piece align to win
 * @param piece piece to start to test a horizontal win
 *
 * @return object with verification status
 *
 * function to test a horizontal win start to a specific piece
 */
function checkHorizontal(boardGame, nbForWinLine, piece) {

    //verify input variable
    Board.isHorizontalWinPossible(boardGame, nbForWinLine);
    Board.isValideBoard(boardGame);
    Piece.isValidePiece(piece);

    let xStartPosition = piece.x;
    let yStartPosition = piece.y;
    let userId = piece.user;
    let countPiece = 1;
    let arrayOfWinPiece = [piece];

    /** count to the right */
    for (let xPosition = xStartPosition + 1; xPosition < boardGame[0].length; xPosition++) {
        let rightPiece = boardGame[yStartPosition][xPosition];
        if(Board.isEmptyCase(boardGame, xPosition, yStartPosition) || !Piece.isNeutralPiece(rightPiece) || rightPiece.user != userId) break;
        countPiece++;
        arrayOfWinPiece.push(rightPiece);
    }

    /** count to the left */
    for (let xPosition = xStartPosition - 1; xPosition >= 0; xPosition--) {
        let leftPiece = boardGame[yStartPosition][xPosition];
        if(Board.isEmptyCase(boardGame, xPosition, yStartPosition) || !Piece.isNeutralPiece(leftPiece) || leftPiece.user != userId) break;
        countPiece++;
        arrayOfWinPiece.push(leftPiece);
    }

    let result = {
        "count": countPiece,
        "user": userId,
        "win": false,
        "winPiece": []
    };

    if (countPiece >= nbForWinLine) {
        result.win = true;
        arrayOfWinPiece.forEach(function(piece) {piece.state = 3});
        result.winPiece = arrayOfWinPiece;
    }
    return result;
}

module.exports = checkHorizontal;
