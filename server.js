const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let scores = [];

app.post('/scores', function(req, res) {
    const { name, time} = req.body;

    if (!name || !time) {
        return res.status(400).json({ error: 'Name and time are required'});
    }

    scores.push({ name: name, time: time});
    scores.sort(function(a, b) {
        return a.time - b.time;
    });
    scores = scores.slice(0, 5);

    res.json({ message: 'Score saved!', scores: scores});
});

app.get('/scores', function(req, res) {
    res.json(scores);
});

app.listen(PORT, function() {
    console.log('Server running at http://localhost:' + PORT);
});