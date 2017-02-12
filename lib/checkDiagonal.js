"use strict";
/**
 * @param boardGame object with game information
 * @param nbForWinLine number horizontal piece align to win
 * @param piece piece to start to test a diagonal win
 *
 * @return object with verification status
 *
 * function to test a diagonal win start to a specific piece
 */
function checkDiagonal(boardGame, nbForWinLine, piece) {

    //verify input variable
    if (!boardGame.length) throw new Error("undefined boardGame!");
    if (!boardGame[0].length) throw new Error("undefined boardGame!");
    if (boardGame[0].length < nbForWinLine) throw new Error("boardGame too small to expect a win!");
    if (boardGame.length < nbForWinLine) throw new Error("boardGame too small to expect a win!");
    if (!piece.hasOwnProperty("x") || !piece.hasOwnProperty("y") || !piece.hasOwnProperty("user")) throw new Error("piece not valide!");

    let xStartPosition = piece.x;
    let yStartPosition = piece.y;
    let user = piece.user;
    let countPieceTopRight = 1;
    let countPieceTopLeft = 1;
    let arrayOfWinPieceRight = [piece];
    let arrayOfWinPieceLeft = [piece];

    /** count to the top-right and bottom right */
    let indiceTopRight = 1;
    let indiceBottomRight = 1;
    //update vertical position because of diagonal
    let verticalAjust = 1;
    let stopCountTopRight = false,
        stopCountTopLeft = false;
    //to the right
    for (let i = xStartPosition + 1, boardLength = boardGame[0].length; i < boardLength; i++) {


        if (yStartPosition - verticalAjust >= 0 && !stopCountTopRight) {
            let tamponPieceTopRight = boardGame[yStartPosition - verticalAjust][i];
            if (tamponPieceTopRight != 0) {
                if (tamponPieceTopRight.user == user && tamponPieceTopRight.state == 0) {
                    countPieceTopRight++;
                    arrayOfWinPieceRight.push(tamponPieceTopRight);
                }
            } else {
                stopCountTopRight = true;
            }
        }
        if (yStartPosition + verticalAjust < boardGame.length && !stopCountTopLeft) {
            let tamponPieceBottomRight = boardGame[yStartPosition + verticalAjust][i];
            if (tamponPieceBottomRight != 0) {
                if (tamponPieceBottomRight.user == user && tamponPieceBottomRight.state == 0) {
                    countPieceTopLeft++;
                    arrayOfWinPieceLeft.push(tamponPieceBottomRight);
                }
            } else {
                stopCountTopLeft = true;
            }
        }
        verticalAjust++;
    }
    //to the left
    verticalAjust = 1;
    stopCountTopRight = false;
    stopCountTopLeft = false;
    for (let i = xStartPosition - 1; i >= 0; i--) {
        if (yStartPosition - verticalAjust >= 0) {
            let tamponPieceTopLeft = boardGame[yStartPosition - verticalAjust][i];
            if (tamponPieceTopLeft != 0) {
                if (tamponPieceTopLeft.user == user && tamponPieceTopLeft.state == 0) {
                    countPieceTopLeft++;
                    arrayOfWinPieceLeft.push(tamponPieceTopLeft);
                }
            } else {
                stopCountTopLeft = true;
            }
        }
        if (yStartPosition + verticalAjust < boardGame.length) {
            let tamponPieceBottomLeft = boardGame[yStartPosition + verticalAjust][i];
            if (tamponPieceBottomLeft != 0) {
                if (tamponPieceBottomLeft.user == user && tamponPieceBottomLeft.state == 0) {
                    countPieceTopRight++;
                    arrayOfWinPieceRight.push(tamponPieceBottomLeft);
                }
            } else {
                stopCountTopRight = true;
            }
        }
        verticalAjust++;
    }

    let result = {
        "countPiece": 0,
        "user": user,
        "win": false,
        "winPiece": []
    };
    if (countPieceTopRight >= nbForWinLine) {
        result.win = true;
        result.countPiece = countPieceTopRight;
        arrayOfWinPieceRight.forEach(function(piece) {piece.state = 3});
        result.winPiece = arrayOfWinPieceRight;
    }
    if (countPieceTopLeft >= nbForWinLine && countPieceTopRight < countPieceTopLeft) {
        result.win = true;
        result.countPiece = countPieceTopLeft;
        arrayOfWinPieceLeft.forEach(function(piece){piece.state = 3})
        result.winPiece = arrayOfWinPieceLeft;
    }
    return result;
}

module.exports = checkDiagonal;
