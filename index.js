let startTime;

let player1 = {
  disabled: true,
  guess: null,
  id: 1,
};

let player2 = {
  disabled: true,
  guess: null,
  id: 2,
};

let player3 = {
  disabled: true,
  guess: null,
  id: 3,
};

let player4 = {
  disabled: true,
  guess: null,
  id: 4,
};

let players = [
  player1,
  player2,
  player3,
  player4
];

let countdownTimer = 3;
let winner;
let number;

randomNumber = (min, max) => {
  return Math.ceil(Math.random() * (max - min) + min);
}

setTimeDisplay = () => {
  number = `${randomNumber(0, 5)}.${randomNumber(0, 10)}`;
  document.querySelector('.goal').style.bottom = `${(number * 50) + 50}px`;
  document.querySelector('.goal').style.display = 'block';
  document.querySelector('.time').style.display = 'block';
  document.querySelector('.time-container').innerText = `${number}s`;
}

startGame = () => {
  document.querySelector('.start-timer').classList.add('displayed');
  setTimeDisplay();
}

startTimer = () => {
  startTime = Date.now();
}

submitGuess = (player) => {
  player.guess = Date.now();
  var guessText = (player.guess - startTime) / 1000;
  document.querySelector(`.player-${player.id}-guess`).innerText = `${guessText}s`;
  document.querySelector(`.player-${player.id}`).style.height = `${(guessText * 50) + 50}px`
}

endGame = () => {
  document.querySelector('.victory').classList.add('shown');
  document.querySelector('.background').classList.add('shown');
  document.querySelector('.winner').innerText = `Player ${winner.id}`;
}

checkResult = (player) => {
  if (winner === undefined || (Math.abs((player.guess - startTime) - (number * 1000)) < Math.abs((winner.guess - startTime) - (number * 1000)))) {
    winner = player;
  }
  if (players.every(player => player.disabled)) {
    endGame();
  }
}

resetGame = () => {
  location.reload();
}

document.querySelector('.start-button').addEventListener('click', () => {
  document.querySelector('.start-button').classList.remove('displayed');
  startGame();
  const interval = setInterval(() => {
    if (countdownTimer > 0) {
      countdownTimer--;
    }
    if (countdownTimer === 0) {
      players.forEach(player => player.disabled = false);
      startTimer();
      document.querySelector('.start-timer').classList.remove('displayed');
      clearInterval(interval);
    }
    document.querySelector('.start-time').innerText = countdownTimer;
  }, 1000);
});

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 192) {
    if (!player1.disabled) {
      submitGuess(player1);
      player1.disabled = true;
      checkResult(player1);
    }
  } 
  if (event.keyCode === 16) {
    if (!player2.disabled) {
      submitGuess(player2);
      player2.disabled = true;
      checkResult(player2);
    }
  }
  if (event.keyCode === 39) {
    if (!player3.disabled) {
      submitGuess(player3);
      player3.disabled = true;
      checkResult(player3);
    }
  }
  if (event.keyCode === 8) {
    if (!player4.disabled) {
      submitGuess(player4);
      player4.disabled = true;
      checkResult(player4);
    }
  }
});

document.querySelector('.play-again').addEventListener('click', () => {
  resetGame();
})