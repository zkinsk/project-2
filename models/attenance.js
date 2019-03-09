module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define("Attendance", {});

  Attendance.associate = (models) => {
    models.Attendance.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });

    models.Attendance.belongsTo(models.Event, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Attendance;
};