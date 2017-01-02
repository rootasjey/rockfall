/** Fichier de test de User */
var Sequelize = require('sequelize');
var Config = require('../config.js');
var User = require('../User.js');

/** */
var userDB = new User();


var userParam = {
        pseudo:'john',
        email:'Passwor@dTest.com'
    };

var userParamFailed = {
        pseudo:'john',
        email:'Passdd<^%'
    };

userDB.initDB(Config.dialect, Config.test.user, Config.test.password, Config.test.address, Config.test.port, Config.test.name, function(){

    console.log('début de test!');

    /** test réussi */
    userDB.createModel(userParam, testCreateUser, errorTestThrow);

    /** test échoué */
     userDB.createModel(userParamFailed, errorTestThrow, testCreateUserFail);
});

/** fonction de callback si user create réussi */
function testCreateUser(user){

    if(userParam.pseudo != user.pseudo || userParam.email != user.email){
        throw new Error("insert data corrup!");
    }else{
        console.log("-----------------------create user success!----------------");
        return;
    }
}

/** fonction de callback si user create réussi */
function testCreateUserFail(user){

    if(userParam.pseudo == user.pseudo || userParam.email == user.email){
        throw new Error("insert data corrup!");
    }else{
        console.log("-----------------------create user failed success!----------------");
        return;
    }
}

/** fonction de callback si user create fail*/
function errorTestThrow(e){

    console.log("-----------------------create user failed!----------------");
    console.log(e);
    return;
}
