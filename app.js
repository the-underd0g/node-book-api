const express = require('express');
const mongoose = require('mongoose')
const app = express();
const db = mongoose.connect('mongodb://localhost:37017/bookAPI',{ useNewUrlParser: true } );
const port = process.env.PORT || 3000;

const Book = require('./models/bookModel');

const bookRouter = express.Router();

bookRouter.route('/books')
    .get((req, res) => {
        Book.find((err, books) => {
            if(err){
                return res.send(err)
            }
            return res.json(books);

        })
    });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

app.listen(port, ()=>{
   console.log(`poootas ${port}`);
});