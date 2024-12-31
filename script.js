'use strict';
// selecting elements
let player0score = document.querySelector('#score--0');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let player1score = document.getElementById('score--1');
let diceEl = document.querySelector('.dice');
const current0score = document.getElementById('current--0');
const current1score = document.getElementById('current--1');
const btnRoll = document.querySelector('.btn--roll');

const btnNew = document.querySelector('.btn--new');

const btnHold = document.querySelector('.btn--hold');

// starting conditions
let scores, currentscore, activeplayer, playing
const init = function () {
   
  scores = [0, 0];
  currentscore = 0;
  activeplayer = 0;
  playing = true;
  player0score.textContent = 0;
  player1score.textContent = 0;
  current0score.textContent = 0;
  current1score.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player0El.classList.remove('player--active');
};
init()
const switchplayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;

  currentscore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Dice roll functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generating a random dice role
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //   check if dice roll is one and perform action
    if (dice !== 1) {
      // add dice to current score
      currentscore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentscore;
    } else {
      // switch to next player
      switchplayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active players score
    scores[activeplayer] += currentscore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];
    // check score is >=100
    if (scores[activeplayer] >= 100) {
      // finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document   
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    } else {
      // switch to next player
      switchplayer();
    }
  }
});

btnNew.addEventListener('click', init);
