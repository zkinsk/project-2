module.exports = (sequelize, DataTypes) => {
  const Calendar = sequelize.define("Calendar", {
    park_name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    date: DataTypes.DATE,
    time: DataTypes.STRING,
  });

  return Calendar;
};