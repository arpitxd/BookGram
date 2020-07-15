const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
var cors = require('cors');
var SearchBooks = require('./src/backend/libgenWrapper');
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.use('/books', SearchBooks);
app.listen(9090);
