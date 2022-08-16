
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

let player = {
    name: "Eru",
    credits: 150
}

playerEl.textContent = player.name + ": $" + player.credits

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    console.log(randomNumber)
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
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
    sumEl.textContent = "Sum: " + sum
    cardsEl.textContent =  "Cards: "
    for (i=0; i< cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
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
    console.log(message)
}

drawNewCard.addEventListener("click", function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
})