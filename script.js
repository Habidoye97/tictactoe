const game = (() => {

  const form = document.getElementById('form');
  const playerOne = document.querySelector('.player1');
  const playerTwo = document.querySelector('.player2');
  const elementDisplay = document.querySelectorAll('.none');
  const playerOneScore = document.querySelector('.player1_score');
  const playerTwoScore = document.querySelector('.player2_score');
  
  const firstPlayerName = () => {
    const firstPlayer = playerOne.value;
    return firstPlayer
  }

  const secondPlayerName = () => {
    const secondPlayer = playerTwo.value;
    return secondPlayer
  }

  const firstPlayer = (scoredetails) => {
    playerOneScore.textContent = scoredetails;
    
  }

  const secondPlayer = (scoredetails) => {
    playerTwoScore.textContent = scoredetails;
  }
  const startGame = () => {
    if (firstPlayerName() === "" || secondPlayerName() === "") {
      alert("Please input Players names")
      return
    }
    elementDisplay.forEach((display) => {
      display.classList.remove("none")
    });
    form.classList.add("none")
    firstPlayer(firstPlayerName().toUpperCase() + " Score: " + playerScore(0))
    secondPlayer(secondPlayerName().toUpperCase() + " Score: " + playerScore(0))
    displayController.setMessageElement(`Hello players, ${firstPlayerName().toUpperCase()} will play with X and ${secondPlayerName().toUpperCase()} will play with O`)
    // form.reset()
  }

  const playerScore = (num) => {
    let score = 0
    score += num
    return score
  }
  
  const getPlayersone =() => {
    return 
  }
  
  const startGamebtn = document.getElementById('startgame');
  startGamebtn.addEventListener('click', startGame);
  
  return {startGame, firstPlayer, secondPlayer, playerScore, firstPlayerName, secondPlayerName};
  
})();

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
  let num = 1
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
  let firstnum = 0
  let secondnum = 0

  const playRound = (cellIndex) => {
    gameBoard.setCell(cellIndex, getCurrentPlayerSign());
    if (checkWinner(cellIndex)) {
      displayController.setResultMessage(getCurrentPlayerSign());
      isOver = true;
      if (getCurrentPlayerSign() === "X") {
        firstnum++
        game.firstPlayer(game.firstPlayerName().toUpperCase() + " Score: " + game.playerScore(firstnum))
      }
      if (getCurrentPlayerSign() === "O") {
        secondnum++
        game.secondPlayer(game.secondPlayerName().toUpperCase() + " Score: " + game.playerScore(secondnum))
      }
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