import createPlayer from '../modules/player.js';
import gameControllerModule from '../modules/gameController.js';


export const isWinner = (board, activePlayer) => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  let counter = 0;
  board.forEach((tile) => {
    if (tile !== "") {
      counter++;
      
    }
  });
  console.log(counter)
  if (counter >= 5) {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: true, message: `Congrats ${activePlayer.getName()}. You won` };
      }
    }
    if (counter === 9) {
   
      return { winner: true, message: `It is a tie` };
    }
  }
  return { winner: false, message: '' };
};