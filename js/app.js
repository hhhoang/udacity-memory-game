/*
 * Create a list that holds all of your cards
 */

const cardList = ["fa fa-cube", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bomb", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bomb", "fa fa-diamond", "fa fa-leaf", "fa fa-anchor", "fa fa-bolt", "fa fa-bicycle", "fa fa-bicycle", "fa fa-diamond"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
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

let deck = document.getElementsByClassName("deck")[0];
// shuffle CardList and create HTML and add to page
function updateBoard(cardList) {
    let shuffledCardList = shuffle(cardList);

    let ul = deck;
    for (let i = 0; i < shuffledCardList.length; ++i) {
        let li = document.createElement('li');
        li.className = "card";
        let icon = document.createElement('i');
        icon.className = shuffledCardList[i];
        li.appendChild(icon);
        ul.appendChild(li);
    }
}

updateBoard(cardList);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//console.log(deck, "deck");
// 
// following https://gomakethings.com/listening-for-click-events-with-vanilla-javascript/ 

let openCardList = [];

function clickCard(event) {
    let card = event.target;

    // If the clicked element doesn't have the right selector, bail
    if (!card.matches('.card')) return;
    // Don't follow the link
    event.preventDefault();
    // if card is clicked, display Card
    console.log(card, "card is clicked");
    displayCard(card);
}

deck.addEventListener("click", clickCard);

// display Card 
function displayCard(card) {

    // add class "open show" to show the icon of the card
    card.className += " open show";
    addToOpenCardList(card);
}

// add the card to a *list* of "open" cards
function addToOpenCardList(card) {
    openCardList.push(card);
    if (openCardList.length == 2) {
        checkIfMatch();
    }
}

// check to see if the two cards match, if not 
function checkIfMatch() {
    if (openCardList[0].isEqualNode(openCardList[1])) {
        console.log("match");
        setTimeout(matchedCards(openCardList[0]), 300);
        setTimeout(matchedCards(openCardList[1]), 300);
        openCardList = [];
        checkIfAllCardsMatch();
    } else {
        setTimeout(notMatchedCards(), 3000);
        openCardList = [];
    }

}

// if the cards do match, lock the cards in the open position
function matchedCards(card) {
    card.className += " match";
    card.className = card.className.replace(/\b open show\b/g, "");
    console.log(card.className, "matchhhhhhh");
}

// if cards do not match, remove the cards from the list and hide the card's symbol 
function notMatchedCards() {
    console.log("not match");
    openCardList[0].className = openCardList[0].className.replace(/\b open show\b/g, "");
    openCardList[1].className = openCardList[1].className.replace(/\b open show\b/g, "");
}

function incrementMoveCounter() {

}

let match = [];

function checkIfAllCardsMatch() {
    let cards = document.getElementsByClassName('card');
    console.log(cards, "cardsssss");
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].className.match('match')) {
            console.log("yeahhh");
            match.push(cards[i]);
        }
    }
    if (match.length == 16) {
        alert("you wonnnnn");
    } else {
        match = [];
    }

}