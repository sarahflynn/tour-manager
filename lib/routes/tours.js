const router = require('express').Router();
const Tour = require('../models/Tour');
const weatherMiddleware = require('../util/getWeather');

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
    })

    .post('/:id/stops', weatherMiddleware, (req, res, next) => {
        const { id } = req.params;
        const { stop } = req.body;
        console.log('stop', stop)

        stop.weather = req.weather;
        stop.location = req.locationFromZip;

        
        Tour.findByIdAndUpdate(id, { $push: { stops: stop } }, { new: true })
            .then(tour => res.json(tour));
    
    })

    .delete('/:tourId/stops/:stopId', (req, res, next) => {
        const { tourId, stopId } = req.params;
        Tour.findByIdAndUpdate(
            { _id: tourId },
            { $pull: {stops: { _id: stopId }}},
            { new: true }
        )
            .then(tour => res.json(tour));
    });