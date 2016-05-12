"use strict";

var Sequelize = require('sequelize');
var Model = require('./Model.js');
var userDefinition = require('./definition/userDef.js');

var validation = {
                    pseudoPassword: function() {
                        if ((this.pseudo === null) || (this.password === null)) {
                            throw new Error('Require pseudo, password field!')
                        }
                    }
                 };

module.exports = class User extends Model{

    constructor(){
        super('user', userDefinition, validation);
    }
}
