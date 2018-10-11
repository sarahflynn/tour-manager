const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    activites: {
        type: Array,
    },
    launchDate: {
        type: Date,
        default: Date.now()
    },
    stops: {
        location: Object,
        weather: Object,
        attendance: {
            type: Number,
            default: 1,
            min: 1
        }
    }
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;