const { Participant, Event } = require("../models")

exports.createParticipant = (req, res) => {
    const { eventId } = req.params

    Event.findByPk(eventId).then((foundEvent) => {
        if(!foundEvent) {
            res.status(404).json({ error: "Ooops, The event doesn't exist!"})
        } else {
            Participant.create(req.body).then((person) => {
                person.setEvent(eventId).then((connectedPerson) => {
                    res.status(201).send(connectedPerson)
                })
            })
        }
    })
}

exports.getAllParticipant = (req, res) => {
    const { eventId } = req.params

    Event.findByPk( eventId ).then((foundEvent) => {
        if(!foundEvent) {
            res.status(404).json({error: "Ooops, Participants don't exist!"})
        } else {
            Participant.findAll({ where: {eventId:eventId}}).then((foundParticipants)=>{
                res.status(201).json(foundParticipants)
            })
        }
    })
}

exports.updateParticipant = (req, res) => {
    const { eventId } = req.params
    const { participantId } = req.params

    Participant.findAll({where: { eventId: eventId, id: participantId}}).then(
        (foundParticipant) => {
            if(!foundParticipant) {
                res.status(404).json({ error: "Ooops, Participant can not be found!"})
            } else {
                Participant.update(req.body, {
                    where: { eventId: eventId, id: participantId},
                }).then((updatedParticipant) => {
                    res.status(201).json(updatedParticipant)
                })
            }
        }
    )
}

exports.deleteParticipant = (req, res) => {
    const { eventId } = req.params
    const { participantId } = req.params

    Event.findByPk(eventId).then((foundEvent) => {
        if(!foundEvent) {
            res.status(404).json({ error: "Ooops, Event can not be found!"})
        } else {
            Participant.destroy({ where: { eventId: eventId, id: participantId}}).then(
                (data) => 
                {if(!data) {
                    res.status(404).json({error: "Ooops, Participant can not be found!"})
                } else {
                    res.status(204).json(data)
                }}
            )
        }
    })
}