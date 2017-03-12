const http        = require('http');
const express     = require('express');
const bodyParser  = require('body-parser');
const app         = express();
const Queue = require("./socketEvent/queue");
const uuid = require('node-uuid');
const User = require('./lib/model/user');

const INTERVAL_CHECK_USER_PING = 3000; 

const waitingList = {
    users: new Map()
};

app.use(require('morgan')('short'));
app.use(bodyParser.json());
// app.use(express.static('dist')); // un-comment for production

require('./routes/hmr')(app); // HMR module - comment for production

app
.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})
.use('/auth/google/', require('./routes/google'))
.use('/auth/facebook/', require('./routes/facebook'))
.use('/auth/twitter/', require('./routes/twitter'))
.use('/auth/microsoft/', require('./routes/microsoft'))
.use('/users/', require('./routes/users'))

if (require.main === module) {
  var server = http.createServer(app);
  server.listen(process.env.PORT || 8080, () => {
    console.log('Listening on %j', server.address());

    io.sockets.on('connection', function (socket) {

      // Create event handlers for this socket
      var eventHandlers = {
        queue: new Queue(waitingList.users, socket),
      };

      // Bind events to handlers
      for (var category in eventHandlers) {
        var handler = eventHandlers[category].handler;
        for (var event in handler) {
          socket.on(event, handler[event]);
        }
      }

      // Keep track of the socket
      //socketApp.socketUser.push(socket);
    });
    
  });
}


function deletOutOfDateUser(users, interval){
    const TIMEOUT = new Date().getTime();
    let notification = false;
    users.forEach(function(value, key, users) {
        if(value.getTime() + interval > TIMEOUT){
            users.delete(key);
            notification = true;
        }
    });
    if(notification){
      let waitingList = getUserInfo(users);
      io.sockets.broadcast.emit("update_waiting_list", {"list":waitingList});
    }
}


function getUserInfo(users){
  let arrayInfo = [];
  users.forEach(function(value, key, users) {
      arrayInfo.push({"id":value.getId(), "name": value.getName()});
  });
    return arrayInfo;
}


