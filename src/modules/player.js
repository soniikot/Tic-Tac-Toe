const createPlayer = (playerName, playerSymbol) => {
  return {
    getName: () => playerName,
    getSymbol: () => playerSymbol,
  };
};

export default createPlayer;