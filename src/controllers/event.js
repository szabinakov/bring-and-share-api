const { Event } = require('../models')


exports.create = (req, res) => {
    Event.create(req.body).then((user) => res.status(201).json(user));
  };

exports.getEvent = (req, res) => {
    const { eventId } = req.params

    Event.findByPk(eventId).then((event) => {
        if(!event) {
            res.status(404).json({ error: "Ooops, Event doesn't exist!"})
        } else {
            res.status(201).json(event)
        }
    })
}

exports.getAllEvents = (req, res) => {
    Event.findAll().then((events) => {
        res.status(200).json(events)
    })
}


exports.updateEvent = (req, res) => {
    const { eventId } = req.params
    
    Event.update(req.body, {where: {id: eventId}}).then(([eventUpdated]) => {
        if(!eventUpdated) {
            res.status(404).json({ error: "Ooops, Event doesn't exist!"})
        } else {
            res.status(201).json(eventUpdated)
        }
    })

}

exports.deleteEvent = (req, res) => {
    const { eventId } = req.params

    Event.destroy({ where: {id: eventId}}).then((data) => {
        if(!data) {
            res.status(404).json({ error: "Ooops, Event doesn't exist!"})
        } else {
            res.status(204).json(data)
        }
    })
}