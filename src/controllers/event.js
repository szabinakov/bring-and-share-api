const { Event } = require('../models')

exports.create = (req, res) => {
    Event.create(req.body).then((user) => res.status(201).json(user));
  };

exports.getEvent = (req, res) => {
    const { id } = req.params

    Event.findByPk(id).then((event) => {
        if(!event) {
            res.status(404).json({ error: "Ooops, Event doesn't exist!"})
        } else {
            res.status(201).json(event)
        }
    })
}

exports.updateEvent = (req, res) => {
    const { id } = req.params
    
    Event.update(req.body, {where: {id: id}}).then(([eventUpdated]) => {
        if(!eventUpdated) {
            res.status(404).json({ error: "Ooops, Event doesn't exist!"})
        } else {
            res.status(201).json(eventUpdated)
        }
    })

}

exports.deleteEvent = (req, res) => {
    const { id } = req.params

    Event.destroy({ where: {id: id}}).then((data) => {
        if(!data) {
            res.status(404).json({ error: "Ooops, Event doesn't exist!"})
        } else {
            res.status(204).json(data)
        }
    })
}