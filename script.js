// Gameboard Module (using IIFE for single instance)
// Purpose: This module acts as the central repository for the game board's state. It encapsulates the logic related to managing the board data.
const gameBoardModule = (function() {
    let board = ["", "", "", "", "", "", "", "", ""];
  
    const getBoard = () => [...board];
  
  
  
    const updateBoard = (index, playerSymbol) => {
      if (board[index] === "") {
        board[index] = playerSymbol;
      }
    };

    //I put cleanBoard funciton here because I thougt it fits more into gameBoardModule
  const cleanBoard = () => {
       
            board = ["", "", "", "", "", "", "", "", ""];
            
  }

    return {
      getBoard,
      updateBoard,
      cleanBoard
    };
  })();
  
  // Display Controller Module (uses gameBoardModule)
  // Purpose: This module handles the visual representation of the game board on the screen.
  
  const displayControllerModule = (function() {
    // get our cells from the html
    const gridItems = document.querySelectorAll(".grid-item");
    const resetButton = document.querySelector('.reset-buttton');
  
    // attach text to each cell
    const updateGrid = () => {
      const board = gameBoardModule.getBoard();
  
      for (let i = 0; i < gridItems.length; i++) {
        gridItems[i].textContent = board[i];
      }
    };
  

  
    const setCellClickListener = (callback) => {
      gridItems.forEach((item) => item.addEventListener("click", callback));
    };
    //This is setButtonFunction. I evoked it in the button (not sure if it is right)
    //For some reason after I click on reset-button it clear the field, but then I put just one 'x" 
    //and it showes everything that was there before.
  const setResetButton = () =>{
    const board = gameBoardModule.getBoard();
    resetButton.addEventListener('click', myFunction)
    function myFunction(){
        gameBoardModule.cleanBoard();
        for (let i = 0; i < gridItems.length; i++) {
          gridItems[i].textContent = board[i];
        }
    }
  }
    
             return {
      updateGrid,
      setCellClickListener,
      setResetButton
    
    };
            })();
  
  // Player Factory (can be reused to create multiple players)
  // Purpose: This function acts like a factory that creates player objects. It serves as a reusable way to define players with their names and symbols.
  
  
  const createPlayer = (playerName, playerSymbol) => {
    return {
      getName: () => playerName,
      getSymbol: () => playerSymbol,
    };
  };
  
  // Game Controller Module (manages overall game logic)
  // Purpose: This module manages the overall game flow and logic. It keeps track of the current player, switches turns, and handles cell clicks.
  const gameControllerModule = (function() {
    let xPlayer = createPlayer("playerOne", "X");
    let oPlayer = createPlayer("playerTwo", "O");
    let activePlayer = xPlayer;
  //I saw some people were doing something like that to switch players
  //But it is not working right now
    
  const switchPlayer = function newFunction(){
     if(activePlayer == xPlayer){
      activePlayer =oPlayer;
     } 
  else{
    activePlayer = xPlayer;
  }
  return activePlayer;
     }
   
     
   
  
  
    const handleCellClick = (event) => {
      const clickedIndex = parseInt(event.target.dataset.cellIndex);
      gameBoardModule.updateBoard(clickedIndex, activePlayer.getSymbol());
     displayControllerModule.updateGrid();
      
     const board = gameBoardModule.getBoard();
  /* const checkWinner = (currentPlayer) =>{
      if (board)
   }
      // Check for win or tie (logic needs to be implemented)
      // ... (implement win and tie checking logic here)
      //I guess I nec to loop through the board array and figure out what indexes has current player symbol
  const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [2, 5, 8],
      [0, 3, 6],
      [1, 4, 7],
      [0, 4, 8],
      [2, 4, 6]
    ];

checkWinner();{

}*/
  
      switchPlayer();
      
    };
  
    displayControllerModule.setCellClickListener(handleCellClick);
     displayControllerModule.setResetButton();// optionally share anything below
    // return {};
    })();
  
  
  
  // run game 
 
  displayControllerModule.updateGrid();
 
 
  

