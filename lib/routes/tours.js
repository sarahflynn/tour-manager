const router = require('express').Router();
const Tour = require('../models/Tour');
// const weatherMiddleware = require('../util/getWeather');

module.exports = router
    .post('/', (req, res, next) => {
        const { title, activities } = req.body;
        Tour.create({ title, activities })
            .then(tour => res.json(tour))
            .catch(next)
    });