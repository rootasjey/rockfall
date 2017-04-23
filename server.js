const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Queue = require("./socketEvent/queue");
const Ready = require("./socketEvent/ready");
const Play = require("./socketEvent/play");
const User = require('./lib/model/user');
const INTERVAL_CHECK_USER_PING = 7000;

let waitingList = {
    users: new Map(),
    state: true
};

let readyList = {
    users: new Map(),
    state: false
};

let partyList = {
    users: new Map(),
    state: false
};

const gameRule = {
    //number of align piece to win
    "nbForWinLine": 4,
    "numberUsersToPlay": 3,
    "defaultUserParam": {
        "pieceAction": 1,
        "pieceActionPerTurn": 1,
        "weightPiece": [5, 10, 15]
    }
};


app.use(require('morgan')('short'));
app.use(bodyParser.json());
// app.use(express.static('dist')); // un-comment for production

require('./routes/hmr')(app); // HMR module - comment for production

app
    .get('/', (req, res) => {
        res.sendFile(__dirname + '/index1.html');
    })
    .use('/auth/google/', require('./routes/google'))
    .use('/auth/facebook/', require('./routes/facebook'))
    .use('/auth/twitter/', require('./routes/twitter'))
    .use('/auth/microsoft/', require('./routes/microsoft'))
    .use('/users/', require('./routes/users'))

if (require.main === module) {
    var server = http.createServer(app);
var io = require('socket.io')(server);
    server.listen(process.env.PORT || 8080, () => {
        console.log('Listening on %j', server.address());
        io.sockets.on('connection', function (socket) {
            // Create event handlers for this socket
            var eventHandlers = {
                queue: new Queue(waitingList.users, socket, gameRule.defaultUserParam),
                ready: new Ready(readyList.users, readyList)
                //play: new Play(gameRule, partyList.users, partyList.state)
            };

            // Bind events to handlers
            for (var category in eventHandlers) {
                var handler = eventHandlers[category].handler;
                for (var event in handler) {
                    socket.on(event, handler[event]);
                }
            }
        });

    });
    
}

//
function deletOutOfDateUser(users, interval) {
    const TIMEOUT = new Date().getTime();
    let notification = false;
    users.forEach(function (value, key, users) {
        if (value.getTime() + interval < TIMEOUT) {
            users.delete(key);
            notification = true;
        }
    });
    if (notification) {
        let waitingList = getUserInfo(users);
        io.emit("update_waiting_list", {
            "list": waitingList
        });
    }
}

//
function getUserInfo(users) {
    let arrayInfo = [];
    users.forEach(function (value, key, users) {
        arrayInfo.push({
            "id": value.getId(),
            "name": value.getName()
        });
    });
    return arrayInfo;
}
//add from waiting list to ready list
function switchWaitingToReady(waitingLocalList, readyLocalList) {
    usersInWaitingList = waitingLocalList.users;
    console.log("waiting user size :",usersInWaitingList.size);
    if (usersInWaitingList.size > 0) {
        let firstKey = [...usersInWaitingList.keys()][0];
        readyLocalList.users.set(firstKey, usersInWaitingList.get(firstKey));
        waitingLocalList.users.delete(firstKey);
    }
    console.log("ready user size :",readyLocalList.users.size);
    return;
}
//add from waiting list to ready list
function addToReadyList(waitingLocalList, readyLocalList, partyLocalList, gameRule) {
    if(!waitingLocalList.state){
        return;
    }
    if (readyLocalList.users.size < gameRule.numberUsersToPlay) {
        switchWaitingToReady(waitingLocalList, readyLocalList);
        return;
    }
    //clearInterval(_pickAnUserInterval);
    waitingLocalList.state = false;
    initReadyRequest(readyLocalList);
    setTimeout(() => {verifyReadyState(waitingLocalList, readyLocalList, partyLocalList, gameRule);}, 15000);
    return;
}

//a player cancel a ready request purge ready list
function cancelReadyState(waitingUsers, readyUsers) {
    readyUsers.forEach(function (value, key, users) {
        waitingUsers.set(key, value);
        readyUsers.delete(key);
    });
    return;
}

//verify if all user are ready
function verifyReadyState(waitingLocalList, readyLocalList, partyLocalList, gameRule) {
    let allReady = true;
    let usersInReadyList = readyLocalList.users;
    for (let idUser of [...usersInReadyList.keys()]) {
        let user = usersInReadyList.get(idUser);
        if (!(user.getReady() > 0)) {
            allReady = false;
            break;
        }
    }
    if (!allReady) {
        //cancelReadyState(waitingUsers, readyUsers);
        for (let idReady of [...usersInReadyList.keys()]) {
            waitingLocalList.users.set(idReady, usersInReadyList.get(idReady));
            readyLocalList.users.delete(idReady);
        }
        //readyList.users = new Map();
        readyLocalList.state = false;
        waitingLocalList.state = true;
        //waitingList;
        //readyList;
        //_pickAnUserInterval = setInterval(addToReadyList, 1000, waitingUsers, readyUsers, partyUsers, gameRule);
        return;
    }
    //readyToParty(readyUsers, partyUsers);
}

//function to start when all condition matches
function readyToParty(readyUsers, partyUsers) {
    readyUsers.forEach(function (user, key, users) {
        partyUsers.set(key, user);
        readyUsers.delete(key);
    });
    partyList.state = true;
    return;
}

//initialize ready request
function initReadyRequest(readyLocalList) {
    readyLocalList.users.forEach(user => user.setReady(-1));
    readyLocalList.users.forEach(user => user.getSocket().emit("AreYouReady"));
    readyLocalList.state = true;
    return;
}
//start interval

//set interval to delete out date user in waiting list
const deletOutOfDateUserInterval = setInterval(deletOutOfDateUser, 1000, waitingList.users, INTERVAL_CHECK_USER_PING);


// pick randomly an user in waiting list to fill ready list
let _pickAnUserInterval = setInterval(() => {addToReadyList(waitingList, readyList, partyList, gameRule);}, 1000);

setInterval(console.log, 5000, "WAITING : ", waitingList.users.size, " & STATE : ", waitingList.state);
setInterval(console.log, 5000, "READY : ", readyList.users.size, " & STATE : ", readyList.state);
setInterval(console.log, 5000, "PARTY : ", partyList.users.size, " & STATE : ", partyList.state);