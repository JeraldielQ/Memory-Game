const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Flipping Card.
function flipCard() {
  if (lockBoard) return;

  
  if (this === firstCard) return;

  // adding flip to the first click card
  this.classList.add('flip');

  //Preventing from flipping every card
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // Adding flip to the second click card
  secondCard = this;
  
  checkForMatch();
}

// Checking if the cards that are click the same.
function checkForMatch() {

  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  // if the cards are the same dissable the flipping mechanic and
  // if they are not the same flip them 
  isMatch ? disableCards() : unflipCards();
}

//Removing the ability to flip 
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  // to prevent double clicking
  resetBoard();
}


function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}
 // to prevent the double clicking
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));