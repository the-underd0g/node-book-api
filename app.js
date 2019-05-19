const express = require('express');
const mongoose = require('mongoose');
const app = express();

if(process.env.ENV === 'Test'){
    const db = mongoose.connect('mongodb://localhost:37017/bookAPI_Test',{ useNewUrlParser: true } );
}else{
    const db = mongoose.connect('mongodb://localhost:37017/bookAPI',{ useNewUrlParser: true } );
}
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({extended :true}));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/status', (req, res) => {
    const localTime = (new Date()).toLocaleDateString();
    res.status(200)
        .send(`Server time is ${localTime}`);
});

app.get('*', (req, res) => {
    res.sendStatus(404);
});

app.server = app.listen(port, ()=>{
   console.log(`Server is running in port: ${port}`);
});

module.exports = app;