const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const scoreboard = document.getElementById('scoreboard');
let missed = 0;

const resetButton = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const phrases = [
  'I love you so',
  'Good luck to you',
  'See good in all thing',
  'Less is more',
  'You are amazing'
];

resetButton.addEventListener('click', (e) => {
  const button = e.target;
  const ul = document.querySelector('#phrase ul');
  let phraseArray = getRandomPhraseAsArray(phrases);
  
  if (button.textContent === 'Play again') {
    overlay.style.display = 'none';
    missed = 0;
  
  // reset qwerty 
    let key = document.querySelectorAll('.chosen');
    for (let i = 0; i < key.length; i++) {
      key[i].classList.remove('chosen');
      key[i].removeAttribute('disabled');
    }
  
  // reset letter displayed
    let letter = document.querySelectorAll('.show');
    for (let i = 0; i < letter.length; i++) {
      letter[i].classList.remove('show');
    }
    
  // reset hearts
    for (let i = 0; i < 5; i++ ) {
      let li = document.createElement('li');
      let ol = document.querySelector('ol');
      let imgLink = '<img src="images/liveHeart.png" height="35px" width="30px">';
      li.innerHTML = imgLink;
      ol.appendChild(li);
      li.classList.add('tries');
    }

    addPhraseToDisplay(phraseArray);

  } else if (button.textContent === 'Start Game') {
    overlay.style.display = 'none';
    addPhraseToDisplay(phraseArray); 

  }
}) 


function getRandomPhraseAsArray(arr) {
  const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
  return randomPhrase;
}

function addPhraseToDisplay(arr){
  const chars = arr.split('');
  const ul = document.querySelector('#phrase ul');
  for (let i = 0; i < chars.length; i++) {
    const li = document.createElement('li');
    const text = document.createTextNode(chars[i]);
    if (text.textContent !== ' ') {
      li.className = 'letter'; 
    } else {
      li.style.marginRight = '16px';
    }
    li.appendChild(text);
    ul.appendChild(li);
  }
  
}

function checkLetter(keyClick) {
  const letterDisplayed = document.querySelectorAll('.letter');
  let letterMatched = null;
  for (let i = 0; i < letterDisplayed.length; i++) {
    if (letterDisplayed[i].textContent.toLowerCase() === keyClick) {
      letterDisplayed[i].classList.add('show');
      letterMatched = keyClick;
    }
  }
  return letterMatched;
}

function winOrLose(missed) {
  const lettersShown = document.querySelectorAll('.show');
  const letterDisplayed = document.querySelectorAll('.letter');
  const p = document.createElement('p');
  const reset = document.querySelector('.btn__reset');

  if (letterDisplayed.length === lettersShown.length) {
    overlay.className = 'win';
    overlay.style.display = '';
    p.innerHTML = ('You win. Congratulations!');
    overlay.appendChild(p);
    reset.textContent = 'Play again';

  } else if (missed >= 5) {
    overlay.className = 'lose';
    overlay.style.display = '';
    p.innerHTML = ('Sorry, You lose.');
    overlay.appendChild(p);
    reset.textContent = 'Play again';
  }
  p.style.fontSize = '2rem';
}

qwerty.addEventListener('click', (e) => {
  const buttonClick = e.target;
  if (buttonClick.tagName === 'BUTTON') {
    buttonClick.classList.add('chosen');
    buttonClick.setAttribute('disabled', '');

    let letterClick = buttonClick.textContent;
    let letterFound = checkLetter(letterClick);

    if (letterFound === null) {
      const scoreboard = document.getElementById('scoreboard');
      const li = document.querySelectorAll('li.tries')[0];
      const ol = li.parentNode;
      missed++;
      ol.removeChild(li);
    }
  }
  winOrLose(missed);
})





