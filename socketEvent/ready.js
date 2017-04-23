/**
 * function to handle user to be ready for a party
 */
const Ready = function (users, readyObject) {
    this.users = users;
    this.readyObject = readyObject;
    // Expose handler methods for events
    this.handler = {
        "readyAccept": readyAccept.bind(this),
        "readyrefuse": readyRefuse.bind(this)
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

//Refuse to play
function readyRefuse(userId) {
    if(!this.readyObject.state)return;
    if(this.users.has(userId) && this.users.get(userId).getReady() == -1){
        this.users.get(userId).setReady(0);
    }
}

//Verify all player are ready
function allReady(){
    //return !this.users.some(state => state == 0 || state == -1); wrong
    return;
}

module.exports = Ready;