var Sequelize = require('sequelize');
var Config = require('./model/config.js');
var User = require('./model/User.js');


class BD{


    constructor(){

        this.userDB = new User();

        this.dialect = Config.dialect;
        this.user = Config.developpement.user;
        this.password = Config.developpement.password;
        this.address = Config.developpement.address;
        this.port = Config.developpement.port;
        this.name = Config.developpement.name;

        this.ready = false;
    }


    initialisation(){

        this.userDB.initDB(this.dialect, this.user, this.password, this.address, this.port, this.name, (function(){ this.ready = true;}).bind(this));

        return;
    }

    getReady(){
        if(this.ready == false){
            console.log("L'initialisation de la base de données n'est pas terminé !");
        }
        return;
    }
}

module.exports = new BD();
