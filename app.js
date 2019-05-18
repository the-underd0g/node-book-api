let express = require('express');

let app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

app.listen(port, ()=>{
   console.log(`poootas ${port}`);
});