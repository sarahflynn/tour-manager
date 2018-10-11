const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    activities: [String],
    launchDate: {
        type: Date,
        default: Date.now()
    },
    stops: [{
        location: {
            zip: Number,
            city: String,
            state: String
        },
        weather: {
            temperature: String,
            condition: String,
            windSpeed: String,
            windDirection: String,
            sunrise: String,
            sunset: String
        },
        attendance: {
            type: Number,
            default: 1,
            min: 1
        }
    }]
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;