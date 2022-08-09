'use strict';

// btn 
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');

// display score
const currentScore_player1 = document.querySelector('#current--0');
const currentScore_player2 = document.querySelector('#current--1');

const totalScore_player1 = document.querySelector('#score--0');
const totalScore_player2 = document.querySelector('#score--1');


// player activate deactivate
const player = document.querySelector('.player');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

const playerName1 = document.querySelector('#name--0');
const playerName2 = document.querySelector('#name--1');

// click roll btn

let totalScorePlayer1 = 0;
let totalScorePlayer2 = 0;
let diceNumber = 0;
const arrDiceImg = [
    "dice-1.png",
    "dice-2.png",
    "dice-3.png",
    "dice-4.png",
    "dice-5.png",
    "dice-6.png"
];

//img
const diceImg = document.querySelector('.dice');


const switchPlayer= function() {
    if(player1.classList.contains('player--active')) {
        player1.classList.remove('player--active');
        player2.classList.add('player--active');

        // totalScorePlayer1 = 0 ;
        // console.log(`player 1 lose`);

    } else {
        player2.classList.remove('player--active');
        player1.classList.add('player--active');

        // totalScorePlayer2 = 0 ;
        // console.log(`player 2 lose`);
    }
};

const calcScorePlayer = function(totalScorePlayer,randomNumber) {
    if(randomNumber != 1) {
        totalScorePlayer = totalScorePlayer + randomNumber ;

        if(player1.classList.contains('player--active')) {
            totalScorePlayer1 = totalScorePlayer ;
        } else {
            totalScorePlayer2 = totalScorePlayer ;
        }

    } else {
        if(player1.classList.contains('player--active')) {
            totalScorePlayer1 = 0;
        } else {
            totalScorePlayer2 = 0;
        }

        switchPlayer();
        // switch player
    }
};

rollDiceBtn.addEventListener('click', function() {
    diceNumber =  Math.trunc(Math.random()*6) + 1 ;

    // change picture

    diceImg.src = `${arrDiceImg[diceNumber - 1]}`;

    if(player1.classList.contains('player--active')) {

        // console.log(`score before was ${totalScorePlayer1}`);
        calcScorePlayer(totalScorePlayer1,diceNumber);
        // console.log(`score after was ${totalScorePlayer1}`);
        currentScore_player1.textContent = totalScorePlayer1 ;

    } else {
        calcScorePlayer(totalScorePlayer2,diceNumber);
        currentScore_player2.textContent = totalScorePlayer2 ;

    }

});


let resultTotalScore_player1 = 0;
let resultTotalScore_player2 = 0;

const resultTotal = function(currentScore,totalScore) {
    const score = currentScore + totalScore ;
    totalScore += currentScore;
    if( score < 100) {
        // still competition

        if(player1.classList.contains('player--active')) {
            resultTotalScore_player1 = totalScore;
            totalScore_player1.textContent = totalScore;
        } else {
            resultTotalScore_player2 = totalScore;
            totalScore_player2.textContent = totalScore;
        }

        switchPlayer();
        totalScorePlayer1 = 0;
        currentScore_player1.textContent = 0 ;

        totalScorePlayer2 = 0;
        currentScore_player2.textContent = 0 ;

    } else {
        // winner was someone

        rollDiceBtn.disabled = true ;
        holdBtn.disabled = true;

        if(player1.classList.contains('player--active')) {
            playerName1.textContent = 'winner!';

            resultTotalScore_player1 = totalScore;
            totalScore_player1.textContent = totalScore;
            totalScorePlayer1 = 0;
            currentScore_player1.textContent = 0 ;

        } else {
            playerName2.textContent = 'winner!';
            resultTotalScore_player2 = totalScore;
            totalScore_player2.textContent = totalScore;
            totalScorePlayer2 = 0;
            currentScore_player2.textContent = 0 ;
        }
    }
};

holdBtn.addEventListener('click', function() {
    if(player1.classList.contains('player--active')) {
        console.log(`currentScore: ${totalScorePlayer1}, totalScore: ${resultTotalScore_player1}`);
        resultTotal(totalScorePlayer1,resultTotalScore_player1);

    } else {
        resultTotal(totalScorePlayer2,resultTotalScore_player2);
    }
    
});



newGameBtn.addEventListener('click', function() {
    playerName1.textContent = 'player 1';
    playerName2.textContent = 'player 2';

    totalScore_player1.textContent = 0;
    totalScore_player2.textContent = 0;

    currentScore_player1.textContent = 0;
    currentScore_player2.textContent = 0;

    resultTotalScore_player1 = 0;
    resultTotalScore_player2 = 0;

    totalScorePlayer1 = 0;
    totalScorePlayer2 = 0;

    rollDiceBtn.disabled = false ;
    holdBtn.disabled = false;

    diceImg.src = `${arrDiceImg[0]}`;

    player1.classList.add('player--active');
    player2.classList.remove('player--active');

});