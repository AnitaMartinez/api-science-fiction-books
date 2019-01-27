const express = require('express');
const app = express();
const port = 3000;

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'books';

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

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

app.post('/books', (req, res) => {
    if(req.body.title && req.body.author){
        MongoClient.connect(url, function(err, client) {
            if(!err){
                const col = client.db(dbName).collection('books');
                col.insertOne(req.body, (err, result) => {
                    if(!err){
                        res.send(req.body);
                    }
                });
            }
        });
    } else {
        res.send('Error: You must send at least title and author');
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));