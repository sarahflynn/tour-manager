const { getErrors } = require('./helpers');
const Tour = require('../../lib/models/Tour');

describe('Tour model', () => {
    it('validates a good model', () => {
        const data = {
            title: 'Oregon',
            activites: ['circus', 'rides', 'music'],
            stops: {
                location: 97205,
                attendance: 5000
            }
        };

        const tour = new Tour(data);
        const jsonTour = tour.toJSON();
        expect(jsonTour).toEqual({ ...data, _id: expect.any(Object), launchDate: expect.any(Date) });
    });
});
