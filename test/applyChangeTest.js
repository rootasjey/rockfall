"use strict";

var assert = require('assert');
var plate = require('./_initialData');
var applyChange = require('../lib/applyChange');

describe('---- Check change ----', function() {

    it('check piece change, it should fall ', function() {

        let pieceToPlay = {
            "id":12,
            "x": 4,
            "y": 3,
            "userId": 1,
            "state": 1,
            "weight": 4
        };
        let users = new Map();
        users.set("1", { "id": 1, "name": "1", "order": 1, "turn": 0, "score": 0, "point": 0, "pieceAction": 0, "pieceActionPerTurn": 1, "weightPiece": [5, 10, 15] });
        users.set("2", { "id": 2, "name": "2", "order": 1, "turn": 0, "score": 0, "point": 0, "pieceAction": 0, "pieceActionPerTurn": 1, "weightPiece": [5, 10, 15] });
        let plateClone = JSON.parse(JSON.stringify(plate.Plate));
        assert.equal(plateClone[3][4].state, 1);
        applyChange(plateClone, [pieceToPlay], users);

        assert.equal(plateClone[4][4].id, 12);

    });

    it('check piece change, it should pass state 2 to 4 ', function() {
        let pieceToPlay = {
            "id":16,
            "x": 3,
            "y": 4,
            "userId": 2,
            "state": 2,
            "weight": 4
        };
        let users = new Map();
        users.set(1,{ "id": 1, "name": "1", "order": 1, "turn": 0, "score": 0, "point": 0, "pieceAction": 0, "pieceActionPerTurn": 1, "weightPiece": [5, 10, 15] });
        users.set(2,{ "id": 2, "name": "2", "order": 1, "turn": 0, "score": 0, "point": 0, "pieceAction": 0, "pieceActionPerTurn": 1, "weightPiece": [5, 10, 15] });
        let plateClone = JSON.parse(JSON.stringify(plate.Plate));
        plateClone[4][3] = pieceToPlay;
        applyChange(plateClone, [pieceToPlay], users);

        assert.equal(plateClone[4][3].state, 4);
        assert.equal(users.get(2).point, 4);

    });

    it('check piece change, it should pass state 3 to 4 ', function() {
        let pieceToPlay = {
            "id": 16,
            "x": 3,
            "y": 4,
            "userId": 2,
            "state": 3,
            "weight": 4
        };
        
        let users = new Map();
        users.set(1,{ "id": 1, "name": "1", "order": 1, "turn": 0, "score": 0, "point": 0, "pieceAction": 0, "pieceActionPerTurn": 1, "weightPiece": [5, 10, 15] });
        users.set(2,{ "id": 2, "name": "2", "order": 1, "turn": 0, "score": 0, "point": 0, "pieceAction": 0, "pieceActionPerTurn": 1, "weightPiece": [5, 10, 15] });
        let plateClone = JSON.parse(JSON.stringify(plate.Plate));
        plateClone[4][3] = pieceToPlay;
        applyChange(plateClone, [pieceToPlay], users);

        assert.equal(plateClone[4][3].state, 4);
        assert.equal(users.get(2).point, 4);

    });

    it('check piece change, it should disapear  ', function() {
        let pieceToPlay = {
            "id":16,
            "x": 3,
            "y": 4,
            "userId": 2,
            "state": 4,
            "weight": 4
        };
        
        let users= new Map();
        users.set(1,{ "id": 1, "name": "1", "order": 1, "turn": 0, "score": 0, "point": 0, "pieceAction": 0, "pieceActionPerTurn": 1, "weightPiece": [5, 10, 15] });
        users.set(2,{ "id": 2, "name": "2", "order": 1, "turn": 0, "score": 0, "point": 0, "pieceAction": 0, "pieceActionPerTurn": 1, "weightPiece": [5, 10, 15] });
        let plateClone = JSON.parse(JSON.stringify(plate.Plate));
        let indexPiece = [pieceToPlay , {"id":17, "x": 2, "y": 4, "userId": 2, "state": 0,"weight": 4}];
        plateClone[4][3] = pieceToPlay;
        assert.equal(plateClone[4][3].state, 4);
        assert.equal(indexPiece.length, 2);

        indexPiece = applyChange(plateClone, indexPiece, users);

        assert.equal(plateClone[4][3], 0);
        assert.equal(indexPiece.length, 1);
    });
});
