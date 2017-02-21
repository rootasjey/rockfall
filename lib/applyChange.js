"use strict";

var Board = require("./model/board");

/**
 * @param boardGame object with game information
 * @param indexPiece index of current game piece
 * @param users user array to add point if necessary
 * 
 * function to apply change to index piece
 */
function applyChange(boardGame, indexPiece, users) {

    //verify input variable
    Board.isValid(boardGame);

    let indexPieceTampon = Object.assign([], indexPiece);

    for (let i = 0, indexLength = indexPiece.length; i < indexLength; i++) {
        let piece = indexPiece[i];
        let x = piece.x;
        let y = piece.y;

        switch (piece.state) {
            case 1:
                boardGame[y + 1][x] = boardGame[y][x];
                boardGame[y + 1][x].y++;
                boardGame[y][x] = 0;
                piece.state = 0;
                break;

            case 2:
                let userPointCase2 = users.find(user => user.id === boardGame[y][x].user);
                userPointCase2.point += boardGame[y][x].weight;
                piece.state = 4;
                break;

            case 3:
                let userPointCase3 = users.find(user => user.id === boardGame[y][x].user);
                userPointCase3.point += boardGame[y][x].weight;
                piece.state = 4;
                break;

            case 4:
                boardGame[y][x] = 0;
                indexPieceTampon = indexPieceTampon.filter(item => item.id != piece.id);
                break;

            default:
                break;
        }
    }
    return indexPieceTampon;
}

module.exports = applyChange;