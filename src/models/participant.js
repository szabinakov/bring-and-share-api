module.exports = (sequelize, DataTypes) => {
    const schema = {
        name: DataTypes.STRING,
        toBring: DataTypes.STRING,
        dislikes: DataTypes.STRING,
        dietInfo: DataTypes.STRING
    }
    const Participant = sequelize.define('Participant', schema);
    return Participant
}