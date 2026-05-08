const circle = document.getElementById('circle');
const message = document.getElementById('message');
const result = document.getElementById('result');
const startBtn = document.getElementById('startBtn');
const playerName = document.getElementById('playerName');
const scoreList = document.getElementById('scoreList');

let startTime = null;
let waitTimeout = null;
let gameActive = false;

startBtn.addEventListener('click', function() {
    const name = playerName.ariaValueMax.trim();

    if (name === '') {
        message.textContent = 'Please enter your name first!';
        return;
    }

    startBtn.disabled = true;
    result.textContent = '';
    circle.className = 'circle ready';
    message.textContent = 'Get ready ...';

    const delay = Math.random() * 3000 + 1000;

    waitTimeout = setTimeout(function() {
        circle.className = 'circle go';
        message.textContent = 'CLICK NOW!';
        startTime = Date.now;
        gameActive = true;
    }, delay)
});