module.exports = (sequelize, DataTypes) => {
  const Calendar = sequelize.define("Calendar", {
    park_id: DataTypes.STRING,
    user_id: DataTypes.STRING,
    date: DataTypes.DATE,
    time: DataTypes.STRING,
  });

  return Calendar;
};