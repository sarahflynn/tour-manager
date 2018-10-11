const getWeather = require('../../lib/util/getWeather');

describe('get weather middleware', () => {
    it('calls next with no error when provided with a valid zip', done => {
        const req = { body: { zip: 97205 } };
        
        let called = false;
        let error;
        
        const next = err => {
            called = true;
            error = err;
            expect(called).toBeTruthy();
            expect(error).toBeUndefined();
            done();
        };

        getWeather(req, null, next);
    })
});