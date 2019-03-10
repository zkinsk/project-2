module.exports = (sequelize, DataTypes) => {
  const EventDayTimePark = sequelize.define("EventDayTimePark", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    time: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    parkId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // userId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // }
  });

  EventDayTimePark.associate = (models) => {
    models.EventDayTimePark.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

    // EventDayTimePark.associate = (models) => {
  //   models.EventDayTimePark.hasMany(models.User, { foreignKey: {allowNull: false} });
  // };

  return EventDayTimePark;
};