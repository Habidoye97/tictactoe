const Game = (() => {

  const form = document.getElementById('form');
  const playerOne = document.querySelector('.player1');
  const playerTwo = document.querySelector('.player2');
  const elementDisplay = document.querySelectorAll('.none');
  const playerOneScore = document.querySelector('.player1_score');
  const playerTwoScore = document.querySelector('.player2_score');
  

  const startGame = () => {
    const firstPlayer = playerOne.value;
    const secondPlayer = playerTwo.value;
    if (firstPlayer === "" && secondPlayer === "") {
      alert("Please input Players names")
      return
    }
    elementDisplay.forEach((display) => {
      display.classList.remove("none")
    });
    form.classList.add("none")
    playerOneScore.textContent = firstPlayer.toUpperCase() + " Score:" 
    playerTwoScore.textContent = secondPlayer.toUpperCase() + " Score:"
    displayController.setMessageElement(`Hello players, ${firstPlayer}'s will play with X and ${secondPlayer} will play with O`)
    console.log(firstPlayer)
    console.log(secondPlayer)
    form.reset()
  }

  const playerScore = () => {
    
  }
  
  const getPlayersone =() => {
    return 
  }
  
  const startGamebtn = document.getElementById('startgame');
  startGamebtn.addEventListener('click', startGame)
  return {startGame}
  
})()

const Player = (sign) => {
  this.sign = sign;

  const getSign = () => {
    return sign
  }
  return {getSign};
}

const gameBoard = (()=> {
  const board = ["", "", "", "", "", "", "", "", ""];

  const setCell = (index, sign) => {
    if (index > board.length) return;
    board[index] = sign;
  };

  const getCell = (index) => {
    if ( index > board.length) return;
    return board[index];
  };

  const reset = () => {
    for (let i = 0; i< board.length; i++) {
      board[i] = "";
    }
  };

  return { setCell, getCell, reset}
})();

const displayController = (() => {
  const cellElements = document.querySelectorAll(".cell");
  const messageElement = document.getElementById('message');
  const restartbtn = document.getElementById('restart');

  cellElements.forEach((cell) => 
    cell.addEventListener('click', (e) => {
      if (gameController.getIsOver() || e.target.textContent !== "") return;
      gameController.playRound(parseInt(e.target.dataset.index));
      updateGameboard();
      console.log(updateGameboard())
    })
  );

  restartbtn.addEventListener('click', (e) => {
    gameBoard.reset();
    gameController.reset();
    updateGameboard();
    setMessageElement("Player X's turn")
  });

  const updateGameboard = () => {
    for (let i = 0; i < cellElements.length; i++) {
      cellElements[i].textContent = gameBoard.getCell(i)
    }
  };

  const setResultMessage = (winner) => {
    if (winner === "Draw") {
      setMessageElement("It's a draw!");

    } else {
      setMessageElement(`Player ${winner} has won!`)
    }
  };

  const setMessageElement = (message) => {
    messageElement.textContent = message;
  };

  return {setResultMessage, setMessageElement}
})();

const gameController = (() => {
  const playerX = Player("X")
  const playerO = Player("O");
  let round = 1;
  let isOver = false;

  const playRound = (cellIndex) => {
    gameBoard.setCell(cellIndex, getCurrentPlayerSign());
    if (checkWinner(cellIndex)) {
      displayController.setResultMessage(getCurrentPlayerSign());
      isOver = true;
      return
    }
    if (round === 9) {
      displayController.setResultMessage("Draw");
      isOver = true;
      return;
    }

    round++
    displayController.setMessageElement(`Player ${getCurrentPlayerSign()}'s turn`)
  }

  const getCurrentPlayerSign = () => {
    return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
  };

  const checkWinner = (cellIndex) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions
      .filter((combination) => combination.includes(cellIndex)).some((possibleCombination) => possibleCombination.every((index) => gameBoard.getCell(index)=== getCurrentPlayerSign()));

  };

  const getIsOver = () => {
    return isOver

  }

  const reset = () => {
    round = 1;
    isOver = false;
  }

  return { playRound, getIsOver, reset}
})();