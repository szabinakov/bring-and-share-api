/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest')
const { Event, Participant } = require('../src/models')
const app = require('../src/app');

describe('/participants', () => {
    let event;

    before(async () => {
        try {
            await Event.sequelize.sync();
            await Participant.sequelize.sync();
        } catch (err) {
            console.log(err)
        }
    })

    beforeEach(async () => {
        try { 
            await Event.destroy({ where: {}})
            await Participant.destroy({ where: {}})
            event = await Event.create({
                eventName: 'Birthday',
                hostName: 'Szabina',
                date: 'Tomorrow',
                time: '2pm',
                address: 'Manchester'
            })
        } catch (err) {
            console.log(err)
        }
    })

    describe('/events/:eventId/participants', () => {
        it('creates a participant for a given event', (done) => {
            request(app)
                .post(`/events/${event.id}/participants`)
                .send({
                    name: 'Anna',
                    email: 'email@test.com',
                    toBring: 'Wine',
                    dislikes: 'Tomatoes',
                    dietInfo: 'None'
                })
                .then((res) => {
                    expect(res.status).to.equal(201)

                    Participant.findByPk(res.body.id, { raw: true}).then((participant) => {
                        expect(participant.name).to.equal('Anna')
                        expect(participant.email).to.equal('email@test.com')
                        expect(participant.toBring).to.equal('Wine')
                        expect(participant.dislikes).to.equal('Tomatoes')
                        expect(participant.dietInfo).to.equal('None')
                    })
                    done()
                })
            })
        })
    
    describe('with albums in the database', () => {
        let participants = []
        beforeEach((done) => {
            Participant.create({ name: 'Szabina', email:'email@test.com', toBring:'Milk', dislikes:'Coke', dietInfo:'None'})
                .then((participant) => {
                    participant.setEvent(event)
                    participants.push(participant)
                })
                .then(() => Participant.create({name: 'Eve', email:'email@test.com', toBring:'Wine', dislikes:'Beer', dietInfo:'Vegan'}))
                .then((participant) => {
                    participant.setEvent(event)
                    participants.push(participant)
                })
                .then(() => Participant.create({name: 'Arianha', email:'email@test.com', toBring:'Beer', dislikes:'Strawberry', dietInfo:'None'}))
                .then((participant) => {
                    participant.setEvent(event)
                    participants.push(participant)
                    done()
                })
            })

            describe('GET /events/eventID/participants/:participantID', () => {
                it('gets participants of given event', (done) => {
                    request(app)
                    .get(`/events/${event.id}/participants`)
                    .then((res) => {
                        expect(res.status).to.equal(201)
                        expect(res.body[0].name).to.equal('Szabina')
                        expect(res.body[0].email).to.equal('email@test.com')
                        expect(res.body[0].toBring).to.equal('Milk')
                        expect(res.body[0].dislikes).to.equal('Coke')
                        expect(res.body[0].dietInfo).to.equal('None')
                        done()
                    })
                })

                it('returns an error message when event doesnt exist', (done) => {
                    request(app)
                    .get('/events/999999999/participants')
                    .then((res) => {
                        expect(res.status).to.equal(404)
                        expect(res.body.error).to.equal("Ooops, Participants don't exist!")
                        done()
                    })
                })
            })

            // describe('PATCH /events/:eventID/participant/partricipantID', () => {
            //     xit('updates the name of a participant by its id', (done) => {
            //         let participant = participants[0]
            //         request(app)
            //             .patch(`/events/${event.id}/participants/${participant.id}`)
            //             .send({ name: 'Thomas', toBring:'', dislikes: '', dietInfo:'' })
            //             .then((res) => {
            //                 console.log('ola')
            //                 expect(res.status).to.equal(201)
            //                 Participant.findByPk(participant.id).then((updatedParticipant) => {
            //                     console.log(updatedParticipant)
            //                     expect(updatedParticipant.name).to.equal('Thomas')
            //                 })
            //             })
            //             done()
            //     })
            // })

            // describe('DELETE /events/:eventID/participant/partricipantID', () => {
            //     it('deletes participant by its id', (done) => {
            //         let participant = participants[0]
            //         request(app)
            //             .delete(`/events/${event.id}/participants/${participant.id}`)
            //             .then((res) => {
            //                 expect(res.status).to.equal(204)
            //                 Participant.findByPk(participant.id, { raw: true }).then((updatedParticipant) => {
            //                     expect(updatedParticipant).to.equal(null)
            //                 })
            //                 done()
            //             })
            //     })
            // })
    })

})