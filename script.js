const gameBoardModule = (function(){
    let board = ['','','','','','','',''];

    const getBoard = () =>[...board];

    const updateBoard = (index, playerSymbol) => {
        if (board[index])===''){
            board[index] = playerSymbol;
        }
    }
    return {getBoard,
    updatedBoard}
})();


const displayControllerModule = (function(){
    const gridItems = document.querySelectiorAll('.grid-item');
    
    const updateGrid = () => {
        const board = gameBoardModule.getBoard();
for(let i=0; i<gridItems.length; i++){
gridItem[i].textContent = board[i];
 }

 const setCellClickListener = () => {
    gridItems.forEach((item) =>
        item.addEventListener('click', callback));
    }
 }
return {
    updateGrid,
    setCellClickListener
}
}
)();

displayControllerModule.updateGrid();


const createPlayer = (playerName, playerSymbol) =>{
return{
    getName:() => playerName,
    getSymbol:() =>playerSymbol
}
}


const gameControllerModule = (function(){
let currentPlayer =  createPlayer('playerOne', 'X');
let nextPlayer =  createPlayer('playerTwo', 'X');

const handleCellClick = (event) => {
    const clickedIndex = parseInt(event.target.dataset.cellIndex);
gameBoardModule.updateBoard(clickedIndex, currentPlayer.getSymbol())
displayConctrollerModule.updateGrid();

}
})()

//switchPlayer();


// run game

displayContollerNodule.setCellClislcListener(handleCellClick);





