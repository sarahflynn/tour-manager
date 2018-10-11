const router = require('express').Router();
const Tour = require('../models/Tour');
const weatherMiddleware = require('../util/getWeather');

module.exports = router
    .post('/', weatherMiddleware, (req, res) => {
        

    });