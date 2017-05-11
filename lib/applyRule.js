"use strict";

var applyPhysic = require('./applyPhysic');
var applyChange = require('./applyChange');
var applyWeight = require('./applyWeight');
var checkHorizontal = require('./checkHorizontal');
var checkVertical = require('./checkVertical');
var checkDiagonal = require('./checkDiagonal');

/**
* game rule is scheduling by this function
* first apply physic until all piece are not moving then
* apply weight on piece to delete all deny piece if a deleted piece is met then redo old instruction
* apply verification on marked piece
*
*/

function applyRule(boardGame, indexPiece, users, gameRules) {

    let triggeredPhysic = false,
        triggeredWeight = false,
        triggeredHorizontalCheck = false,
        triggeredVerticalCheck = false,
        triggeredDiagonalCheck = false,
        triggeredAllPieceDestroy = false,
        canIPass = false;

    do {
        //order list of piece to start bottom to top
        indexPiece = indexPiece.sort((pieceA, pieceB) => pieceB.y - pieceA.y);

        //apply physic to all piece and mark moving piece
        indexPiece.map(piece => applyPhysic(boardGame, piece));
        triggeredPhysic = indexPiece.reduce((mergedValue, piece) => piece.state == 1 ? (mergedValue || true) : (mergedValue || false), false);

        if (!triggeredPhysic) {
            indexPiece.map(piece => applyWeight(boardGame, piece));
            triggeredWeight = indexPiece.reduce((mergedValue, piece) => piece.state == 2 ? (mergedValue || true) : (mergedValue || false), false);
        }

        //foreach marked piece check horizontal/vertical/diagonal
        if (!triggeredPhysic && !triggeredWeight) {
            let indiceArray = 0, indexPieceLength = indexPiece.length;
            triggeredHorizontalCheck = false;
            while (!triggeredHorizontalCheck && indiceArray < indexPieceLength) {
                triggeredHorizontalCheck = checkHorizontal(boardGame, gameRules.nbAlignPieceToWin, indexPiece[indiceArray]).win;
                indiceArray++;
            }
            if (!triggeredHorizontalCheck) {
                indiceArray = 0;
                triggeredVerticalCheck = false;
                while (!triggeredVerticalCheck && indiceArray < indexPieceLength) {
                    triggeredVerticalCheck = checkVertical(boardGame, gameRules.nbAlignPieceToWin, indexPiece[indiceArray]).win;
                    indiceArray++;
                }
            }
            if (!triggeredHorizontalCheck && !triggeredVerticalCheck) {
                indiceArray = 0;
                triggeredDiagonalCheck = false;
                while (!triggeredDiagonalCheck && indiceArray < indexPieceLength) {
                    triggeredDiagonalCheck = checkDiagonal(boardGame, gameRules.nbAlignPieceToWin, indexPiece[indiceArray]).win;
                    indiceArray++;
                }
            }
        }
        // check if all piece have been apply
        triggeredAllPieceDestroy = indexPiece.reduce((mergedValue, piece) => piece.state == 4 ? (mergedValue || true) : (mergedValue || false), false);
        if (triggeredPhysic || triggeredWeight || triggeredHorizontalCheck || triggeredVerticalCheck || triggeredDiagonalCheck || triggeredAllPieceDestroy) {
            indexPiece = applyChange(boardGame, indexPiece, users);
        } else {
            canIPass = true
        }

    } while (!canIPass);

    return indexPiece;
}

module.exports = applyRule;