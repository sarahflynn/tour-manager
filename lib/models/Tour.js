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
        location: {
            city: String,
            zip: String,
            state: {
                type: String,
                enum: [
                    'AL',
                    'AK',
                    'AS',
                    'AZ',
                    'AR',
                    'CA',
                    'CO',
                    'CT',
                    'DE',
                    'DC',
                    'FM',
                    'FL',
                    'GA',
                    'GU',
                    'HI',
                    'ID',
                    'IL',
                    'IN',
                    'IA',
                    'KS',
                    'KY',
                    'LA',
                    'ME',
                    'MH',
                    'MD',
                    'MA',
                    'MI',
                    'MN',
                    'MS',
                    'MO',
                    'MT',
                    'NE',
                    'NV',
                    'NH',
                    'NJ',
                    'NM',
                    'NY',
                    'NC',
                    'ND',
                    'MP',
                    'OH',
                    'OK',
                    'OR',
                    'PW',
                    'PA',
                    'PR',
                    'RI',
                    'SC',
                    'SD',
                    'TN',
                    'TX',
                    'UT',
                    'VT',
                    'VI',
                    'VA',
                    'WA',
                    'WV',
                    'WI',
                    'WY'
                ]
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
                number: Number,
                default: 1,
                min: 1
            }
        }
    }
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;