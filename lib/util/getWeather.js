require('dotenv').config();
const getWeather = require('../weather-service-example');

module.exports = (req, res, next) => {
    const { ,,,zip }  = req.body;
    getWeather(zip)
        .then(res => {
            const weather = {
                temperature: res.temperature,
                condition: res.condition,
                windSpeed: res.windSpeed,
                windDirection: res.windDirection,
                sunrise: res.sunrise,
                sunset: res.sunset,
            };
            next();
        });
};

module.exports = (req, res, next) => {
    req.weather = weather;
}



