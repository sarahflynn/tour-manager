require('dotenv').config();
const getWeather = require('../../weather-service-example');

module.exports = (req, res, next) => {
    const { zip }  = req.body;
    getWeather(zip)
        .then(res => {
            const weather = {
                temperature: res.weather.temperature,
                condition: res.weather.condition,
                windSpeed: res.weather.windSpeed,
                windDirection: res.weather.windDirection,
                sunrise: res.weather.sunrise,
                sunset: res.weather.sunset
            };
            req.weather = weather;
            const locationFromZip = {
                city: res.location.city,
                state: res.location.state,
            };
            req.locationFromZip = locationFromZip;
            next();
        });
};
