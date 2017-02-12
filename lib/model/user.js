"use strict";

/**
 * class object model
 */
class User {

    constructor(id, name, order, turn, score, point, pieceAction, pieceActionPerTurn, weightPiece) {
        if (typeof id === 'undefined') throw new Error("create piece with an id!");

        this.id = id;
        this.name = name;
        this.order = order;
        this.turn = turn;
        this.score = score;
        this.point = point;
        this.pieceAction = pointAction;
        this.pieceActionPerTurn = pieceActionPerTurn;
        this.weightPiece = weightPiece;
    }

}

module.exports = User;
