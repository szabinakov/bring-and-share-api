const Sequelize = require('sequelize');
const EventModel = require('./event')

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const setupDatabase = () => {
    const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      port: DB_PORT,
      dialect: 'mysql',
      logging: false,
    });
  
    const Event = EventModel(connection, Sequelize)

    connection.sync({ alter: true });
  
    return { Event }
  };

module.exports = setupDatabase()