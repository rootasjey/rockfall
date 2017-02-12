"use strict";

/**
 * class object model
 */
class Piece {

    constructor(x, y = 0, user, state = 0, weight) {
        if (typeof x === 'undefined') throw new Error("create piece with x value!");
        if (typeof user === 'undefined') throw new Error("create piece with weight value!");
        if (typeof weight === 'undefined') throw new Error("create piece with user value!");
        this.x = x;
        this.y = y;
        this.user = user;
        this.sate = state;
        this.weight = weight;
    }

    static pieceValidation(pieceToValidate) {
        if (!pieceToValidate.hasOwnProperty("x") || !pieceToValidate.hasOwnProperty("y") || !pieceToValidate.hasOwnProperty("id") || !pieceToValidate.hasOwnProperty("user") || !pieceToValidate.hasOwnProperty("weight") || !pieceToValidate.hasOwnProperty("state")) {
            throw new Error("not a valide piece!");
        }
    }

}

module.exports = Piece;
