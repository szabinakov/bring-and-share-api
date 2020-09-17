const Sequelize = require('sequelize');
const EventModel = require('./event')
const ParticipantModel = require('./participant');


const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const setupDatabase = () => {
  const sequelize = CLEARDB_DATABASE_URL ? 
    new Sequelize(CLEARDB_DATABASE_URL) :
    new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      port: DB_PORT,
      dialect: 'mysql',
      logging: false,
    });
  
    const Event = EventModel(connection, Sequelize)
    const Participant = ParticipantModel(connection, Sequelize)

    Participant.belongsTo(Event, { as: 'event'})


    sequelize.sync({ alter: true });
  
    return { 
      Event,
      Participant }
  };

module.exports = setupDatabase()