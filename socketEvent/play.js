
const addPieceScript = require("../lib/addPieceScript");
const Board = require("../lib/model/board");
const UsersFunction = require("../lib/UsersFunction");
const applyRule = require("../lib/ApplyRule");
/**
 * function to handle action to play
 */
const Play = function (gameRule, users, state) {
    
    this.gameRule = gameRule;
    this.boardGame =  Board.getBoardGame(gameRule.xSize, gameRule.ySize);
    this.users = users;
    this.state = state;
    this.indexPiece = [];
    // Expose handler methods for events
    this.handler = {
        "addPiece": addPiece.bind(this),
        "skipTurn": skipTurn.bind(this)
    }
}

// Events

//addPiece to board
function addPiece(userId, piece) {
    if(!this.state) return;
    let newPiece = new Piece(piece.x, 0, userId, 0, piece.weight);
    addPieceScript(this.boardGame, this.indexPiece, newPiece, this.users.get(userId));
    this.indexPiece = applyRule(this.boardGame, this.indexPiece, this.users, this.gameRule);
}

//skip player turn
function skipTurn(userId) {
    if(!this.state) return;
    if(!this.users.get(userId).turn) return; 
    UsersFunction.getNextUserToPlay(this.users, this.gameRule);
}

//initialise user array
function initializeUsers(users){
    UsersFunction.pickOrderToPlay(users);
    UsersFunction.getNextUserToPlay(users);
}

module.exports = Play;