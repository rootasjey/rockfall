const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Queue = require("./socketEvent/queue");
const Ready = require("./socketEvent/ready");
const Play = require("./socketEvent/play");
const User = require('./lib/model/user');
const INTERVAL_CHECK_USER_PING = 7000;

var waitingList = {
    users: new Map(),
    state: true
};

var readyList = {
    users: new Map(),
    state: false
};

var partyList = {
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

//delete out date user
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
    if (waitingLocalList.users.size > 0 && waitingLocalList.state) {
        let firstKey = [...waitingLocalList.users.keys()][0];
        readyLocalList.users.set(firstKey,waitingLocalList.users.get(firstKey));
        waitingLocalList.users.delete(firstKey);
    }
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
    waitingLocalList.state = false;
    initReadyRequest(readyLocalList);
    setTimeout(() => {verifyReadyState(waitingLocalList, readyLocalList);},15000);
    
    return;
}

//verify if all user are ready
function verifyReadyState(waitingLocalList, readyLocalList) {
    let allReady = true;
    for (let idUser of [...readyLocalList.users.keys()]) {
        let user = readyLocalList.users.get(idUser);
        if (!(user.getReady() > 0)) {
            allReady = false;
            break;
        }
    }
    if (!allReady && readyLocalList.state) {
        for (let idReady of [...readyLocalList.users.keys()]) {
            waitingLocalList.users.set(idReady, readyLocalList.users.get(idReady));
        }
        readyLocalList.users.clear();
        readyLocalList.state = false;
        waitingLocalList.state = true;
    }
    return;
}

//initialize ready request
function initReadyRequest(readyLocalList) {
    readyLocalList.users.forEach(user => user.setReady(-1));
    readyLocalList.users.forEach(user => user.getSocket().emit("AreYouReady"));
    readyLocalList.state = true;
    return;
}
//set interval to delete out date user in waiting list
const deletOutOfDateUserInterval = setInterval(deletOutOfDateUser, 1000, waitingList.users, INTERVAL_CHECK_USER_PING);

// pick randomly an user in waiting list to fill ready list
var _pickAnUserInterval = setInterval(()=>{addToReadyList(waitingList, readyList, partyList, gameRule);}, 5000);
