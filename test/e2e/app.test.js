const { dropCollection } = require('./db');
const request = require('supertest');
const app = require('../../lib/app');

describe('tours and stops', () => {
    let tours = [
        {
            title: 'Oregon',
            activites: ['circus', 'rides', 'music']
        },
        {
            title: 'Washington',
            activites: ['circus2', 'rides2', 'music2']
        }
    ];
    
    let createdTours;

    const createTour = tour => {
        return request(app)
            .post('/api/tours')
            .send(tour)
            .then(res => res.body);
    };

    beforeEach(() => {
        return dropCollection('tours');
    });

    beforeEach(() => {
        return Promise.all(tours.map(createTour)).then(toursRes => {
            createdTours = toursRes;
        });
    });

    it('creates a tour on post', () => {
        return request(app)
            .post('/api/tours')
            .send({
                title: 'California',
                activities: ['circus3', 'rides3', 'music3']
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    __v: expect.any(Number),
                    title: 'California',
                    activities: ['circus3', 'rides3', 'music3'],
                    launchDate: expect.any(Date),
                });
            });
    });


});