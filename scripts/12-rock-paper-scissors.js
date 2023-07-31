const score =  JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

//* Another way to initialize the values of the 'score' object without using the default operator.
// if (!score) {
//  score = {
//     wins: 0,
//     losses: 0,
//    ties: 0
//   };
// } 

document.querySelector('.js-autoplay-button')
  .addEventListener('click', () => {
    autoPlay();
  });

//* This function autoplay the rock-paper-scissors game.
//? Code below is making the autoPlay() function an arrow function. (Personal preference)
//const autoPlay = () => {
//
//};
let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.js-autoplay-button')
      .innerHTML = 'Stop Playing';
    document.querySelector('.js-autoplay-status')
      .innerHTML = 'Auto-play is On.';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-autoplay-button')
      .innerHTML = 'Auto Play';
    document.querySelector('.js-autoplay-status')
      .innerHTML = '';
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    showResetConfirmation();
  }
});

/**
 * * This function plays a game of Rock-Paper-Scissors between the player and the computer.
 *   @param {string} playerMove - The move chosen by the player ('rock', 'paper', or 'scissors').
 */
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win!';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win!';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }

  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win!';
    }
    
  }

  if (result === 'You win!') {
    score.wins ++;
  } else if (result === 'You lose.') {
    score.losses ++;
  } else if (result === 'Tie.') {
    score.ties ++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`; 
}

//* This function updates the score state displayed in the HTML body.
function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

//* This function randomizes the computer's move.
function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove ='rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove ='paper';
  } else if (randomNumber >= 2/3 && randomNumber < 3) {
    computerMove ='scissors';
  }

  return computerMove;
}

function resetScore () {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
    showResetConfirmation();
  });

function showResetConfirmation() {
  document.querySelector('.js-reset-confirmation')
    .innerHTML = `
      Are you sure you want to reset the score?
      <button class="reset-confirm-button js-reset-confirm-yes">
        Yes
      </button>
      <button class="reset-confirm-button js-reset-confirm-no">
        No
      </button>
    `;

  document.querySelector('.js-reset-confirm-yes')
    .addEventListener('click', () => {
      resetScore();
      hideResetConfirmation();
    });
    
  document.querySelector('.js-reset-confirm-no')
    .addEventListener('click', () => {
      hideResetConfirmation();
    })
}

function hideResetConfirmation() {
  document.querySelector('.js-reset-confirmation')
    .innerHTML = '';
}