const Sequelize = require('sequelize');
const EventModel = require('./event')
const ParticipantModel = require('./participant');
const participant = require('./participant');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const setupDatabase = () => {
    const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      port: DB_PORT,
      dialect: 'mysql',
      logging: false,
    });
  
    const Event = EventModel(connection, Sequelize)
    const Participant = ParticipantModel(connection, Sequelize)

    Participant.belongsTo(Event, { as: 'event'})

    connection.sync({ alter: true });
  
    return { 
      Event,
      Participant }
  };

module.exports = setupDatabase()