import gameBoardModule from './gameBoard.js';

const displayControllerModule = (function() {
  const gridItems = document.querySelectorAll(".grid-item");
  const resetButton = document.querySelector('.reset-button');
  const result = document.querySelector('.comments');

  const updateGrid = () => {
    const board = gameBoardModule.getBoard();
    for (let i = 0; i < gridItems.length; i++) {
      gridItems[i].textContent = board[i];
    }
  };

  const setCellClickListener = (callback) => {
    gridItems.forEach((item) => item.addEventListener("click", callback));
  };

  const setResetButton = (resetCallback) => {
    resetButton.addEventListener('click', () => {
      gameBoardModule.cleanBoard();
      updateGrid();
      result.textContent = '';
      resetCallback();
    });
  };

  return {
    updateGrid,
    setCellClickListener,
    setResetButton
  };
})();

export default displayControllerModule;