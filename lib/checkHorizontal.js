"use strict";

var Piece = require("./model/piece");
var Board = require("./model/board");

/**
 * @param boardGame object with game information
 * @param nbAlignPieceToWin number horizontal piece align to win
 * @param piece piece to start to test a horizontal win
 *
 * @return object with verification status
 *
 * function to test a horizontal win start to a specific piece
 */
function checkHorizontal(boardGame, nbAlignPieceToWin, piece) {

    //verify input variable
    Board.canHorizontalWin(boardGame, nbAlignPieceToWin);
    Board.isValid(boardGame);
    Piece.isValid(piece);

    let xStartPosition = piece.x;
    let yStartPosition = piece.y;
    let userId = piece.userId;
    let countPiece = 1;
    let arrayOfWinPiece = [piece];

    let result = {
        "count": 0,
        "user": userId,
        "win": false,
        "winPiece": []
    };
    
    if(!Piece.isNeutralPiece(piece)){
        return result;
    }

    /** count to the right */
    for (let xPosition = xStartPosition + 1; xPosition < boardGame[0].length; xPosition++) {
        let rightPiece = boardGame[yStartPosition][xPosition];
        if(Board.isEmptyCase(boardGame, xPosition, yStartPosition) || !Piece.isNeutralPiece(rightPiece) || rightPiece.userId != userId) break;
        countPiece++;
        arrayOfWinPiece.push(rightPiece);
    }

    /** count to the left */
    for (let xPosition = xStartPosition - 1; xPosition >= 0; xPosition--) {
        let leftPiece = boardGame[yStartPosition][xPosition];
        if(Board.isEmptyCase(boardGame, xPosition, yStartPosition) || !Piece.isNeutralPiece(leftPiece) || leftPiece.userId != userId) break;
        countPiece++;
        arrayOfWinPiece.push(leftPiece);
    }

    if (countPiece >= nbAlignPieceToWin) {
        result.count = countPiece;
        result.win = true;
        arrayOfWinPiece.forEach(function(piece) {piece.state = 3});
        result.winPiece = arrayOfWinPiece;
    }else{
        result.count = countPiece;
    }
    return result;
}

module.exports = checkHorizontal;
