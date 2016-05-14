App representation state
========================

TODO:
* save the whole board each time or only what changed?
* board as object/array?

## Initial state
```
{
  plays: [0],
  playsById: {
    0: {            // <-- Initial board state
      id: 0,
      board: ['0000','0000','0000','0000'],
      board: {
        3: '0000',
        2: '0000',
        1: '0000',
        0: '0000'
      },
    }
  },
  playersById: {},
  user: false,       // <-- False if not logged in, else its an object
  viewsOpenned: []
}
```

## Sample states

The game has started and is at its 2nd turn.

The board's size is 4x4 and there are 2 players in this party.

```
{
  plays: [0, 1],    // <-- Chronological board states after each player's move
  playsById: {      // <-- Player's move by ID
    0: {
      id: 0,
      board: [[0000][0000][0000][0000]]
    }
    1: {            // <-- Player's move ID
      id: 1,
      board: [[0000][0000][0000][1000]], // <-- Board state
      player: 1,                         // <-- Who played?
      rockWeight: 10
    }
  },
  playersById: {
    1: {
      id: 1,          // <-- Session player's ID
      name: 'Mario',  // <-- Player's name
      score: 234      // <-- Player's game score
    },
    2: {
      id: 2,          // <-- Session player's ID
      name: 'Luidgi', // <-- Player's name
      score: 356      // <-- Player's game score
    }
  },
  user: false,
  viewsOpenned: ['PLAY']
}
```

A powerup use-case (simplified)
```
{
  plays: [0, 1, 2, 3],
  playsById: {
    0: {
      id: 0,
      board: [[0000][0000][0000][0000]]
    }
    1: {
      id: 1,
      board: [[0000][00x0][00x0][xxxx]],
      player: 1,
      powerup: { id: 23, target: 'all' } // <-- Apply effect on the whole board
    },
    2: {
      id: 2,
      board: [[0000][00x0][00x2][xxxx]],
      player: 2,
      rockWeight: 5
    },
    3: {
      id: 3,
      board: [[0000][00x0][00x2][xxxx]],
      player: 1,
      powerup: { id: 2, target: [4,3] }  // <-- Apply effect on the target
    }
  },
  playersById: {
    1: { ... },
    2: { ... }
  },
  user: false,
  viewsOpenned: ['PLAY']
}
```
