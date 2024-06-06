const gameBoardModule = (function() {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => [...board];

  const updateBoard = (index, playerSymbol) => {
    if (board[index] === "") {
      board[index] = playerSymbol;
      return true;
    }
    return false;
  };

  const cleanBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return {
    getBoard,
    updateBoard,
    cleanBoard
  };
})();

export default gameBoardModule;