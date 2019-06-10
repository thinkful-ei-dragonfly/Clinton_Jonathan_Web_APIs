const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

//Drill 1
app.get('/sum', (req, res) => {
    const {a, b} = req.query;
    console.log(a, b);
    
    if(Object.keys(req.query).length !== 2) {
        return res 
        .status(400)
        .send('must be exactly 2 parameters');
    }
    
    else if(isNaN(parseInt(a)) || isNaN(parseInt(b))) {
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
    for(i = 0; i < text.length; i++){
        const charCode = text.charCodeAt(i);
        text = text.replace(text[i],  String.fromCharCode(charCode + parseInt(shift)));
    }
    res.send(text);
})

//Drill 3
app.get('/lotto', (req, res) => {
    const arr = req.query;
    let testArr = [];
    for(i = 0; i < 6; i++){
      testArr.unshift(Math.floor(Math.random()* 20));
    }
});

app.listen(8000);