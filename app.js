const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/weather';

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const mainRouter = require('./routes/main');
// const API = require('./data/API');
app.use('/', mainRouter);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
