import { WINNER_COMBOS } from "../constants";
export const checkWinner = (boardToCheck) => {

    for(let combo of WINNER_COMBOS){

      const [a, b, c] = combo

      if(boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[b] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    return false;
}

export const checkEndGame = (newBoard) => {

    return newBoard.eval((square) => square !== null)
}