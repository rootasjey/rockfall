"use strict";
/**
 * @param boardGame object with game information
 * @param nbForWinLine number horizontal piece align to win
 * @param piece piece to start to test a vertical win
 *
 * @return object with verification status
 *
 * function to test a vertical win start to a specific piece
 */
function checkVertical(boardGame, nbForWinLine, piece) {

    //verify input variable
    if (!boardGame.length) throw new Error("undefined boardGame!");
    if (!boardGame[0].length) throw new Error("undefined boardGame!");
    if (boardGame.length < nbForWinLine) throw new Error("boardGame too small to expect a win!");
    if (!piece.hasOwnProperty("x") || !piece.hasOwnProperty("y") || !piece.hasOwnProperty("user")) throw new Error("piece not valide!");

    let xStartPosition = piece.x;
    let yStartPosition = piece.y;
    let user = piece.user;
    let countPiece = 1;
    let arrayOfWinPiece = [piece];
    /** count to the bottom */
    for (let i = yStartPosition + 1; i < boardGame.length; i++) {
        let tamponPiece = boardGame[i][xStartPosition];
        if (tamponPiece != 0) {
            if (tamponPiece.user == user && tamponPiece.state == 0) {
                countPiece++;
                arrayOfWinPiece.push(tamponPiece);
            }else{
                break;
            }
        } else {
            break;
        }
    }

    /** count to the top */
    for (let i = yStartPosition - 1; i >= 0; i--) {
        let tamponPiece = boardGame[i][xStartPosition];
        if (tamponPiece != 0) {
            if (tamponPiece.user == user && tamponPiece.state == 0) {
                countPiece++;
                arrayOfWinPiece.push(tamponPiece);
            }else{
                break;
            }
        } else {
            break;
        }
    }
    let result = {
        "count": countPiece,
        "user": user,
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

module.exports = checkVertical;
