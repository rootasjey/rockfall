
const addPieceScript = require("../lib/addPieceScript");
const Board = require("../lib/model/board");
const UsersFunction = require("../lib/UsersFunction");
const applyRule = require("../lib/ApplyRule");
const Piece = require('../lib/model/piece');


/**
 * function to handle action to play
 */
const Play = function (gameRule, users, partyListObject, boardGame) {
    
    this.gameRule = gameRule;
    this.boardGame =  boardGame;//Board.getBoardGame(gameRule.xSize, gameRule.ySize);
    this.users = users;
    this.partyListObject = partyListObject;
    this.indexPiece = [];
    // Expose handler methods for events
    this.handler = {
        "addPiece": addPiece.bind(this),
        "skipTurn": skipTurn.bind(this),
        "pongPlayUser": pongPlay.bind(this)
    }
}

// Events

//addPiece to board
function addPiece(userId, piece) {
    console.log(this.boardGame);
    console.log(piece);
    if(!this.partyListObject.state || !this.users.has(userId)) return;
    let newPiece = new Piece(+piece.x, 0, userId, 0, +piece.weight);
    addPieceScript(this.boardGame, this.indexPiece, newPiece, this.users.get(userId));
    console.log("JUST AFTER");
    this.indexPiece = applyRule(this.boardGame, this.indexPiece, this.users, this.gameRule);
    console.log("END");
}

//ping host to verify connection
function pongPlay(userId) {
    if(!this.users.has(userId))return;
    this.users.get(userId).setTime(new Date().getTime());
}

//skip player turn
function skipTurn(userId) {
    if(!this.partyListObject.state) return;
    if(!this.users.get(userId).turn) return; 
    UsersFunction.getNextUserToPlay(this.users, this.gameRule);
}

module.exports = Play;