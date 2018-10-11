const router = require('express').Router();
const Tour = require('../models/Tour');
// const weatherMiddleware = require('../util/getWeather');

module.exports = router
    .post('/', (req, res, next) => {
        const { title, launchDate, activities } = req.body;
        Tour.create({ title, launchDate, activities })
            .then(tour => res.json(tour))
            .catch(next)
    })

    .get('/', (req, res, next) => {
        Tour.find()
            .then(tours => res.json(tours))
            .catch(next)
    })

    .get('/:id', (req, res, next) => {
        const { id } = req.params;
        Tour.findById(id)
            .then(tour => res.json(tour))
            .catch(next)
    });