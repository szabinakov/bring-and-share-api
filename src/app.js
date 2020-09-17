const express = require("express");
const eventController = require("./controllers/event");
const participantController = require("./controllers/participant");


const app = express();



//EVENT
app.post("/events", eventController.create);

app.get("/events/:eventId", eventController.getEvent);
app.get("/events", eventController.getAllEvents);

app.patch("/events/:eventId", eventController.updateEvent);

app.delete("/events/:eventId", eventController.deleteEvent);

//PARTICIPANT
app.post(
  "/events/:eventId/participants",
  participantController.createParticipant
);

app.get(
  "/events/:eventId/participants",
  participantController.getAllParticipant
);

app.patch(
  "/events/:eventId/participants/:participantId",
  participantController.updateParticipant
);

app.delete(
  "/events/:eventId/participants/:participantId",
  participantController.deleteParticipant
);

module.exports = app;
