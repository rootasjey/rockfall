var quickVisuPlate = [
  [1, 0, 0, 0, 0],
  [1, 1, 1, 1, 2],
  [1, 2, 0, 0, 0],
  [1, 2, 2, 0, 1],
  [1, 2, 2, 2, 0]
];

var Plate = [
  [{"id":1, "x":0, "y":0, "user":1, "state":0, "weight": 4}, 0, 0, 0, 0],
  [{"id":2, "x":0, "y":1, "user":1, "state":0, "weight": 4}, {"id":3, "x":1, "y":1, "user":1, "state":0, "weight": 4}, {"id":4, "x":2, "y":1, "user":1, "state":0, "weight": 4}, {"id":5, "x":3, "y":1, "user":1, "state":0, "weight": 4}, {"id":6, "x":4, "y":1, "user":2, "state":0, "weight": 4}],
  [{"id":7, "x":0, "y":2, "user":1, "state":0, "weight": 4}, {"id":8, "x":1, "y":2, "user":2, "state":0, "weight": 4}, 0, 0, 0],
  [{"id":9, "x":0, "y":3, "user":1, "state":0, "weight": 4}, {"id":10, "x":1, "y":3, "user":2, "state":0, "weight": 4}, {"id":11, "x":2, "y":3, "user":2, "state":0, "weight": 4}, 0, {"id":12, "x":4, "y":3, "user":1, "state":1, "weight": 4}],
  [{"id":13, "x":0, "y":4, "user":1, "state":0, "weight": 4}, {"id":14, "x":1, "y":4, "user":2, "state":0, "weight": 4}, {"id":15, "x":2, "y":4, "user":2, "state":0, "weight": 4}, {"id":16, "x":3, "y":4, "user":2, "state":0, "weight": 4}, 0]
];

var Users = [
  {"id":1, "name":1, "order":0, "turn":1, "score": 0, "point":0, "pieceAction":1, "pieceActionPerTurn":1, "weightPiece":[5, 10, 15]},
  {"id":2, "name":2, "order":0, "turn":1, "score": 0, "point":0, "pieceAction":0, "pieceActionPerTurn":1, "weightPiece":[2, 8, 20]},
  {"id":3, "name":3, "order":0, "turn":0, "score": 0, "point":0, "pieceAction":1, "pieceActionPerTurn":1, "weightPiece":[5, 10, 15]}
];

module.exports = {
  Plate:Plate,
  PlateVisu:quickVisuPlate,
  Users:Users
}
