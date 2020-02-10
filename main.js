const album = [
  "york.jpg",
  "york.jpg",
  "lion.jpg",
  "lion.jpg",
  "zebra.jpg",
  "zebra.jpg",
  "eagle.jpg",
  "eagle.jpg",
  "elephant.jpg",
  "elephant.jpg",
  "cat.jpg",
  "cat.jpg"
];

const cards = [...document.querySelectorAll("div")];
let curtains = [...document.querySelectorAll("p")];

const startTime = new Date().getTime();

let activeCard = "";
const activeCards = [];
const gamePairs = cards.length / 2;
let gameResult = 0;

function clickCard() {
  activeCard = this;
  activeCard.classList.remove("active");
  if (activeCard == activeCards[0]) return;
  if (activeCards.length === 0) {
    activeCards[0] = activeCard;
  } else {
    curtains.forEach(curtain =>
      curtain.removeEventListener("click", clickCard)
    );
    activeCards[1] = activeCard;
    setTimeout(function() {
      if (activeCards[0].dataset.value === activeCards[1].dataset.value) {
        activeCards.forEach(card => card.classList.add("won"));
        gameResult++;
        curtains = curtains.filter(
          curtain => !curtain.classList.contains("won")
        );
        if (gameResult == gamePairs) {
          const endTime = new Date().getTime();
          const gameTime = (endTime - startTime) / 1000;
          alert(`Gra ukończona. Twój wynik to : ${gameTime.toFixed(0)} sekund`);
          location.reload();
        }
      } else {
        console.log("Przegrana");
        activeCards.forEach(card => card.classList.add("active"));
      }
      activeCard = "";
      activeCards.length = 0;
      curtains.forEach(curtain => curtain.addEventListener("click", clickCard));
    }, 1500);
  }
}

const game = function() {
  for (i = 0; i < cards.length; i++) {
    const position = Math.floor(Math.random() * album.length);
    cards[i].style.backgroundImage = `url('${album[position]}')`;
    curtains[i].dataset.value = album[position];
    album.splice(position, 1);
  }
  setTimeout(function() {
    curtains.forEach(curtain => {
      curtain.classList.add("active");
      curtain.addEventListener("click", clickCard);
    });
  }, 2000);
};

game();
