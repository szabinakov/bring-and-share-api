module.exports = (sequelize, DataTypes) => {
    const schema = {
        eventName: DataTypes.STRING,
        hostName: DataTypes.STRING,
        hostEmail: DataTypes.STRING,
        date: DataTypes.STRING,
        time: DataTypes.STRING,
        address: DataTypes.STRING,
    }
    const Event = sequelize.define('Event', schema);
    return Event
}