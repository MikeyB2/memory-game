const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
	console.log('I was clicked');
	console.log(this);
	if (lockBoard) return;
	if (this === firstCard) return;
	this.classList.add('flip');
	if (!hasFlippedCard) {
		//first click
		hasFlippedCard = true;
		firstCard = this;
		console.log({ hasFlippedCard, firstCard });
	} else {
		//second click
		hasFlippedCard = false;
		secondCard = this;
		console.log({ firstCard, secondCard });

		checkForMatch();
	}
}

function checkForMatch() {
	// terinary operator if statement
	// let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
	// isMatch ? disableCards() : unflipCards();
	// do card match
	console.log(firstCard.dataset.framework);
	console.log(secondCard.dataset.framework);
	if (firstCard.dataset.framework === secondCard.dataset.framework) {
		//its a match
		disableCards();
	} else {
		// not a match
		unflipCards();
	}
}

function disableCards() {
	//its a match
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
	lockBoard = true;
	// not a match
	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		lockBoard = false;
	}, 1500);
}

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
