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
app.set('port', process.env.PORT || 3003);
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
        addressServer = server.address().address + ":" + app.get('port');
    } else{
        addressServer += ":" + app.get('port');
    }

    console.log('Rockfall is live on port :' + app.get('port'));
});

var Sequelize = require('sequelize');
var Config = require('./model/config.js');
var User = require('./model/user.js');
