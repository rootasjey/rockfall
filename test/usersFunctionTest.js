"use strict";

var assert = require('assert');
var plate = require('./_initialData');
var UsersFonction = require('../lib/usersFunction');

describe('---- user functions ----', function () {

    it('order users', function () {

        assert.equal(0, plate.Users.filter(user => user.order != 0).length);
        UsersFonction.pickOrderPlayerToPlay(plate.Users);
        assert.equal(3, plate.Users.filter(user => user.order != 0).length);

        assert.equal(1, plate.Users.filter(user => user.order == 1).length);
        assert.equal(1, plate.Users.filter(user => user.order == 2).length);
        assert.equal(1, plate.Users.filter(user => user.order == 3).length);

    });

    it('change users turn', function () {

        assert.equal(0, plate.Users.filter(user => user.turn != 0).length);
        UsersFonction.getNextUserToPlay(plate.Users);
        assert.equal(1, plate.Users.filter(user => user.turn != 0).length);
        assert.equal(2, plate.Users.filter(user => user.turn == 0).length);

        assert.equal(1, plate.Users.filter(user => user.turn != 0)[0].order);
        UsersFonction.getNextUserToPlay(plate.Users);
        assert.equal(2, plate.Users.filter(user => user.turn != 0)[0].order);
        assert.equal(1, plate.Users.filter(user => user.turn != 0).length);
        assert.equal(2, plate.Users.filter(user => user.turn == 0).length);

        UsersFonction.getNextUserToPlay(plate.Users);

        assert.equal(3, plate.Users.filter(user => user.turn != 0)[0].order);
        assert.equal(1, plate.Users.filter(user => user.turn != 0).length);
        assert.equal(2, plate.Users.filter(user => user.turn == 0).length);

        UsersFonction.getNextUserToPlay(plate.Users);

        assert.equal(1, plate.Users.filter(user => user.turn != 0)[0].order);
        assert.equal(1, plate.Users.filter(user => user.turn != 0).length);
        assert.equal(2, plate.Users.filter(user => user.turn == 0).length);

    });

});