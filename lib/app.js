const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());

const tours = require('./routes/tours');

app.use('/api/tours', tours);

module.exports = app;
