
/**
 * class object model
 */
class Board {

    constructor() {}

    static getBoardGame(sizeX, sizeY){
        if(sizeX <= 0) throw new Error("size X must be greater than 0");
        if(sizeY <= 0) throw new Error("size Y must be greater than 0"); 
        return Array(sizeY).fill(Array(sizeX).fill(0));
    } 


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
    static canVerticalWin (boardToValidate, nbAlignPieceToWin) {
      if (boardToValidate.length < nbAlignPieceToWin) throw new Error("boardGame too small to expect a win!");
    }

    /**
     * function to check board ...
    */
    static canHorizontalWin (boardToValidate, nbAlignPieceToWin) {
       if (boardToValidate[0].length < nbAlignPieceToWin) throw new Error("boardGame too small to expect a win!");
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
