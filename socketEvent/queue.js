"use strict";


const uuid = require('node-uuid');
const User = require('../lib/model/user');

const Queue = function (users, socket, defaultUserParam) {
    this.users = users;
    this.socket = socket;
    this.defaultUserParam = defaultUserParam;
    // Expose handler methods for events
    this.handler = {
        "joinWithoutOath": joinWithoutOath.bind(this), // use the bind function to access this.app
        "pongUser": pong.bind(this)    // and this.socket in events
    }
}

// Events

//add anonymous player to the waiting list
function joinWithoutOath(username) {
    const userInfo = {
        "id":generateId(),
        "name":username
    }
    let anonymousUser = getUser(userInfo, this.defaultUserParam);
    anonymousUser.setSocket(this.socket);
    addUser(anonymousUser, this.users);
    anonymousUser.getSocket().emit('identifiant', userInfo);
    pong.call(this, anonymousUser.getId());
    anonymousUser.getSocket().broadcast.emit("add_waiting_list", {"user":userInfo});
}

//ping host to verify connection
function pong(userId) {
    if(!this.users.has(userId))return;
    this.users.get(userId).setTime(new Date().getTime());
}
//generate uid
function generateId(){
  return uuid.v4();
}
// return a user set with a username
function getUser(userInfo, defaultUserParam){
    let user = new User(userInfo);
    user.setPieceAction(defaultUserParam.pieceAction);
    user.setPieceActionPerTurn(defaultUserParam.pieceActionPerTurn);
    user.setWeightPiece(defaultUserParam.weightPiece);
    return user;
}
// add user to waiting list
function addUser(user, userMap){
    userMap.set(user.getId(), user);
}

module.exports = Queue;