const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes');

//To parse requests:
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/books', routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));