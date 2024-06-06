const gameBoardModule = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => [...board];

  const updateBoard = (index, playerSymbol) => {
    if (board[index] === "") {
      board[index] = playerSymbol;
    }
  };

  const cleanBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return {
    getBoard,
    updateBoard,
    cleanBoard,
  };
})();

const displayControllerModule = (function () {
  const gridItems = document.querySelectorAll(".grid-item");
  const resetButton = document.querySelector(".reset-button");
  const result = document.querySelector(".comments");

  const updateGrid = () => {
    const board = gameBoardModule.getBoard();

    for (let i = 0; i < gridItems.length; i++) {
      gridItems[i].textContent = board[i];
    }
  };

  const setCellClickListener = (callback) => {
    gridItems.forEach((item) => item.addEventListener("click", callback));
  };

  const setResetButton = () => {
    resetButton.addEventListener("click", () => {
      gameBoardModule.cleanBoard();
      updateGrid();
      result.textContent = "";
      setCellClickListener(gameControllerModule.handleCellClick);
    });
  };

  return {
    updateGrid,
    setCellClickListener,
    setResetButton,
  };
})();

const createPlayer = (playerName, playerSymbol) => {
  return {
    getName: () => playerName,
    getSymbol: () => playerSymbol,
  };
};

const gameControllerModule = (function () {
  let xPlayer = createPlayer("playerOne", "X");
  let oPlayer = createPlayer("playerTwo", "O");
  let activePlayer = xPlayer;

  const switchPlayer = () => {
    activePlayer = activePlayer === xPlayer ? oPlayer : xPlayer;
  };

  const isWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let counter = 0;
    board.forEach((tile) => {
      if (tile !== "") {
        counter++;
      }
    });
    console.log(counter);
    if (counter >= 5) {
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          result.textContent = `Congrats ${activePlayer.getName()}. You won`;
          return true;
        } else if (counter === 9) {
          result.textContent = `it is tie`;
          return false;
        }
      }
    }

    return false;
  };

  const disableCellClickListener = () => {
    gridItems.forEach((item) =>
      item.removeEventListener("click", handleCellClick)
    );
  };

  const computerMove = () => {
    const board = gameBoardModule.getBoard();

    const randomEmptyCell = () => {
      const randomIndex = Math.floor(Math.random() * 9);
      if (board[randomIndex] === "") {
        activePlayer.getSymbol();
      } else if (board.every((cell) => cell !== "")) {
        return "it is tie";
      } else {
        return randomEmptyCell();
      }
      return randomIndex;
    };
    
    if (isWinner(board) === true) {
      disableCellClickListener();
    } else {
      switchPlayer();

      gameBoardModule.updateBoard(randomEmptyCell(), activePlayer.getSymbol());
      displayControllerModule.updateGrid();
    }
  };

  const handleCellClick = (event) => {
    const clickedIndex = parseInt(event.target.dataset.cellIndex);
    gameBoardModule.updateBoard(clickedIndex, activePlayer.getSymbol());
    displayControllerModule.updateGrid();
    computerMove();
    const board = gameBoardModule.getBoard();

    if (isWinner(board) === false) {
      switchPlayer();
    } else {
      disableCellClickListener();
    }
  };

  const gridItems = document.querySelectorAll(".grid-item");
  const result = document.querySelector(".comments");

  displayControllerModule.setResetButton();

  displayControllerModule.setCellClickListener(handleCellClick);
  return {
    handleCellClick,
  };
})();
