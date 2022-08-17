
let sum = 0
let cards = []
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
    if (randomNumber > 10) {
        console.log("random number is: " + randomNumber)
        return 10
    } else if (randomNumber === 1) {
        console.log("random number is: " + randomNumber + " --- Returning ACE")
        return 11
    } else {
        console.log("random number is: " + randomNumber)
        return randomNumber
    }
}

startGameBtn.addEventListener("click", function startGame() {
    isAlive = true
    hasBlackJack = false
    let firstCard = getRandomCard()
    let secondCard  = getRandomCard()
    sum = firstCard + secondCard
    cards = [firstCard, secondCard]
    renderGame()
})

function renderGame() {
    cardSVG.innerHTML = ""
    sumEl.textContent = "Sum: " + sum
    // cardsEl.textContent =  "Cards: "
    for (i=0; i< cards.length; i++) {
        // cardsEl.textContent += cards[i] + " "
        cardSVG.innerHTML += `<img src="images/cards/${cardPickSVG(cards[i])}" width="100" height="150"></img>`
        // console.log("DEBUG" + cardSVG.innerHTML)

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
    // console.log(message)
}

drawNewCard.addEventListener("click", function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
})
 
function cardPickSVG(incCardNumber) {
    let randomNumber = Math.floor(Math.random() * 4)
    let cardToReturn = ""
    console.log('INCOMING CARD NUMBER: ' + incCardNumber)
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
    console.log("debug!" + cardToReturn)
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