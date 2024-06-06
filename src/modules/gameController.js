import gameBoardModule from './gameBoard.js';
import displayControllerModule from './displayController.js';
import createPlayer from './player.js';
import { isWinner } from '../utils/helperFunctions.js';


const gameControllerModule = (function() {
  let xPlayer = createPlayer("playerOne", "X");
  let oPlayer = createPlayer("playerTwo", "O");
  let activePlayer = xPlayer;

  

  const switchPlayer = () => {
    activePlayer = activePlayer === xPlayer ? oPlayer : xPlayer;
  };

  const disableCellClickListener = () => {
    gridItems.forEach((item) => item.removeEventListener("click", handleCellClick));
  };

  const computerMove = () => {
    const board = gameBoardModule.getBoard();

    const randomEmptyCell = () => {
 
      const randomIndex = Math.floor(Math.random() * 9);
      if (board[randomIndex] === "") {
        activePlayer.getSymbol();
      
      } else {
        return randomEmptyCell();
      }
      return randomIndex;
    };
    

      gameBoardModule.updateBoard(randomEmptyCell(), activePlayer.getSymbol());
      displayControllerModule.updateGrid();

      const updatedBoard = gameBoardModule.getBoard();
      const { winner, message } = isWinner(updatedBoard, activePlayer);
      const result = document.querySelector('.comments');
      if (!winner) {
        switchPlayer();
      
      } else {
        result.textContent = message;
        disableCellClickListener();
        switchPlayer();
      }
    }
  
  const handleCellClick = (event) => {
 
    const clickedIndex = parseInt(event.target.dataset.cellIndex);

    if (!gameBoardModule.updateBoard(clickedIndex, activePlayer.getSymbol())) {
      alert('You cannot click here twice. Try another cell.');
      return;
    }
    
    gameBoardModule.updateBoard(clickedIndex, activePlayer.getSymbol());
    displayControllerModule.updateGrid();
   

    const board = gameBoardModule.getBoard();
    const { winner, message } = isWinner(board, activePlayer);
    const result = document.querySelector('.comments');
    
    if (!winner) {
      switchPlayer();
      computerMove();
    } else {
      result.textContent = message;
      disableCellClickListener();
    }
  };

  const gridItems = document.querySelectorAll(".grid-item");

  displayControllerModule.setResetButton(() => {
    displayControllerModule.setCellClickListener(handleCellClick);
  });
  displayControllerModule.setCellClickListener(handleCellClick);

  return {
    handleCellClick
  };
})();

export default gameControllerModule;