/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest')
const { Event } = require('../src/models')
const app = require('../src/app');
const event = require('../src/models/event');


describe('/events', () => {
    before(async () => {
        try{
            await Event.sequelize.sync()
        } catch (err) {
            console.log(err)
        }
    })

    beforeEach(async () => {
        try {
            await Event.destroy({ where: {} });
        } catch (err) {
            console.log(err)
        }
    })

    describe('POST /events', () => {
        it('creates a new event in the database', async () => {
            const response = await request(app).post('/events').send({
                eventName: "Birthday",
                hostName: "Szabina",
                date: "Thursday",
                time: "2pm",
                address: "Manchester"
            })

            await expect(response.status).to.equal(201);
            await expect(response.body.eventName).to.equal('Birthday')

            const insertedEventRecords = await Event.findByPk(response.body.id, {
                raw: true,
            })
            await expect(insertedEventRecords.eventName).to.equal("Birthday")
            await expect(insertedEventRecords.hostName).to.equal("Szabina")
            await expect(insertedEventRecords.date).to.equal("Thursday")
            await expect(insertedEventRecords.time).to.equal("2pm")
            await expect(insertedEventRecords.address).to.equal("Manchester")
        })
    })


    describe('with events in the database', () => {
        let events;
        beforeEach((done) => {
            Promise.all([
                Event.create({ 
                    eventName: 'First Birthday', 
                    hostName: 'Szabina',
                    date: 'Thursday',
                    time: '2pm',
                    address: 'Hungary'
                }),
                Event.create({ 
                    eventName: 'Second Birthday', 
                    hostName: 'Eve',
                    date: 'Monday',
                    time: '5pm',
                    address: 'London'
                }),
                Event.create({ 
                    eventName: 'Third Birthday', 
                    hostName: 'Arianha',
                    date: 'Friday',
                    time: '9pm',
                    address: 'Manchester'
                })
            ]).then((data) => {
                events = data;
                done()
            })
        })

        describe('GET / events', () => {
            it('gets all events', (done) => {
                request(app)
                .get('/events')
                .then((res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body.length).to.equal(3)
                    res.body.forEach((event) => {
                        const expected = events.find((e) => e.id === event.id)
                        expect(event.eventName).to.equal(expected.eventName)
                        expect(event.hostName).to.equal(expected.hostName)
                        expect(event.date).to.equal(expected.date)
                        expect(event.time).to.equal(expected.time)
                        expect(event.address).to.equal(expected.address)
                    })
                    done()
                })
            })
        })
        describe('GET / events/eventID', () => {
            it('gets events by eventID', (done) => {
                const event = events[0]
                request(app)
                .get(`/events/${event.id}`)
                .then((res) => {
                    expect(res.status).to.equal(201)
                    expect(res.body.eventName).to.equal(event.eventName)
                    expect(res.body.hostName).to.equal(event.hostName)
                    expect(res.body.date).to.equal(event.date)
                    expect(res.body.time).to.equal(event.time)
                    expect(res.body.address).to.equal(event.address)
                    })
                    done()
                })
        })

        describe('PATCH /events/ID', () => {
            it('updates the event host by ID', (done) => {
                const event = events[0];
                request(app)
                .patch(`/events/${event.id}`)
                .send({ hostName: 'Thomas' })
                .then((res) => {
                    expect(res.status).to.equal(201)
                    Event.findByPk(event.id, { raw: true }).then((updatedEvent) => {
                        expect(updatedEvent.hostName).to.equal('Thomas')
                        })
                        done()
                    })  
                })

            it('updates the event name by ID', (done) => {
                const event = events[0];
                request(app)
                .patch(`/events/${event.id}`)
                .send({ eventName: 'Hen Party' })
                .then((res) => {
                    expect(res.status).to.equal(201)
                    Event.findByPk(event.id, { raw: true }).then((updatedEvent) => {
                        expect(updatedEvent.eventName).to.equal('Hen Party')
                        })
                        done() 
                    })   
                })
            
            it('updates the event date by ID', (done) => {
                const event = events[0];
                request(app)
                .patch(`/events/${event.id}`)
                .send({ date: 'Sunday Afternoon' })
                .then((res) => {
                    expect(res.status).to.equal(201)
                    Event.findByPk(event.id, { raw: true }).then((updatedEvent) => {
                        expect(updatedEvent.date).to.equal('Sunday Afternoon')
                        }) 
                        done()
                    }) 
                })
            
            it('updates the event time by ID', (done) => {
                const event = events[0];
                request(app)
                .patch(`/events/${event.id}`)
                .send({ time: '11pm' })
                .then((res) => {
                    expect(res.status).to.equal(201)
                    Event.findByPk(event.id, { raw: true }).then((updatedEvent) => {
                        expect(updatedEvent.time).to.equal('11pm')
                        })
                    done() 
                    })   
                })
            
            it('updates the event address by ID', (done) => {
                const event = events[0];
                request(app)
                .patch(`/events/${event.id}`)
                .send({ address: 'Hong Kong' })
                .then((res) => {
                    expect(res.status).to.equal(201)
                    Event.findByPk(event.id, { raw: true }).then((updatedEvent) => {
                        expect(updatedEvent.address).to.equal('Hong Kong')
                        }) 
                    done()
                    })
                })

            it('updates the event name by ID', (done) => {
                const event = events[0];
                request(app)
                .patch(`/events/${event.id}`)
                .send({ eventName: 'Hen Party' })
                .then((res) => {
                    expect(res.status).to.equal(201)
                    Event.findByPk(event.id, { raw: true }).then((updatedEvent) => {
                        expect(updatedEvent.eventName).to.equal('Hen Party')
                        })
                    done()  
                    })  
                })

            it('returns an error message when event can not be find to update', (done) => {
                request(app)
                .patch('/events/09090909rt')
                .send({ eventHost: 'Thomas' })
                .then((res) => {
                    expect(res.status).to.equal(404)
                    expect(res.body.error).to.equal("Ooops, Event doesn't exist!")
                    done()
                })

            })
        })

        describe('DELETE /events/id', () => {
            it('deletes the event by its ID', (done) => {
                const event = events[0]
                request(app)
                .delete(`/events/${event.id}`)
                .then((res) => {
                    expect(res.status).to.equal(204)
                    Event.findByPk(event.id, { raw:true }).then((updatedEvent) => {
                        expect(updatedEvent).to.equal(null)
                        done()
                    })
                })
            })

            it('returns an error message if event does not exist', (done) => {
                request(app)
                .delete('/events/8989898')
                .then( (res) => {
                    expect(res.status).to.equal(404)
                    expect(res.body.error).to.equal("Ooops, Event doesn't exist!")
                    done()
                })
            })
        })
    })
})