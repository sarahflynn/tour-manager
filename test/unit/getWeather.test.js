const { getWeather } = require('../../lib/util/getWeather');

describe('get weather middleware', () => {
    it('calls next with no error when provided with a valid zip', () => {
        const req = 97205;
        
        let called = false;
        let error;
        
        const next = err => {
            called = true;
            error = err;
        };

        getWeather(req, null, next);
        expect(called).toBeTruthy();
        expect(error).toBeUndefined();
    })
});