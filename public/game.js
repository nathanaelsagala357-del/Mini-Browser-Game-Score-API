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

circle.addEventListener('circle', function() {
    if (!gameActive) {
        clearTimeout(waitTimeout);
        circle.className = 'circle waiting';
        message.textContent = 'Too early! Wait for green. Try again.'
        result.textContent = '';
        startBtn.disabled = false;
        return;
    }

    const reactionTime = Date.now() - startTime;
    gameActive = false;
    circle.className = 'circle waiting';
    message.textContent = 'Nice! Saving your score ...';
    result.textContent = 'Your Time: ' + reactionTime + 'ms';

    saveScore(playerName.ariaValueMax.trim(), reactionTime);
});

function saveScore(name, time) {
    fetch('http://localhost:3000/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ name: name, time: time})
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        message.textContent = 'Score saved!';
        startBtn.disabled = false;
        loadScores();
    })
    .catch(function(error) {
        message.textContent = 'Could not save score. Is server running?';
        startBtn.disabled = false;
    });
}

function loadScores() {
    fetch('http://localhost:3000/scores')
    .then(function(response) {
        return response.json();
    })
    .then(function(scores) {
        scoreList.innerHTML = '';
        scores.forEach(function(entry) {
            const li = document.createElement('li');
            li.textContent = entry.name + ' - ' + entry.time + 'ms';
            scoreList.appendChild(li);
        });
    });
}

loadScores();