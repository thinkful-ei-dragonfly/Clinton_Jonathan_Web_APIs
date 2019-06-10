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

app.listen(8000);