"use strict";

var assert = require('assert');
var plate = require('./_initialData');
var UsersFunction = require('../lib/usersFunction');

describe('---- user functions ----', function () {

    it('order users', function () {

        assert.equal(0, plate.Users.filter(user => user.order != 0).length);
        UsersFunction.pickOrderToPlay(plate.Users);
        assert.equal(3, plate.Users.filter(user => user.order != 0).length);

        assert.equal(1, plate.Users.filter(user => user.order == 1).length);
        assert.equal(1, plate.Users.filter(user => user.order == 2).length);
        assert.equal(1, plate.Users.filter(user => user.order == 3).length);

    });

    it('change users turn', function () {

        assert.equal(0, plate.Users.filter(user => user.turn != 0).length);
        UsersFunction.getNextUserToPlay(plate.Users);
        assert.equal(1, plate.Users.filter(user => user.turn != 0).length);
        assert.equal(2, plate.Users.filter(user => user.turn == 0).length);

        assert.equal(1, plate.Users.filter(user => user.turn != 0)[0].order);
        UsersFunction.getNextUserToPlay(plate.Users);
        assert.equal(2, plate.Users.filter(user => user.turn != 0)[0].order);
        assert.equal(1, plate.Users.filter(user => user.turn != 0).length);
        assert.equal(2, plate.Users.filter(user => user.turn == 0).length);

        UsersFunction.getNextUserToPlay(plate.Users);

        assert.equal(3, plate.Users.filter(user => user.turn != 0)[0].order);
        assert.equal(1, plate.Users.filter(user => user.turn != 0).length);
        assert.equal(2, plate.Users.filter(user => user.turn == 0).length);

        UsersFunction.getNextUserToPlay(plate.Users);

        assert.equal(1, plate.Users.filter(user => user.turn != 0)[0].order);
        assert.equal(1, plate.Users.filter(user => user.turn != 0).length);
        assert.equal(2, plate.Users.filter(user => user.turn == 0).length);

    });

});