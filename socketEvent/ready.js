/**
 * function to handle user to be ready for a party
 */
const Ready = function (users, readyObject) {
    this.users = users;
    this.readyObject = readyObject;
    // Expose handler methods for events
    this.handler = {
        "readyAccept": readyAccept.bind(this),
        "readyrefuse": readyRefuse.bind(this),
        "pongReadyUser": pongReady.bind(this)
    }
}

// Events

//Accept to play
function readyAccept(userId) {
    if(!this.readyObject.state)return;
    if(this.users.has(userId) && this.users.get(userId).getReady() == -1){
        this.users.get(userId).setReady(1);
    }
}

//ping host to verify connection
function pongReady(userId) {
    if(!this.users.has(userId))return;
    this.users.get(userId).setTime(new Date().getTime());
}

//Refuse to play
function readyRefuse(userId) {
    if(!this.readyObject.state)return;
    if(this.users.has(userId) && this.users.get(userId).getReady() == -1){
        this.users.get(userId).setReady(0);
    }
}

module.exports = Ready;