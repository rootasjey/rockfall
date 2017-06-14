"use strict";

const uuid = require('node-uuid');

/**
 * class object model
 */
class Piece {

    constructor(x, y = 0, userId, state = 0, weight) {
        if (typeof x === 'undefined') throw new Error("create piece with x value!");
        if (typeof userId === 'undefined') throw new Error("create piece with weight value!");
        if (typeof weight === 'undefined') throw new Error("create piece with user value!");
        this.id = uuid.v4();
        this.x = x;
        this.y = y;
        this.userId = userId;
        this.state = state;
        this.weight = weight;
    }

    static isValid(pieceToValidate) {
        if (!pieceToValidate.hasOwnProperty("x") || !pieceToValidate.hasOwnProperty("y") || !pieceToValidate.hasOwnProperty("id") || !pieceToValidate.hasOwnProperty("userId") || !pieceToValidate.hasOwnProperty("weight") || !pieceToValidate.hasOwnProperty("state")) {
            throw new Error("not a valide piece!");
        }
    }

    /**
     * piece to check if status is neutral 
     * atm is state == 0
     */
    static isNeutralPiece(piece) {
        return piece.state == 0;
    }

}

module.exports = Piece;
