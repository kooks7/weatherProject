const path = require('path');

const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const mainRouter = require('./routes/main');
const API = require('./data/API');
app.use(mainRouter);

app.listen(4000);
