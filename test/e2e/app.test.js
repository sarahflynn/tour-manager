const { dropCollection } = require('./db');
const request = require('supertest');
const app = require('../../lib/app');

describe('tours and stops', () => {
    let tours = [
        {
            title: 'Oregon',
            launchDate: '2018-10-11T20:08:09.052Z'
        },
        {
            title: 'Washington',
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
                launchDate: '2018-10-11T20:08:09.052Z'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    __v: expect.any(Number),
                    title: 'California',
                    launchDate: '2018-10-11T20:08:09.052Z',
                    stops: [],
                    activities: []
                });
            });
    });

    it('gets all tours', () => {
        return request(app)
            .get('/api/tours')
            .then(res => {
                expect(res.body).toEqual(createdTours);
            });
    })
    
    it('gets a tour by id', () => {
        return request(app)
            .get(`/api/tours/${createdTours[0]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdTours[0]);
            });
    });

    it('adds a stop to a tour by id', () => {
        return request(app)
            .post(`/api/tours/${createdTours[0]._id}/stops`)
            .send({ zip: 97205, stop: { attendance: 500} })
            .then(res => {
                expect(res.body.stops).toContainEqual({
                    _id: expect.any(String),
                    attendance: 500,
                    location: {
                        city: 'Portland',
                        state: 'OR'
                    },
                    weather: expect.any(Object),
                });
            });
    });

    it('deletes a stop by id', () => {
        return request(app)
            .post(`/api/tours/${createdTours[0]._id}/stops`)
            .send({ zip: 97205, stop: { attendance: 500} })
                .then(res => {
                    const tourId = res.body._id;
                    const stopId = res.body.stops[0]._id;
                    return request(app)
                        .delete(`/api/tours/${tourId}/stops/${stopId}`)
                        .then(res => {
                            expect(res.body.stops.length).toEqual(0);
                        });

                });
    });

    it('updates attendance at a stop', () => {
        return request(app)
            .post(`/api/tours/${createdTours[0]._id}/stops`)
            .send({ zip: 97205, stop: {}})
                .then(res => {
                    const tourId = res.body._id;
                    const stopId = res.body.stops[0]._id;
                    return request(app)
                        .post(`api/tours/${tourId}/stops/${stopId}/attendance`)
                        .send({ attendance: 1000 })
                            .then(res => {
                                expect(res.body.stops[0].attendance).toEqual(1000)
                            });
                });
        
    });
});