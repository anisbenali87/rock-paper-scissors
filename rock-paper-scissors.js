'use strict';

let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = ''; // Use `let` since it will change
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }
  return computerMove;
}

function updateScore() {
  document.querySelector(
    '.js-score'
  ).innerHTML = `Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}`;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.setItem('score', JSON.stringify(score));
  updateScore();
  document.querySelector('.js-result').innerHTML = '';
  document.querySelector('.js-move').innerHTML = '';
}

updateScore();

function gameRules(playerMove) {
  const computerMove = pickComputerMove(); // Fixed: call pickComputerMove, not computerMove()
  let result = ''; // Fixed: let instead of const for result
  if (computerMove === playerMove) {
    result = 'Tie';
    score.ties++;
  } else if (
    (computerMove === 'rock' && playerMove === 'paper') ||
    (computerMove === 'paper' && playerMove === 'scissors') ||
    (computerMove === 'scissors' && playerMove === 'rock')
  ) {
    result = 'You win!';
    score.wins++;
  } else {
    result = 'You lose!';
    score.losses++;
  }

  localStorage.setItem('score', JSON.stringify(score));
  document.querySelector('.js-result').innerHTML = `${result}`;
  document.querySelector(
    '.js-move'
  ).innerHTML = `You <img src="images/${playerMove}-emoji.png" class="icone" /> <img src="images/${computerMove}-emoji.png" class="icone" /> Computer `;
  updateScore();
}
