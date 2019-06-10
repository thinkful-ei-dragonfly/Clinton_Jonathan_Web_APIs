const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

//Drill 1
app.get('/sum', (req, res) => {
    const { a, b } = req.query;
    console.log(a, b);

    if (Object.keys(req.query).length !== 2) {
        return res
            .status(400)
            .send('must be exactly 2 parameters');
    }

    else if (isNaN(parseInt(a)) || isNaN(parseInt(b))) {
        return res
            .status(400)
            .send('both parameters must be integers');
    }

    else {
        const sum = parseInt(a) + parseInt(b);
        console.log(sum);

        res.send(`${sum}`);
    }


})

//Drill 2
app.get('/cipher', (req, res) => {
    let text = req.query.text
    const shift = req.query.shift

    if (!text) {
        return res
            .status(400)
            .send('text is required');
    }

    if (!shift) {
        return res
            .status(400)
            .send('shift is required')
    }

    if(Number.isNaN(parseInt(shift))){
        return res
        .status(400)
        .send('shift must be a number');
    }

    for (i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        text = text.replace(text[i], String.fromCharCode(charCode + parseInt(shift)));
    }
    res.send(text);
})

//Drill 3
app.get('/lotto', (req, res) => {
    const arr = req.query;
    let testArr = [];

    if(!arr){
        return res
        .status(200)
        .send('arr is required');
    }

    if(!Array.isArray(arr)){
        return res
        .status(200)
        .send('arr must be an array')
    }
    const guesses = arr.map(n => parseInt(n))
    .filter(n => !Number.isNaN(n) && (n >= 1 && n <= 20));

    if(guesses.length != 6){
        return res
        .status(400)
        .send('arr must contain 6 integers between 1 and 20');
    }
    const stockNumbers = Array(20).fill(1).map((_,i) => i + 1);
    for (i = 0; i < 6; i++) {
        const ran = Math.floor(Math.random() * stockNumbers.length);
        testArr.push(stockNumbers[ran]);
        stockNumbers.splice(ran, 1);
    }

    let diff = testArr.filter(n => !guesses.includes(n));

    let responseText;

    switch(diff.length){
        case 0:
            responseText = 'Wow! Unbelievable! You could have won the mega millions! But this is not a real lottery!';
            break;
        case 1:
            responseText = 'Congratulations! You win $100!';
            break;
        case 2:
            responseText = 'Congratulations! You win a free ticket!';
            break;
        default:
            responseText = 'Sorry, you lose';
    }
});

app.listen(8000);