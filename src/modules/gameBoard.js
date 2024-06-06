const gameBoardModule = (function() {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => [...board];

  const updateBoard = (index, playerSymbol) => {
    if (board[index] === "") {
      board[index] = playerSymbol;
    }
    else(alert('you can not click here twice again')
   )
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