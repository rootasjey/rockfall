"use strict";

/**
 * class object model
 */
class User {

   // constructor(id, name, order, turn, score, point, pieceAction, pieceActionPerTurn, weightPiece) {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        return this;
    }

    get getId(){
        return this.id;
    }

    get getName(){
        return this.name;
    }

    set setOrder(order){
        this.order = order;
        return this;
    }
 
    set setTurn(turn){
        this.turn = turn;
        return this;
    }
        
    set setScore(score){
        this.score = score;
        return this;
    }
        
    set setPoint(point){
        this.point = point;
        return this;
    }

    set setPointAction(pointAction){
        this.pieceAction = pointAction;
        return this;
    }
        
    set setPieceActionPerTurn(pieceActionPerTurn){
        this.pieceActionPerTurn = pieceActionPerTurn;
        return this;
    }

    set setWeightPiece(){
        this.weightPiece = user.weightPiece;
        return this;
    }   

    set setSocket(socket){
        this.socket = socket;
        return this;
    }

    get getSocket(){
        return this.socket;
    }

    set setTime(date){
        this.time = date;
        return this;
    }

    get getTime(){
        return this.time;
    }
}

module.exports = User;
