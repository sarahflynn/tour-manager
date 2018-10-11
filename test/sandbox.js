require('dotenv').config();
const getLocationWeather = require('../weather-service-example');

getLocationWeather(97205)
    .then(console.log)