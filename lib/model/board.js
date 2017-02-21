
/**
 * class object model
 */
class Board {

    constructor() {}

    /**
     * function to check board validation
    */
    static isValid(boardToValidate) {
       if (!boardToValidate.length) throw new Error("undefined boardGame!");
       if (!boardToValidate[0].length) throw new Error("undefined boardGame!");
    }
    

     /**
     * function to check board ...
    */
    static canVerticalWin (boardToValidate, nbForWinLine) {
      if (boardToValidate.length < nbForWinLine) throw new Error("boardGame too small to expect a win!");
    }

    /**
     * function to check board ...
    */
    static canHorizontalWin (boardToValidate, nbForWinLine) {
       if (boardToValidate[0].length < nbForWinLine) throw new Error("boardGame too small to expect a win!");
    }

    /**
    * function to check is a case in board is empty
    * 
    */
    static isEmptyCase(boardGame, x, y){
      return boardGame[y][x] == 0;
   } 
}

module.exports = Board;
