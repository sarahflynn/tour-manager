const { dropCollection } = require('./db');
const request = require('supertest');
const app = require('../../lib/app');

describe('tours and stops', () => {
    let tours = [
        {
            title: 'Oregon',
            activities: ['circus', 'rides', 'music'],
            launchDate: '2018-10-11T20:08:09.052Z'
        },
        {
            title: 'Washington',
            activities: ['circus2', 'rides2', 'music2'],
            launchDate: '2018-11-11T20:08:09.052Z'

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
                activities: ['circus3', 'rides3', 'music3'],
                launchDate: '2018-10-11T20:08:09.052Z'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    __v: expect.any(Number),
                    title: 'California',
                    activities: ['circus3', 'rides3', 'music3'],
                    launchDate: '2018-10-11T20:08:09.052Z',
                    stops: []
                });
            });
    });

    it('gets all tours', () => {
        return request(app)
            .get('/api/tours')
            .then(res => {
                expect(res.body).toEqual(createdTours);
            })
    })
    
    it('gets a tour by id', () => {
        return request(app)
            .get(`/api/tours/${createdTours[0]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdTours[0]);
            })
    });

    it('adds a stop to a tour by id', () => {
        const stop = {
            location: {
                zip: 97205
            },
            attendance: 5000
        }
        return request(app)
            .post(`/api/tours/${createdTours[0]._id}`)
            .send(stop)
            .then(res => {
                expect(res.body).toContainEqual(stop);
            })
    });


});