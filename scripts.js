const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

//variable utile a compter les cartes désactiver()
let compterCarteDisable = 0;


function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  //Lors de chaque pairs désactivé, cela les comptes
  compterCarteDisable += 2;
  
  //Fait disparaître les cartes lorsqu'elles sont un match
  firstCard.classList.add('hidden');
  secondCard.classList.add('hidden');

  //Si le nombre de cartes désactivé est équivalent au nombres de cartes, le temps s'arrete.
  if (compterCarteDisable === cards.length) {
    ArreterTemps();
    if(compteur<=20){
      afficherMessage("WOW TEMPS EXCEPTIONNEL :" + compteur + " secondes.");
    }
    else if(compteur<=35){
      afficherMessage("Bien Joué tu es dans la moyenne : " + compteur + " secondes.");
    }
    else{
      afficherMessage("Ce n'était vraiment pas ta meilleure : " + compteur + " secondes.");
    }
    

  }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
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

let compteur = 0;
let timeout;
let timer_on = 0;

//fonction qui sert a afficher ainsi que compter le temps.
function CompterTemps() {
  document.getElementById("timerCompter").value = compteur;
  compteur++;
  timeout = setTimeout(CompterTemps,1000);
}
//Function qui arrete le temps.
function ArreterTemps(){
  clearTimeout(timeout); 
}

  let boutonStart=document.getElementById("start");
   
  let inputTimerCompter

  boutonStart=addEventListener('click',CommencerCompte);
  
  
  
//Fonction qui commence le temps losrsqu'on clique sur le bouton commencer le temps ou partout dans l'écran.
function CommencerCompte() {
  if (!timer_on) {
    timer_on = 1;
    CompterTemps();
  }
}
//Fonction qui sert a afficher des message.
function afficherMessage(message) {
  // Afficher le message où vous le souhaitez, par exemple dans une boîte d'alerte
  alert(message);
}














  







