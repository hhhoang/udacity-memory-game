/*
 * Create a list that holds all of your cards
 */

const cardList = ['fa fa-cube', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bomb', 'fa fa-diamond', 'fa fa-leaf', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-diamond'];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided 'shuffle' method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

let deck = document.getElementsByClassName('deck')[0];
// shuffle CardList and create HTML and add to page
function updateBoard(cardList) {
    // if there is any element inside <UL> delete to restart fresh
    deck.innerHTML = '';
    let shuffledCardList = shuffle(cardList);
    for (let i = 0; i < shuffledCardList.length; ++i) {
        let li = document.createElement('li');
        li.className = 'card';
        let icon = document.createElement('i');
        icon.className = shuffledCardList[i];
        li.appendChild(icon);
        deck.appendChild(li);
    }
}

updateBoard(cardList);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of 'open' cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// following https://gomakethings.com/listening-for-click-events-with-vanilla-javascript/ 
let openCardList = [];

function clickCard(event) {
    let card = event.target;

    // if click is not on card, bail
    if (!card.matches('.card')) return;
    event.preventDefault();
    // if card is clicked, display Card
    displayCard(card);
}

deck.addEventListener('click', clickCard);

// display Card 
function displayCard(card) {
    // add class 'open show' to show the icon of the card
    card.className += ' open show';
    incrementMoveCounter();
    addToOpenCardList(card);
}

// add the card to a *list* of 'open' cards
function addToOpenCardList(card) {
    openCardList.push(card);
    setTimeout(function() {
        if (openCardList.length == 2) {
            checkIfMatch();
        }
    }, 3000);
}

// check to see if the two cards match, if not 
function checkIfMatch() {
    if (openCardList[0].isEqualNode(openCardList[1])) {
        matchedCard(openCardList[0]);
        matchedCard(openCardList[1]);
        openCardList = [];
        checkIfAllCardsMatch();
    } else {
        notMatchedCard(openCardList[0]);
        notMatchedCard(openCardList[1]);
        openCardList = [];
    }

}

// if the cards do match, lock the cards in the open position
function matchedCard(card) {
    card.className += ' match';
    card.className = card.className.replace(/\b open show\b/g, '');
}

// if cards do not match, remove the cards from the list and hide the card's symbol 
function notMatchedCard(card) {
    card.className = card.className.replace(/\b open show\b/g, '');
}


//increment the move counter and display it on the page
let moves = document.getElementsByClassName('moves')[0];

function incrementMoveCounter() {
    moves.innerHTML = parseInt(moves.innerHTML) + 1;
}


let match = [];
// if all cards have matched, display a message with the final score
function checkIfAllCardsMatch() {
    let cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].className.match('match')) {
            match.push(cards[i]);
        }
    }
    if (match.length == 16) {
        displayWonMessage();
    } else {
        match = [];
    }
}


// Display win message
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
function displayWonMessage() {
    // Get the modal
    var modal = document.getElementById('wonMessage');
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName('close')[0];

    modal.style.display = 'block';
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = 'none';
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// Restart the game Button (reset board, moves and star rating)
let restart = document.getElementsByClassName('restart')[0];

function restartGame() {
    updateBoard(cardList);
    moves.innerHTML = 0;
    // TO-DO: reset stars
}

restart.addEventListener('click', restartGame);