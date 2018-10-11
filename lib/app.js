const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());

const events = require('./routes/events');

app.use('/api/events', events);

module.exports = app;
