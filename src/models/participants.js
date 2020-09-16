module.exports = (sequelize, DataTypes) => {
    const schema = {
        eventName: DataTypes.STRING,
        hostName: DataTypes.STRING,
        date: DataTypes.STRING,
        time: DataTypes.STRING,
        address: DataTypes.STRING,
    }
    const Participants = sequelize.define('Participants', schema);
    return Participants
}