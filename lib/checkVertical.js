"use strict";

var Piece = require("./model/piece");
var Board = require("./model/board");

/**
 * @param boardGame object with game information
 * @param nbAlignPieceToWin number horizontal piece align to win
 * @param piece piece to start to test a vertical win
 *
 * @return object with verification status
 *
 * function to test a vertical win start to a specific piece
 */
function checkVertical(boardGame, nbAlignPieceToWin, piece) {

    //verify input variable
    Board.canVerticalWin(boardGame, nbAlignPieceToWin);
    Board.isValid(boardGame);
    Piece.isValid(piece);

    let xStartPosition = piece.x;
    let yStartPosition = piece.y;
    let userId = piece.user;
    let countPiece = 1;
    let arrayOfWinPiece = [piece];

    /** count to the bottom */
    for (let yPosition = yStartPosition + 1; yPosition < boardGame.length; yPosition++) {
        let bottomPiece = boardGame[yPosition][xStartPosition];
        if (Board.isEmptyCase(boardGame, xStartPosition, yPosition) || !Piece.isNeutralPiece(bottomPiece) || bottomPiece.user != userId) break;
        countPiece++;
        arrayOfWinPiece.push(bottomPiece);
    }

    /** count to the top */
    for (let yPosition = yStartPosition - 1; yPosition >= 0; yPosition--) {
        let topPiece = boardGame[yPosition][xStartPosition];
        if (Board.isEmptyCase(boardGame, xStartPosition, yPosition) || !Piece.isNeutralPiece(topPiece) || topPiece.user != userId) break;
        countPiece++;
        arrayOfWinPiece.push(topPiece);
    }
    let result = {
        "count": countPiece,
        "user": userId,
        "win": false,
        "winPiece": []
    };

    if (countPiece >= nbAlignPieceToWin) {
        result.win = true;
        arrayOfWinPiece.forEach(function (piece) {
            piece.state = 3
        });
        result.winPiece = arrayOfWinPiece;
    }
    return result;
}

module.exports = checkVertical;