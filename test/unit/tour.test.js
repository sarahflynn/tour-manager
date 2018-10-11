const { getErrors } = require('./helpers');
const Tour = require('../../lib/models/Tour');

describe('Tour model', () => {
    it('validates a good model', () => {
        const data = {
            title: 'Oregon',
            activites: ['circus', 'rides', 'music'],
            stops: [{
                location: {
                    zip: 97205,
                    city: 'Portland',
                    state: 'OR'
                },
                attendance: 5000
            }]
        };

        const tour = new Tour(data);
        const jsonTour = tour.toJSON();
        jsonTour.stops.forEach(stop => { delete stop._id })
        expect(jsonTour.launchDate).toBeTruthy();
        expect(jsonTour).toEqual({ ...data, _id: expect.any(Object), launchDate: jsonTour.launchDate });
    });

    it('title is required', () => {
        const tour = new Tour({
            activites: ['circus', 'rides', 'music'],
            stops: [{
                location: {
                    zip: 97205,
                    city: 'Portland',
                    state: 'OR'
                },
                attendance: 5000
            }]
        });

        const errors = getErrors(tour.validateSync(), 1);
        expect(errors.title.properties.message).toEqual('Path `title` is required.')
        expect(errors.title.kind).toEqual('required')
    });
});
