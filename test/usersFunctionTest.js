"use strict";

var assert = require('assert');
var plate = require('./_initialData');
var UsersFunction = require('../lib/usersFunction');

describe('---- user functions ----', function () {

    it('order users', function () {

        let usersSample = [];
        plate.Users.forEach((user)=>{if(user.order != 0){usersSample.push(user)}});
        assert.equal(0, usersSample.length);
        usersSample = [];
        UsersFunction.pickOrderToPlay(plate.Users);
        plate.Users.forEach((user)=>{if(user.order != 0){usersSample.push(user)}});
        assert.equal(3, usersSample.length);
        usersSample = [];
        plate.Users.forEach((user)=>{if(user.order == 1){usersSample.push(user)}});
        assert.equal(1, usersSample.length);
        usersSample = [];
        plate.Users.forEach((user)=>{if(user.order == 2){usersSample.push(user)}});
        assert.equal(1, usersSample.length);
        usersSample = [];
        plate.Users.forEach((user)=>{if(user.order == 3){usersSample.push(user)}});
        assert.equal(1, usersSample.length);
        usersSample = [];

    });

    it('change users turn', function () {

        let usersSample = [];
        plate.Users.forEach((user)=>{if(user.turn != 0){usersSample.push(user)}});
        assert.equal(0, usersSample.length);
        usersSample = [];
        UsersFunction.getNextUserToPlay(plate.Users);

        plate.Users.forEach((user)=>{if(user.turn != 0){usersSample.push(user)}});
        assert.equal(1, usersSample.length);
        usersSample = [];
        plate.Users.forEach((user)=>{if(user.turn == 0){usersSample.push(user)}});
        assert.equal(2, usersSample.length);
        usersSample = [];

        plate.Users.forEach((user)=>{if(user.turn != 0){usersSample.push(user)}});
        assert.equal(1, usersSample.length);
        assert.equal(1, usersSample[0].order);
        usersSample = [];
        
        UsersFunction.getNextUserToPlay(plate.Users);
        
        plate.Users.forEach((user)=>{if(user.turn != 0){usersSample.push(user)}});
        assert.equal(1, usersSample.length);
        assert.equal(2, usersSample[0].order);
        usersSample = [];
        plate.Users.forEach((user)=>{if(user.turn == 0){usersSample.push(user)}});
        assert.equal(2, usersSample.length);
        usersSample = [];

        UsersFunction.getNextUserToPlay(plate.Users);

        plate.Users.forEach((user)=>{if(user.turn != 0){usersSample.push(user)}});
        assert.equal(1, usersSample.length);
        assert.equal(3, usersSample[0].order);
        usersSample = [];
        plate.Users.forEach((user)=>{if(user.turn == 0){usersSample.push(user)}});
        assert.equal(2, usersSample.length);
        usersSample = [];

        UsersFunction.getNextUserToPlay(plate.Users);

        plate.Users.forEach((user)=>{if(user.turn != 0){usersSample.push(user)}});
        assert.equal(1, usersSample.length);
        assert.equal(1, usersSample[0].order);
        usersSample = [];
        plate.Users.forEach((user)=>{if(user.turn == 0){usersSample.push(user)}});
        assert.equal(2, usersSample.length);
    });

});