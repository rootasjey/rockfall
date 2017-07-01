"use strict";

/**
 * class object model
 */
class User {

    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.order = 0;
        this.score = 0;
        this.point = 0;
        return this;
    }

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    setOrder(order){
        this.order = order;
        return this;
    }
 
    getOrder(){
        return this.order;
    }

    setTurn(turn){
        this.turn = turn;
        return this;
    }
        
    getTurn(){
        return this.turn;
    }

    setScore(score){
        this.score = score;
        return this;
    }
        
    getScore(){
        return this.score;
    }

    setPoint(point){
        this.point = point;
        return this;
    }

    getPoint(){
        return this.point;
    }

    setPieceAction(pieceAction){
        this.pieceAction = pieceAction;
        return this;
    }
        
    getPieceAction(){
        return this.pieceAction
    }

    setPieceActionPerTurn(pieceActionPerTurn){
        this.pieceActionPerTurn = pieceActionPerTurn;
        return this;
    }

    pieceActionPerTurn(){
        return this.pieceActionPerTurn;
    }

    setWeightPiece(weightPiece){
        this.weightPiece = weightPiece;
        return this;
    }   

    getWeightPiece(){
        return this.weightPiece;
    }   

    setSocket(socket){
        this.socket = socket;
        return this;
    }

    getSocket(){
        return this.socket;
    }

    setTime(date){
        this.time = date;
        return this;
    }

    getTime(){
        return this.time;
    }

    setReady(ready){
        this.ready = ready;
        return this;
    }

    getReady(){
        return this.ready;
    }
}

module.exports = User;
