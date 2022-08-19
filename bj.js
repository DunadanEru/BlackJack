let sum = 0
let cardsNumerical = []
let cards = []
let cardsToDisplay = []
let hasBlackJack = false
let isAlive = false
let message = ""

const sumEl = document.getElementById("sum-el")
const cardsEl = document.querySelector("#cards-el")
const messageEl = document.getElementById("message-el")
const playerEl = document.getElementById("player-el")
const startGameBtn = document.getElementById("btn-start")
const drawNewCard = document.getElementById("btn-newcard")


var cardSVG = document.getElementById("cards-el");


let player = {
    name: "Eru",
    credits: 150
}

playerEl.textContent = player.name + ": $" + player.credits

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    let cardValue = 0
    if (randomNumber > 10) {
        cardValue = 10
    } else if (randomNumber === 1) {
        cardValue = 11
    } else {
        cardValue = randomNumber
    }
    return [cardValue, randomNumber];
}

startGameBtn.addEventListener("click", function startGame() {
    isAlive = true
    hasBlackJack = false
    let [firstCard, displayFirstCard]  = getRandomCard()
    let [secondCard, displaySecondCard]  = getRandomCard()
    sum = firstCard + secondCard
    cards = [firstCard, secondCard]
    cardsNumerical = [displayFirstCard, displaySecondCard]
    cardsToDisplay = [cardPickSVG(displayFirstCard), cardPickSVG(displaySecondCard)]
    renderGame()
})


// Main function to render game on each turn
function renderGame() {
    cardSVG.innerHTML = ""
    sumEl.textContent = "Sum: " + sum
    for (i=0; i< cardsToDisplay.length; i++) {
        cardSVG.innerHTML += `<img src="images/cards/${cardsToDisplay[i]}" width="100" height="150"></img>`
    }
    if (sum < 21) {
        message = "Do you want to draw another card ? "

    } else if (sum === 21) {
        hasBlackJack = true
        message = "You've got Blackjack!"
    } else {
        isAlive = false
        message = "You're out of the game! "
    }
    messageEl.textContent = message
}

drawNewCard.addEventListener("click", function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let [cardValue, displayCard] = getRandomCard()
        sum += cardValue
        cards.push(cardValue)
        cardsNumerical.push(displayCard)
        cardsToDisplay.push(cardPickSVG(displayCard))
        renderGame()
    }
})
 
function cardPickSVG(incCardNumber) {
    let randomNumber = Math.floor(Math.random() * 4)
    let cardToReturn = ""
    if (incCardNumber === 1) {
        cardToReturn = "A" + getCardSuit(randomNumber) + ".svg"
    }   else if (incCardNumber === 11) {
        cardToReturn = "J" + getCardSuit(randomNumber) + ".svg"
    }   else if (incCardNumber === 12) {
        cardToReturn = "Q" + getCardSuit(randomNumber) + ".svg"
    }   else if (incCardNumber === 13) {
        cardToReturn = "K" + getCardSuit(randomNumber) + ".svg"
    }   else {
        cardToReturn = incCardNumber + getCardSuit(randomNumber) + ".svg"
    }
    return cardToReturn
}

function getCardSuit(randomNumber) {
    if (randomNumber === 0) {
        return "C"
    } else if (randomNumber === 1) {
        return "D"
    } else if (randomNumber === 2) {
        return "H"
    } else {
        return "S"
    }
}
