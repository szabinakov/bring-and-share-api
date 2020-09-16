const express = require('express')
const eventController = require('./controllers/event')

const app = express()

app.use(express.json())

app.post('/events', eventController.create)

app.get('/events/:id', eventController.getEvent )

app.patch('/events/:id', eventController.updateEvent)

app.delete('/events/:id', eventController.deleteEvent)

module.exports = app
