"use strict";

var Piece = require("./model/piece");
var Board = require("./model/board");

/**
 * @param boardGame object with game information
 * @param nbAlignPieceToWin number horizontal piece align to win
 * @param piece piece to start to test a diagonal win
 *
 * @return object with verification status
 *
 * function to test a diagonal win start to a specific piece
 */
function checkDiagonal(boardGame, nbAlignPieceToWin, piece) {

    //verify input variable
    Board.canVerticalWin(boardGame, nbAlignPieceToWin);
    Board.canHorizontalWin(boardGame, nbAlignPieceToWin);
    Board.isValid(boardGame);
    Piece.isValid(piece);

    let xStartPosition = piece.x;
    let yStartPosition = piece.y;
    let userId = piece.userId;
    let countPieceTopRight = 1;
    let countPieceTopLeft = 1;
    let arrayOfWinPieceRight = [piece];
    let arrayOfWinPieceLeft = [piece];

    let result = {
        "countPiece": 0,
        "user": userId,
        "win": false,
        "winPiece": []
    };

    if(!Piece.isNeutralPiece(piece)){
        return result;
    }

    /** count to the top-right and bottom right */
    let indiceTopRight = 1;
    let indiceBottomRight = 1;
    //update vertical position because of diagonal
    let verticalAdjust = 1;
    let stopCountTopRight = false,
        stopCountTopLeft = false;

    //to the right
    for (let xPosition = xStartPosition + 1, boardLength = boardGame[0].length; xPosition < boardLength; xPosition++) {

        let yPositionTopAdjust = yStartPosition - verticalAdjust;
        if (yPositionTopAdjust >= 0 && !stopCountTopRight) {
            let topRightPiece = boardGame[yPositionTopAdjust][xPosition];
            if (!Board.isEmptyCase(boardGame, xPosition, yPositionTopAdjust) && Piece.isNeutralPiece(topRightPiece) && topRightPiece.userId == userId) {
                countPieceTopRight++;
                arrayOfWinPieceRight.push(topRightPiece);
            } else {
                stopCountTopRight = true;
            }
        }
        let yPositionBottomAdjust = yStartPosition + verticalAdjust;
        if (yPositionBottomAdjust < boardGame.length && !stopCountTopLeft) {
            let bottomRightPiece = boardGame[yPositionBottomAdjust][xPosition];
            if (!Board.isEmptyCase(boardGame, xPosition, yPositionBottomAdjust) && Piece.isNeutralPiece(bottomRightPiece) && bottomRightPiece.userId == userId) {
                countPieceTopLeft++;
                arrayOfWinPieceLeft.push(bottomRightPiece);
            } else {
                stopCountTopLeft = true;
            }
        }
        verticalAdjust++;
    }

    //to the left
    verticalAdjust = 1;
    stopCountTopRight = false;
    stopCountTopLeft = false;
    for (let xPosition = xStartPosition - 1; xPosition >= 0; xPosition--) {

        let yPositionTopAdjust = yStartPosition - verticalAdjust;
        if (yPositionTopAdjust >= 0) {
            let topLeftPiece = boardGame[yPositionTopAdjust][xPosition];
            if (!Board.isEmptyCase(boardGame, xPosition, yPositionTopAdjust) && Piece.isNeutralPiece(topLeftPiece) && topLeftPiece.userId == userId) {
                countPieceTopLeft++;
                arrayOfWinPieceLeft.push(topLeftPiece);
            } else {
                stopCountTopLeft = true;
            }
        }

        let yPositionBottomAdjust = yStartPosition + verticalAdjust;
        if (yPositionBottomAdjust < boardGame.length) {
            let bottomLeftPiece = boardGame[yPositionBottomAdjust][xPosition];
            if (!Board.isEmptyCase(boardGame, xPosition, yPositionBottomAdjust) && Piece.isNeutralPiece(bottomLeftPiece) && bottomLeftPiece.userId == userId) {
                countPieceTopRight++;
                arrayOfWinPieceRight.push(bottomLeftPiece);
            } else {
                stopCountTopRight = true;
            }
        }
        verticalAdjust++;
    }


    if (countPieceTopRight >= nbAlignPieceToWin) {
        result.win = true;
        result.countPiece = countPieceTopRight;
        arrayOfWinPieceRight.forEach(function (piece) {
            piece.state = 3
        });
        result.winPiece = arrayOfWinPieceRight;
    }
    if (countPieceTopLeft >= nbAlignPieceToWin && countPieceTopRight < countPieceTopLeft) {
        result.win = true;
        result.countPiece = countPieceTopLeft;
        arrayOfWinPieceLeft.forEach(function (piece) {
            piece.state = 3
        })
        result.winPiece = arrayOfWinPieceLeft;
    }
    return result;
}

module.exports = checkDiagonal;