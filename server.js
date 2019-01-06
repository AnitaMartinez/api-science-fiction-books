const express = require('express');
const app = express();
const port = 3000;

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'books';

app.get('/books', (req, res) => {

// Connect using MongoClient
    MongoClient.connect(url, function(err, client) {
        if(!err){
            const col = client.db(dbName).collection('books');
            col.find({}).toArray(function(err, items) {
                res.send(items);
                client.close();
            });

        }
    });

});






app.listen(port, () => console.log(`Example app listening on port ${port}!`));