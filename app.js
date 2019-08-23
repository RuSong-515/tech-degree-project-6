const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
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

resetButton.addEventListener('click', () => {
  overlay.style.display = 'none';
});

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

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray); 

function checkLetter(keyClick) {
  const letterDisplayed = document.querySelectorAll('.letter');
  const letterMatched = null;
  for (let i = 0; i < letterDisplayed.length; i++) {
    if (letterDisplayed[i].textContent === keyClick) {
      letterDisplayed[i].classList.add('show');
      letterMatched = keyClick;
    }
  }
  return letterMatched;
}

qwerty.addEventListener('click', (e) => {
  const buttonClick = e.target;
  
  if (buttonClick.tagName === 'BUTTON') {
    buttonClick.classList.add('chosen');
    buttonClick.setAttribute('disabled', '');

    let letterClick = buttonClick.textContent;
    let letterFound = checkLetter(letterClick);
  }
})