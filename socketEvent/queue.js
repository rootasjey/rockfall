
const Queue = function (users, socket) {
    this.users = users;
    this.socket = socket;

    // Expose handler methods for events
    this.handler = {
        joinWithoutOath: joinWithoutOath.bind(this), // use the bind function to access this.app
        ping: ping.bind(this)    // and this.socket in events
    }
}

// Events

//add anonymous player to the waiting list
function joinWithoutOath(username) {
    const user = {
        "id":generateId(),
        "name":username
    }
    let anonymous = new User(user);
    anonymous.setSocket(this.socket);
    this.users.set(anonymous.getId(),anonymous);
    this.ping(anonymous.getId());
    anonymous.getSocket().emit('identifiant', user);
    anonymous.getSocket().broadcast.emit("add_waiting_list", {"user":user});
}

//ping host to verify connection
function ping(userId) {
    if(!this.users.has(userId))return;
    this.users.get(userId).setTime(new Date().getTime());
    this.users.get(userId).getSocket().emit('ping');
}

function generateId(){
  return uuid.v4();
}

module.exports = Queue;