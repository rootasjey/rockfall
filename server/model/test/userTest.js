/** Fichier de test de User */
var Sequelize = require('sequelize');
var Config = require('../config.js');
var User = require('../User.js');

/** */
var userDB = new User();


var userParam = {
        pseudo:'john',
        password:'PasswordTest'
    };

var userParamFailed = {
        pseudo:'john',
        password:'Passdd<^%'
    };

userDB.initDB(Config.dialect, Config.test.user, Config.test.password, Config.test.address, Config.test.port, Config.test.name, function(){

    console.log('début de test!');

    /** test réussi */
    userDB.createModel(userParam, testCreateUser, errorTestThrow);

    /** test échoué */
     //userDB.createModel(userParam, testCreateUser, errorTestThrow);
});

/** fonction de callback si user create réussi */
function testCreateUser(user){

    if(userParam.pseudo != user.pseudo || userParam.password != user.password_hash){
        throw new Error("insert data corrup!");
    }else{
        console.log("-----------------------create user success!----------------");
        return;
    }
}

/** fonction de callback si user create fail*/
function errorTestThrow(e){

    console.log("-----------------------create user failed!----------------");
    console.log(e);
    return;
}
