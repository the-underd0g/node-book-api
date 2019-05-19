const express = require('express');
const mongoose = require('mongoose')
const app = express();
const db = mongoose.connect('mongodb://localhost:37017/bookAPI',{ useNewUrlParser: true } );
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const Book = require('./models/bookModel');
app.use(bodyParser.urlencoded({extended :true}));
app.use(bodyParser.json());

const bookRouter = express.Router();

bookRouter.route('/books')
    .post(
        (req,res ) => {
            const book = new Book(req.body);
            book.save();
            return res.status(201).json(book);
        }
    )
    .get((req, res) => {
        const query = {};
        if ( req.query.genre) {
            query.genre = req.query.genre
        }
        Book.find(query, (err, books) => {
            if(err){
                return res.send(err)
            }
            return res.json(books);

        })
    });
bookRouter.route('/books/:bookId')
    .get((req, res) => {
        Book.findById(req.params.bookId, (err, book) => {
            if(err){
                return res.send(err)
            }
            return res.json(book);
        })
    });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

app.listen(port, ()=>{
   console.log(`poootas ${port}`);
});