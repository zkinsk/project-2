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
    // parkId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
  });

  EventDayTimePark.associate = (models) => {
    models.EventDayTimePark.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    models.EventDayTimePark.belongsTo(models.Park, {
      foreignKey: "parkId",
    });
  };

  // EventDayTimePark.associate = (models) => {
  //   models.EventDayTimePark.belongsTo(models.Park, {
  //     foreignKey: "park_Id",
  //   });
  // };


  return EventDayTimePark;
};