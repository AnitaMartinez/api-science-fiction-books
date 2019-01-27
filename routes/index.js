const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'books';

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/', (req, res) => {
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

router.post('/', (req, res) => {
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

module.exports = router;
