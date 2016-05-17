// --------------------
// SERVER.JS (ROCKFALL)
// --------------------
var express 		= require('express'),	// web dev framework
    morgan 			= require('morgan'),	// loggin middleware
    http 			= require('http'),
    path 			= require('path'),
    fs 				= require('fs') 		// file stream
    bodyParser 		= require('body-parser')
    methodOverride 	= require('method-override');
    // Matchmaker = require('matchmaker');

// ----------------
// APP - CREATION
// ----------------
var app = express();
// ----------------
app.set('port', process.env.PORT || 3001);
app.set('view engine', 'pug');
app.set('views', __dirname + '/../client');	// folder templates
app.use(morgan('dev'));					// logging output
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(methodOverride());
// static folder containing css, img & others contents
app.use(express.static(__dirname + '/../client'));

// Variable spécifiant le chemin relatif du serveur
var addressServer = "localhost";

// --------
// ROUTING
// --------
var userRoute = require('./routes/user');

app.get('/', function(req, res) {
    if (addressServer.indexOf("::") != -1) {
        // Variable redéfinissant le chemin relatif du serveur sous io.js
        // var fullUrl = req.protocol + "://" + req.get('host') + req.originalUrl;
        addressServer = req.get('host');
    }

       res.render('index');
    //res.status(200).send("success!");
})

var db = require('./db.js');
//var db_ready = false;
//console.log("1 : "+db_ready);
db.initialisation();
//console.log("3 : "+db_ready);
app.post('/createUser', function(req, res) {

    //console.log(JSON.stringify(req.body));
    var user = {
        email : req.body['email'],
        pseudo: req.body['pseudo']
    };

    db.getReady();
    db.userDB.createModel(user, console.log, console.log);
    //console.log('req.body.name', req.body['name']);
});
/*
setTimeout( function(){
    console.log("4 : "+db_ready);
} ,2000);*/
/*
.use('/user', userRoute)

.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})*/;

// Development error handler
// Will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        console.log(err.stack);
        res.status(err.status || 500);
        res.status('error in development').json( {
            message: err.stack,
            error: err
        });
    });
}

// Production error handler
// No stacktrace leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json('error in production', {
        message: err.message,
        error: {}
    });
});

// Listen port => server start
var server = http.createServer(app).listen(app.get('port'), function() {
    if(server.address().address != '0.0.0.0') {
        addressServer = server.address().address + ':' + app.get('port');
    } else{
        addressServer += ":" + app.get('port');
    }

    console.log('Rockfall is live on ' + addressServer + ':' + app.get('port'));
});

